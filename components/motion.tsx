"use client";

/**
 * Motion primitives shipped into every generated site.
 *
 * The generator used to re-derive motion in every section, and re-derived it
 * differently each time: reveals that re-fire on scroll-back, a stagger wired
 * to the wrong parent, parallax that ignores prefers-reduced-motion. Those are
 * not creative choices — they are plumbing, and plumbing written once is
 * plumbing written correctly.
 *
 * The numbers here are chosen, not guessed. Compose these; do not hand-roll
 * `initial/animate` next to them, and do not restate the timings inline.
 */

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Children, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/** Fast out of the gate, long settle — reads as engineered rather than bouncy. */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Named curves, so a section can mean something different from its neighbour.
 *
 * Measured 20.08: three sites for unrelated businesses carried byte-identical
 * motion, and the cause was here — one curve and one duration for every element
 * on every site. The defaults below keep the previous behaviour exactly; the
 * point is that they are now overridable per element.
 */
export const CURVES = {
  /** Entering the viewport. The default. */
  enter: EASE_OUT,
  /** Large blocks and hero content — softer landing. */
  enterSoft: [0.33, 1, 0.68, 1] as [number, number, number, number],
  /** Switching between two states: accordions, tabs, menus. */
  transition: [0.65, 0, 0.35, 1] as [number, number, number, number],
  /** Pointer feedback. Anything slower reads as lag. */
  micro: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

/**
 * Elements still waiting to be revealed, watched by ONE listener for the page.
 *
 * This used to be Framer's `whileInView` with `once: true`, and Safari made a
 * liar of it. WebKit coalesces IntersectionObserver entries during a fast
 * scroll: a section the visitor flicked past is reported once, already out of
 * view, as `isIntersecting: false`. The animation never starts, and `once`
 * means nothing ever looks again — the section stays at opacity 0 for the rest
 * of the visit. Measured on a generated clinic page after one flick to the
 * bottom: Chromium 0 blank sections, WebKit 2, one of them the whole team.
 *
 * Geometry cannot be skipped that way. "Has the top of this element come above
 * the reveal line" is true from the moment it is true, whether the scroll
 * arrived in one jump or in a hundred small ones.
 */
const pending = new Set<() => void>();
let queued = false;
let listening = false;

function sweep(): void {
  queued = false;
  for (const check of pending) check();
  if (pending.size > 0 || !listening) return;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  listening = false;
}

function schedule(): void {
  if (queued) return;
  queued = true;
  requestAnimationFrame(sweep);
}

function watch(check: () => void): () => void {
  pending.add(check);
  if (!listening) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    listening = true;
  }
  schedule();
  return () => {
    pending.delete(check);
  };
}

/**
 * True once the element has crossed the reveal line, and true forever after —
 * a reveal that replays on scroll-back reads as a glitch.
 *
 * The line sits 15% below the fold so the movement is already settling by the
 * time the visitor's eye arrives, rather than starting under it.
 */
function useRevealed(ref: RefObject<Element | null>): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    return watch(() => {
      const element = ref.current;
      if (element && element.getBoundingClientRect().top < window.innerHeight * 1.15) {
        setRevealed(true);
      }
    });
  }, [ref, revealed]);

  return revealed;
}

/** Semantic tags a section actually needs — animation must not force a `div`. */
type Tag =
  | "div" | "section" | "article" | "header" | "footer" | "aside"
  | "ul" | "li" | "figure" | "h1" | "h2" | "h3" | "p" | "span";

interface MotionBoxProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
}

interface RevealProps extends MotionBoxProps {
  /** Seconds before this element starts. For deliberate sequencing — not for faking a stagger. */
  delay?: number;
  /** Travel in px. 24-40 reads as intent; much more reads as a slide deck. */
  y?: number;
  /**
   * Seconds. Pick by job, not one value for the page: 0.5-0.75 for an ordinary
   * entrance, 0.9-1.2 for a whole block revealing, 1.2-2.0 for the one signature
   * moment. Leaving every element on the default is what made the fleet identical.
   */
  duration?: number;
  /** A curve from CURVES. Default `enter`. */
  ease?: readonly [number, number, number, number];
  /**
   * Seconds between direct children, when there is more than one.
   *
   * Without this a `<Reveal>` around a section moves the whole section as one
   * slab: heading, copy and buttons arrive in the same instant, and the section
   * reads as a slide rather than as something unfolding. Owner's words on the
   * barbershop build: "відчуття що анімації на всій секції а не на контенті в ній".
   *
   * 0 keeps the old behaviour exactly — one element, one movement.
   */
  stagger?: number;
  /**
   * Which way the element travels as it arrives. `up` — the default and the
   * only behaviour this had — means it starts below and rises.
   *
   * It exists because the generator kept asking for it: eight `direction` props
   * on one shipped barbershop site, on a primitive that declared none, so React
   * dropped every one of them and each section rose from below like all the
   * others. The distance is still whatever `y` says.
   */
  direction?: "up" | "down" | "left" | "right";
}

/** Where the element starts, in the px `y` has always meant. */
function travelFrom(direction: NonNullable<RevealProps["direction"]>, distance: number): { x: number } | { y: number } {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return { y: distance };
  }
}

/**
 * Fade-and-rise as the element enters the viewport. The default entrance for
 * anything that is not a list — headings, images, panels, whole sections.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.55,
  ease = CURVES.enter,
  stagger = 0,
  direction = "up",
  as = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);
  const reduced = useReducedMotion();
  const from = travelFrom(direction, y);
  const settled = Object.fromEntries(Object.keys(from).map((axis) => [axis, 0]));

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Animated = motion[as] as typeof motion.div;

  // With a stagger the container itself stays put and each child arrives on its
  // own beat. Without it the container moves and the children ride along — the
  // original behaviour, kept byte-for-byte for every existing call site.
  const kids = Children.toArray(children);
  if (stagger > 0 && kids.length > 1) {
    return (
      <Animated ref={ref} className={className}>
        {kids.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, ...from }}
            animate={revealed ? { opacity: 1, ...settled } : { opacity: 0, ...from }}
            transition={{ duration, ease, delay: delay + i * stagger }}
          >
            {child}
          </motion.div>
        ))}
      </Animated>
    );
  }

  return (
    <Animated
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...from }}
      animate={revealed ? { opacity: 1, ...settled } : { opacity: 0, ...from }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </Animated>
  );
}

/**
 * Built per instance instead of shared, so one list can cascade at text speed
 * (0.025-0.05s) while another lands block by block (0.1-0.2s).
 */
function buildContainerVariants(stagger: number, delayChildren: number): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } };
}

function buildItemVariants(duration: number, ease: readonly [number, number, number, number]): Variants {
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration, ease } },
  };
}

const containerVariants = buildContainerVariants(0.09, 0.05);
const itemVariants = buildItemVariants(0.55, EASE_OUT);

/**
 * Reveals children one after another. Wrap the list, then wrap each child in
 * `<StaggerItem>` — the delay is derived from position, so no child carries a
 * hand-counted `delay`.
 */
export function Stagger({ children, as = "div", className }: MotionBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Animated = motion[as] as typeof motion.div;
  return (
    <Animated
      ref={ref}
      className={className}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </Animated>
  );
}

/** A single child of `<Stagger>`. Inert on its own — it inherits the parent's timing. */
export function StaggerItem({ children, as = "div", className }: MotionBoxProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Animated = motion[as] as typeof motion.div;
  return (
    <Animated className={className} variants={itemVariants}>
      {children}
    </Animated>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT } },
};

interface TextRevealProps {
  /** Plain text. Split happens here — do not pass elements. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

/**
 * Headline reveal: each word rises out of its own mask, one after another.
 *
 * Two details this gets right that a hand-rolled version does not. The split
 * spans are `aria-hidden` behind a single `aria-label`, so a screen reader
 * reads one sentence instead of spelling out words. And the mask carries
 * vertical padding pulled back by a negative margin — without it `overflow:
 * hidden` slices the descenders off р, у, д, щ, which is every other Ukrainian
 * headline.
 */
export function TextReveal({ text, as = "h2", className }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const revealed = useRevealed(ref);
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const words = text.split(" ");
  const Animated = motion[as] as typeof motion.h2;
  return (
    <Animated
      ref={ref}
      className={className}
      aria-label={text}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
      variants={containerVariants}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="inline-block overflow-hidden pt-[0.12em] pb-[0.18em] -mt-[0.12em] -mb-[0.18em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Animated>
  );
}

interface ParallaxProps extends MotionBoxProps {
  /** Peak offset in px. 40-100 is depth; beyond that the element visibly detaches. */
  distance?: number;
}

/**
 * Moves the element against the scroll to create depth. Transform only, so it
 * stays on the compositor, and it flattens completely under reduced motion.
 */
export function Parallax({ children, distance = 80, as = "div", className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  const Animated = motion[as] as typeof motion.div;
  return (
    <Animated ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </Animated>
  );
}

interface MarqueeProps {
  /** One pass of content. It is repeated as many times as the screen needs. */
  children?: ReactNode;
  /**
   * The same thing as a list, which is how the generator asks for it.
   *
   * `<Marquee items={tickerItems} />` with no children shipped on a live hero
   * and rendered an empty bar: `items` was not a prop, React dropped it, and
   * there was nothing left to repeat. Children still win when both are given.
   */
  items?: ReactNode[];
  /** Seconds for one pass to cross its own width. Higher is calmer. */
  duration?: number;
  /**
   * What the generator calls `duration`, in the same seconds.
   *
   * Two shipped sites wrote `speed={22}` and `speed={30}` against a 26s
   * default — either side of it, which is what settles whether "speed" here
   * means seconds or pixels. `duration` still wins if both are present.
   */
  speed?: number;
  /** Right-to-left by default; `true` runs it the other way. */
  reverse?: boolean;
  className?: string;
}

/**
 * An endless ticker that actually loops seamlessly.
 *
 * Hand-rolled marquees fail the same three ways every time, and the client sees
 * all three: the track is two copies animated `translateX(0 → -50%)` while the
 * flex container carries a `gap`, so half the track is one gap short of half
 * the width and the loop point visibly jumps; the content is shorter than the
 * screen, so the visitor reads the same phrase twice side by side; and a wide
 * text layer moved without a compositor hint repaints every frame, which is
 * where the stutter on Safari comes from.
 *
 * All three are plumbing. The gap lives INSIDE one pass, so passes tile exactly.
 * The number of passes is measured against the container, so the strip is
 * always at least one screen longer than the screen. The track moves by exactly
 * one pass width, on its own layer.
 */
export function Marquee({ children, items, duration, speed, reverse = false, className }: MarqueeProps) {
  const seconds = duration ?? speed ?? 26;
  const content = children ?? items?.map((item, i) => <span key={i}>{item}</span>);
  const box = useRef<HTMLDivElement>(null);
  const pass = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const measure = (): void => {
      const passWidth = pass.current?.offsetWidth ?? 0;
      const boxWidth = box.current?.offsetWidth ?? 0;
      if (passWidth === 0) return;
      setWidth(passWidth);
      setCopies(Math.max(2, Math.ceil(boxWidth / passWidth) + 1));
    };

    measure();
    // Fonts land after first paint and change every width on the strip.
    document.fonts?.ready.then(measure).catch(() => undefined);
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [content]);

  // The trailing gap belongs to the pass, not to the track — that is what makes
  // consecutive passes tile with no seam.
  const onePass = (key: number, hidden: boolean) => (
    <div
      key={key}
      ref={key === 0 ? pass : undefined}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[var(--marquee-gap,2.5rem)] pr-[var(--marquee-gap,2.5rem)]"
    >
      {content}
    </div>
  );

  if (reduced) {
    return (
      <div ref={box} className={`overflow-hidden ${className ?? ""}`}>
        <div className="flex">{onePass(0, false)}</div>
      </div>
    );
  }

  return (
    <div ref={box} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max"
        style={{ willChange: "transform" }}
        animate={{ x: reverse ? [-width, 0] : [0, -width] }}
        transition={{ duration: seconds, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: copies }, (_, i) => onePass(i, i > 0))}
      </motion.div>
    </div>
  );
}

interface CarouselProps {
  /** One element per slide. */
  children: ReactNode;
  /** Seconds a slide holds before the next one. 0 turns autoplay off. */
  interval?: number;
  /** Accessible name for the strip, in the site's language. */
  label?: string;
  className?: string;
}

/**
 * A slider a finger can actually move.
 *
 * The generator's own carousels were dots and nothing else: three decorative
 * spans under a single static quote, so swiping did nothing and the section
 * showed one review where the client's site has eight. The failure is worth
 * naming — a slider is not a look, it is scroll behaviour, and native
 * scroll-snap already implements it correctly on every engine, including
 * momentum on iOS and vertical page scroll that never gets hijacked.
 *
 * So the track is a real scroller. The dots read its position rather than
 * owning it, which means they stay correct however the slide was reached.
 */
export function Carousel({ children, interval = 6, label, className }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const follow = (): void => {
      const index = Math.round(element.scrollLeft / Math.max(1, element.clientWidth));
      setActive(Math.min(slides.length - 1, Math.max(0, index)));
    };
    element.addEventListener("scroll", follow, { passive: true });
    return () => element.removeEventListener("scroll", follow);
  }, [slides.length]);

  const goTo = (index: number): void => {
    const element = track.current;
    if (element) element.scrollTo({ left: index * element.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (reduced || held || interval <= 0 || slides.length < 2) return;
    const id = window.setInterval(() => {
      const element = track.current;
      if (!element) return;
      const next = Math.round(element.scrollLeft / Math.max(1, element.clientWidth)) + 1;
      element.scrollTo({ left: (next % slides.length) * element.clientWidth, behavior: "smooth" });
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [reduced, held, interval, slides.length]);

  return (
    <div className={className}>
      <div
        ref={track}
        role="region"
        aria-label={label}
        aria-roledescription="carousel"
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onTouchStart={() => setHeld(true)}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0 snap-center">
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${slides.length}`}
              aria-current={i === active || undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-current opacity-100" : "w-2 bg-current opacity-30"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
