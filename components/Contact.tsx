"use client";
import { useState, useId } from "react";
import { useLocale } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLocale();
  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const urlId = useId();
  const budgetId = useId();
  const messageId = useId();

  const kicker = t("contact.kicker") as string;
  const title = t("contact.title") as string;
  const subtitle = t("contact.subtitle") as string;
  const formName = t("contact.formName") as string;
  const formCompany = t("contact.formCompany") as string;
  const formEmail = t("contact.formEmail") as string;
  const formPhone = t("contact.formPhone") as string;
  const formUrl = t("contact.formUrl") as string;
  const formBudget = t("contact.formBudget") as string;
  const budgetOptions = (t("contact.budgetOptions") as string[]) || [];
  const formMessage = t("contact.formMessage") as string;
  const submitText = t("contact.submit") as string;
  const sendingText = t("contact.sending") as string;
  const successTitle = t("contact.successTitle") as string;
  const successMsg = t("contact.successMessage") as string;
  const slaNote = t("contact.slaNote") as string;
  const directTitle = t("contact.directTitle") as string;
  const addressLabel = t("contact.addressLabel") as string;
  const addressVal = t("brand.address") as string;
  const emailLabel = t("contact.emailLabel") as string;
  const emailVal = t("brand.email") as string;
  const legalSecurityLabel = t("contact.legalSecurityLabel") as string;
  const legalSecurityText = t("contact.legalSecurityText") as string;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    url: "",
    budget: budgetOptions[1] || "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      e.currentTarget.dataset.invalid = "true";
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  return (
    <section id="contact" className="bg-primary text-white py-20 sm:py-28 border-b border-border-dark scroll-mt-20 relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layer: Kicker + Invitation Heading + Lede */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
            {kicker}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="text-white/80 mt-3 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Container */}
          <div className="lg:col-span-8 bg-bg-card-dark p-8 sm:p-10 rounded border border-border-dark shadow-2xl">
            {status === "success" ? (
              <div className="py-12 text-center">
                <span className="inline-block p-4 rounded-full bg-accent/10 text-accent font-display text-4xl mb-4 font-bold font-mono">
                  OK
                </span>
                <h3 className="font-display text-3xl font-bold text-white mb-2">
                  {successTitle}
                </h3>
                <p className="text-white/70 text-base max-w-md mx-auto leading-relaxed">
                  {successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formName} *
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={companyId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formCompany} *
                    </label>
                    <input
                      id={companyId}
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formEmail} *
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formPhone} *
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor={urlId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formUrl}
                    </label>
                    <input
                      id={urlId}
                      type="url"
                      placeholder="https://"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={budgetId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                      {formBudget}
                    </label>
                    <select
                      id={budgetId}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded bg-bg-dark border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                    >
                      {budgetOptions.map((opt, idx) => (
                        <option key={idx} value={opt} className="bg-bg-dark text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={messageId} className="block text-xs font-mono uppercase tracking-wider text-white/90 font-semibold mb-2">
                    {formMessage}
                  </label>
                  <textarea
                    id={messageId}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-white/5 border border-white/15 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-8 py-4 min-h-[44px] bg-accent hover:bg-accent-dark text-white font-semibold text-sm tracking-wider uppercase rounded transition-colors shadow-lg inline-flex items-center justify-center"
                  >
                    {status === "sending" ? sendingText : submitText}
                  </button>
                  <div className="text-xs font-mono text-white/70">
                    <a href={`mailto:${emailVal}`} className="text-accent underline font-bold">
                      {emailVal}
                    </a>
                  </div>
                </div>

                <p className="text-xs font-mono text-white/60 text-center mt-3 pt-3 border-t border-white/10">
                  {slaNote}
                </p>
              </form>
            )}
          </div>

          {/* Right Direct Details */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-bg-card-dark p-7 rounded border border-border-dark shadow-xl">
              <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-2">
                STUDIO OSLO
              </span>
              <h3 className="font-display text-xl font-bold mb-4">
                {directTitle}
              </h3>

              <div className="space-y-4 text-xs font-mono border-t border-white/10 pt-4">
                <div>
                  <div className="text-white/50 mb-1">{addressLabel}</div>
                  <div className="text-white font-medium text-sm">{addressVal}</div>
                </div>

                <div className="pt-2">
                  <div className="text-white/50 mb-1">{emailLabel}</div>
                  <a href={`mailto:${emailVal}`} className="text-accent hover:underline text-sm font-semibold">
                    {emailVal}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded border border-white/10 text-xs font-mono text-white/70">
              <span className="text-accent font-bold block mb-1">
                {legalSecurityLabel}
              </span>
              {legalSecurityText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
