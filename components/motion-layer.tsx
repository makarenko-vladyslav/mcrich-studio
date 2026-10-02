"use client";

import { useEffect } from "react";

/**
 * How far up the viewport an element must come before it is revealed, as a
 * fraction of viewport height.
 *
 * At 0.85 the element has come properly into the frame before it starts. Tried
 * at 0.95 — firing the moment it peeks over the bottom edge — and the owner read
 * it as too early. What felt late was never this line: it was the cascade delay,
 * which used to come from position among siblings rather than from who arrives
 * together. See revealWave.
 */
const REVEAL_LINE = 0.85;

/** How often to re-check content that can enter view without a scroll. */
const SWEEP_MS = 400;

/**
 * Content that carries its own entrance: a heading, a line of copy, a picture, a
 * button, a list item. `<ul>` and `<ol>` are absent on purpose — a list revealed
 * whole is one slab, while its items cascade.
 *
 * Links need a class to qualify. A bare `<a>` is usually inline inside a
 * paragraph, and the paragraph is already an item; a classed one is a button or
 * a card link, which is a piece of the page in its own right.
 */
const CONTENT =
  "h1,h2,h3,h4,h5,h6,p,li,img,picture,video,figure,blockquote,button,a[class],table,form,iframe,canvas,svg";

/** Chrome that must not fade: a fixed bar mid-fade over content reads as a bug. */
const SKIP = "header,nav";

/**
 * Structure, never an item. Sections are alike siblings of each other, so
 * without this the page's own sections read as a set and each one arrives as a
 * slab — the very thing this layer exists to stop.
 */
const LANDMARK = "body,main,section,header,footer,aside,nav";

/**
 * Reveals content as it is scrolled to.
 *
 * Four attempts at doing this through the markup failed for the same reason:
 * they depended on the shape the model happened to write. The last one — stage
 * a container, cascade its direct children — was measured on a real site and
 * reached 26 of 158 content elements. Everything living one wrapper deeper than
 * the rule expected simply appeared, which is what the owner saw as "half the
 * site still has no animation".
 *
 * So the rule now names what to move instead of describing where it sits: the
 * content tags themselves, plus any set of alike siblings (a grid of cards, a
 * list of prices). Walking stops at whatever is marked, so a card arrives as a
 * card rather than as three separate pieces of itself.
 *
 * Two decisions carry the rest, and both were bought with a failure:
 *
 *  - each element is observed, never its container. A barbershop's ticker is a
 *    2623px-wide strip: an observer watching it never fires, so its words were
 *    hidden and stayed hidden. The words themselves are on screen and fire fine.
 *  - reveal happens when an element reaches REVEAL_LINE, never at the bottom
 *    edge of the screen. Measured on the shipped site: everything below the fold
 *    was revealed 2.5s after load by a blanket safety timer, so by the time the
 *    reader scrolled, all 196 entrances had already played to an empty room.
 *
 * Nothing is hidden until JavaScript has marked it. If this never runs, the page
 * is simply static: content stuck at `opacity: 0` is the one failure mode that
 * must never happen.
 */
export function MotionLayer() {
  useEffect(() => {
    const items = findMotionItems(document, window.innerHeight);
    if (items.length === 0) return;

    for (const el of items) {
      el.dataset.motionItem = "";
      // Timing is set on the parent, where custom properties inherit down to
      // every sibling at once: a wall of photographs cascades faster than a
      // column of quotes, and a hero takes its time.
      const parent = el.parentElement;
      if (parent && !parent.dataset.motionRole) parent.dataset.motionRole = inferRole(parent);
    }

    const pending = new Set(items);

    /**
     * Reveal a group of elements that arrived together, cascading top to bottom.
     *
     * The delay comes from position within THIS wave, never from position among
     * siblings. In a tall price list each row crosses the line on its own, and a
     * static index made the eighth row sit still for half a second after the eye
     * had already reached it — which reads as late, not as rhythm.
     */
    const revealWave = (wave: HTMLElement[]) => {
      wave
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
        .forEach((el, i) => {
          el.style.setProperty("--motion-index", String(i));
          el.dataset.motionItem = "seen";
          pending.delete(el);
          io.unobserve(el); // once — re-firing on scroll-back is nausea
        });
    };

    const io = new IntersectionObserver(
      (entries) => {
        revealWave(entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement));
      },
      // The bottom edge is pulled up so an element is revealed once it is
      // properly in view, not while it is a sliver at the base of the screen.
      { rootMargin: `0px 0px -${Math.round((1 - REVEAL_LINE) * 100)}% 0px`, threshold: 0 },
    );

    for (const el of pending) io.observe(el);

    // A second, independent way in: geometry on scroll. It exists because an
    // observer can be defeated by layout the page does to itself, and content
    // left at `opacity: 0` is the one outcome that must never happen. It reveals
    // only what is genuinely on screen — an earlier blanket timer revealed the
    // whole page 2.5s after load, so by the time the reader scrolled, every
    // entrance had already played to an empty room.
    let queued = false;
    const sweep = () => {
      queued = false;
      const line = revealLine(window.innerHeight, window.scrollY, document.documentElement.scrollHeight);
      const wave = [...pending].filter((el) => {
        const box = el.getBoundingClientRect();
        return box.top < line && box.bottom > 0;
      });
      if (wave.length > 0) revealWave(wave);
    };
    const onScroll = () => {
      if (queued || pending.size === 0) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll(); // whatever is already on screen must not wait for a scroll

    // Content can enter view without the window moving: a ticker drifts, an
    // accordion opens, a late image reflows the page below it. One word of the
    // barbershop's marquee was caught this way — it sailed in between scroll
    // events and stayed invisible for good. This tick stops on its own once
    // everything has been revealed.
    const ticker = window.setInterval(() => {
      if (pending.size === 0) {
        window.clearInterval(ticker);
        return;
      }
      sweep();
    }, SWEEP_MS);

    return () => {
      window.clearInterval(ticker);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return null;
}

/**
 * The y a box must rise above to be revealed, in viewport coordinates.
 *
 * Normally the reader's eye line. On the LAST screen it drops to the bottom of
 * the viewport, because there is no scroll left and anything below the line can
 * never rise past it — the barbershop's footer credit sat at 828px against a
 * line at 765 and stayed invisible for good.
 */
export function revealLine(viewportHeight: number, scrollY: number, documentHeight: number): number {
  const atEnd = scrollY + viewportHeight >= documentHeight - 2;
  return atEnd ? viewportHeight : viewportHeight * REVEAL_LINE;
}

/**
 * Everything on the page that should arrive rather than appear.
 *
 * Exported so the behaviour can be tested against real markup instead of being
 * asserted about in prose.
 */
export function findMotionItems(root: Document | HTMLElement, viewportHeight = 900): HTMLElement[] {
  const items: HTMLElement[] = [];
  const doc = "body" in root ? root.body : root;
  if (doc) walk(doc, items, 0, viewportHeight);
  return items;
}

/** Element children only — text nodes and comments cannot be animated. */
function kids(el: Element): HTMLElement[] {
  return Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
}

/**
 * True when the element reads as an object rather than as layout: it has a
 * background, a border, a shadow or a rounded corner.
 *
 * This is what the eye uses, so the code should use it too. Without it the rule
 * fell through a price card whose siblings differed by one badge, and animated
 * its heading, its price and its button as three separate pieces — measured at
 * 147 of 201 elements moving inside boxes that stood still, which is what the
 * owner saw as twitchy.
 *
 * Bounded by height: past roughly three quarters of the screen a box stops being
 * an object arriving and becomes a region, and a region arriving as one slab is
 * the failure this whole layer exists to prevent.
 */
export function isVisualBox(el: HTMLElement, viewportHeight: number): boolean {
  // A landmark is a region however it is painted. The barbershop's footer has
  // its own background and fits inside the viewport, so it qualified on looks
  // and arrived as one slab, taking twelve links with it.
  if (el.matches(LANDMARK)) return false;

  // Falls back to the inline style when there is no view to compute against —
  // a document parsed outside a window has no `defaultView`, and a rule that
  // silently answers "no" there cannot be tested at all.
  const cs = el.ownerDocument.defaultView?.getComputedStyle(el) ?? el.style;

  const opaque = cs.backgroundColor !== "" && cs.backgroundColor !== "transparent" && !cs.backgroundColor.startsWith("rgba(0, 0, 0, 0");
  const rounded = Number.parseFloat(cs.borderRadius) >= 8;
  const bordered = Number.parseFloat(cs.borderTopWidth) > 0 || Number.parseFloat(cs.borderLeftWidth) > 0;
  const shadowed = cs.boxShadow !== "" && cs.boxShadow !== "none";
  if (!opaque && !rounded && !bordered && !shadowed) return false;

  // Only an upper bound. A height of zero means the document has no layout yet
  // (or the element is hidden), and neither is a reason to call it a region.
  return el.getBoundingClientRect().height <= viewportHeight * 0.75;
}

/**
 * True when this element is one of several alike siblings — a card in a grid, a
 * row in a price list, a slide in a strip.
 *
 * Sameness is judged by class, because that is what the generator's own code
 * produces: every repeating unit on these sites comes from a `.map()`, and one
 * JSX expression renders one identical `className` for every item. Measured
 * across four generated sites — 11 to 15 mapped blocks each, cards, tabs, nav
 * links, gallery tiles — it is the single structure they all share.
 *
 * It also draws the line the shape test could not: two layout columns are both
 * `<div>` but carry different classes, and treating them as a set makes each
 * column arrive as a slab with its contents frozen inside.
 */
function isSetMember(el: HTMLElement): boolean {
  if (el.matches(LANDMARK)) return false;
  const siblings = el.parentElement ? kids(el.parentElement) : [];
  if (siblings.length < 2) return false;

  const signature = el.className.toString();
  if (signature === "") {
    // No class to compare: fall back to shape, which still catches a plain
    // `<li>` list or a row of bare `<div>`s.
    return siblings.every((s) => s.tagName === el.tagName && s.children.length === el.children.length);
  }
  return siblings.every((s) => s.tagName === el.tagName && s.className.toString() === signature);
}

/**
 * True when something else already drives this element — a `<Reveal>` holding
 * its opacity, a slider positioning its track. Adding a second animation to the
 * same property is a fight the element loses.
 *
 * A driven element is skipped but still walked into: on sites built before this
 * layer, one `<Reveal>` wraps a whole section, and its contents are exactly what
 * needs to cascade.
 */
function isDriven(el: HTMLElement): boolean {
  return el.style.opacity !== "" || el.style.transform !== "";
}

function walk(node: HTMLElement, out: HTMLElement[], depth: number, viewportHeight: number): void {
  if (depth > 12) return; // a real page never nests content this deep

  for (const child of kids(node)) {
    if (child.matches(SKIP)) continue;

    const isUnit =
      child.matches(CONTENT) || isSetMember(child) || isVisualBox(child, viewportHeight);

    if (!isDriven(child) && isUnit) {
      out.push(child);
      continue; // a card arrives as a card, not as three pieces of itself
    }

    walk(child, out, depth + 1, viewportHeight);
  }
}

/**
 * How a group of siblings should feel, judged by what it holds — never by its
 * name. A component called `Gallery` routinely holds three bullet points, and
 * one called `Advantages` a photo wall.
 */
export function inferRole(el: HTMLElement): string {
  if (el.querySelector("video")) return "hero";
  if (el.querySelectorAll("img, picture").length >= 3) return "gallery";
  if (/«|»|”|“|відгук|review|testimonial/i.test(el.textContent ?? "")) return "proof";
  return "section";
}
