"use client";

import { useEffect } from "react";

/**
 * Delivers every <form> on this site to the studio's endpoint.
 *
 * The site is a static export with no backend of its own, so a form the model
 * wrote could only pretend to send. This listens for `submit` on the document
 * in the capture phase and reads the fields there, ahead of any handler the
 * form carries: a handler that clears the form on success leaves nothing to
 * read later. It sends them only once the site's own handler has run, as a
 * plain urlencoded body (a CORS "simple" request, no preflight), and marks the
 * form: `data-sent="sending"`, then `"true"` or `"failed"`. A form may style
 * those states; nothing else on the page needs to know.
 *
 * What the browser checks (`required`, `type="email"`) it checks before
 * `submit` fires, so a form that fails it never gets here. What the site checks
 * in its own handler, the bridge learns from the mark that handler leaves: a
 * handler whose check stopped the submit sets `data-invalid="true"`, and
 * nothing is sent — the business never gets a half-filled request. The mark is
 * the site's and `data-sent` stays the bridge's, so in the preview, which runs
 * no bridge, a failed attempt never looks like a send in progress. A handler
 * that leaves no mark (a site generated before that rule) is sent as before:
 * a lost lead is worse than an incomplete one.
 *
 * The send waits for the next task, not a microtask: in a real click the
 * browser runs microtasks between listeners, before the site's handler. A
 * handler that leaves the page at once (`location.href = "/thanks"`) can
 * unload it before that task, so `pagehide` sends first; `keepalive` lets the
 * request outlive the page.
 *
 * `_hp` is a honeypot: a filled one is a bot, answered with a silent "success".
 */
const HONEYPOT = "_hp";

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const FIELDS = "input, select, textarea";

/** Controls that hold no answer: buttons, files, and hidden inputs nobody named. */
const NO_ANSWER = /^(?:submit|button|reset|image|file|hidden)$/;

const isField = (element: Element): element is Field =>
  element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;

/** Never leaves the page, named or not: a password, a card (`autocomplete="cc-…"`). */
const isSecret = (field: Field) =>
  field.type === "password" || /(?:^|\s)cc-/.test(field.getAttribute("autocomplete") ?? "");

/** The label just before the field — never past another field: that label is someone else's. */
function labelBefore(field: Field): Element | null {
  for (let node = field.previousElementSibling; node; node = node.previousElementSibling) {
    if (node.matches(FIELDS) || node.querySelector(FIELDS)) return null;
    if (node.tagName === "LABEL") return node;
  }
  return null;
}

/**
 * What the visitor saw beside a field: its aria-label, its label (without the
 * options of a select inside it), the label just before it, its placeholder.
 * Trailing punctuation goes, in any script — `*`, `:`, `：`, `＊` mark the
 * field, they are not its name. Nothing to go by — its place in the form, `#3`.
 */
function captionOf(field: Field, position: number): string {
  const label = field.labels?.[0] ?? labelBefore(field);
  const labelText = label?.textContent?.replace(field.textContent ?? "", "");
  const text = field.getAttribute("aria-label") || labelText || field.getAttribute("placeholder") || "";
  return text.replace(/\s+/g, " ").replace(/[\s\p{Po}]+$/u, "").trim() || `#${position}`;
}

/**
 * A select sends the options shown — but not a placeholder (`value=""`, "Choose a
 * service"): that is no choice. A box sends a tick — its own value is "on", its
 * caption says what was ticked.
 */
function answerOf(field: Field): string {
  if (field instanceof HTMLSelectElement) {
    return Array.from(field.selectedOptions).filter((option) => option.value !== "").map((option) => option.text).join(", ");
  }
  if (field instanceof HTMLInputElement && /^(?:checkbox|radio)$/.test(field.type)) return field.checked ? "✓" : "";
  return field.value;
}

/**
 * Answers FormData leaves out: fields with no `name`. A model writing React
 * state rarely gives one, and Barberking's booking form posted none of its six
 * fields — the business got a letter with nothing in it. Keyed by its caption,
 * each answer arrives in the site's own words.
 */
function unnamedAnswers(fields: Field[]): Array<[string, string]> {
  const answers: Array<[string, string]> = [];
  fields.forEach((field, index) => {
    if (field.name || field.disabled || NO_ANSWER.test(field.type) || isSecret(field)) return;
    const value = answerOf(field);
    if (value.trim()) answers.push([captionOf(field, index + 1), value]);
  });
  return answers;
}

/** The POST body: named fields as FormData holds them, then the unnamed ones by caption. */
function bodyOf(form: HTMLFormElement, data: FormData): URLSearchParams {
  const fields = Array.from(form.elements).filter(isField);
  const secret = new Set(fields.filter((field) => field.name && isSecret(field)).map((field) => field.name));
  const body = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === "string" && !secret.has(key)) body.append(key, value);
  });
  for (const [caption, value] of unnamedAnswers(fields)) {
    let key = caption;
    for (let n = 2; body.has(key); n += 1) key = `${caption} ${n}`;
    body.append(key, value);
  }
  body.set("_page", window.location.href);
  return body;
}

/** Posts the submit, unless the site's own check marked the form — then there is no send to show. */
function deliver(form: HTMLFormElement, endpoint: string, body: URLSearchParams): void {
  if (form.dataset.invalid === "true") {
    delete form.dataset.sent;
    return;
  }
  fetch(endpoint, { method: "POST", body, keepalive: true })
    .then((response) => {
      form.dataset.sent = response.ok ? "true" : "failed";
      if (response.ok) form.reset();
    })
    .catch(() => {
      form.dataset.sent = "failed";
    });
}

export function FormBridge({ endpoint }: { endpoint: string }) {
  useEffect(() => {
    if (!endpoint) return undefined;

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      event.preventDefault();

      const data = new FormData(form);
      if (String(data.get(HONEYPOT) ?? "").trim() !== "") {
        form.dataset.sent = "true";
        return;
      }

      const body = bodyOf(form, data);

      delete form.dataset.invalid;
      form.dataset.sent = "sending";
      // The site's own submit handler runs after this listener. A task later
      // every handler has had its say — even one that stopped the event from
      // bubbling on — and one whose check said no has left its mark. A page
      // that goes away before then sends on its way out.
      let pending = true;
      const send = () => {
        if (!pending) return;
        pending = false;
        window.removeEventListener("pagehide", send);
        deliver(form, endpoint, body);
      };
      window.addEventListener("pagehide", send);
      setTimeout(send, 0);
    };

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, [endpoint]);

  return null;
}
