"use client";
import { useLocale } from "@/lib/i18n";

interface Member {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default function Team() {
  const { t } = useLocale();

  const kicker = t("team.kicker") as string;
  const title = t("team.title") as string;
  const subtitle = t("team.subtitle") as string;
  const location = t("team.location") as string;
  const members = (t("team.members") as Member[]) || [];

  return (
    <section id="team" className="bg-white py-20 sm:py-24 border-b border-border-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
            {kicker}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            {title}
          </h2>
          <p className="text-text-muted mt-3 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {members.map((person, idx) => {
            const initials = person.name
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={idx}
                className="bg-bg-card rounded border border-border-light overflow-hidden shadow-sm flex flex-col sm:flex-row"
              >
                <div className="sm:w-64 md:w-80 shrink-0 aspect-[3/4] sm:aspect-auto min-h-[240px] bg-bg-light flex items-center justify-center border-b sm:border-b-0 sm:border-r border-border-light">
                  {person.imageUrl ? (
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 transition-all duration-300 hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-display text-5xl sm:text-6xl font-bold tracking-wider text-text-dim select-none">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                      {person.name}
                    </h3>
                    <div className="text-sm font-mono text-accent font-semibold mt-1 mb-4">
                      {person.role}
                    </div>
                    {person.bio ? (
                      <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                        {person.bio}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border-light text-xs font-mono text-text-dim">
                    {location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
