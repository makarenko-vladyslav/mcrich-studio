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

        {/* 4 Team cards: Photo first at 3:4 aspect, cropped from top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((person, idx) => (
            <div
              key={idx}
              className="bg-bg-card rounded border border-border-light overflow-hidden shadow-sm flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-bg-light">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 transition-all duration-300 hover:grayscale-0"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">
                    {person.name}
                  </h3>
                  <div className="text-xs font-mono text-accent font-semibold mb-3">
                    {person.role}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {person.bio}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border-light text-[11px] font-mono text-text-dim">
                  {location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
