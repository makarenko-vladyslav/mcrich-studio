export const metadata = {
  title: "Personvernerklæring",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Personvernerklæring</h1>
      <p className="mb-8 text-neutral-700">Denne siden forklarer hvilke personopplysninger nettstedet samler inn, hvorfor, og hvordan du kontakter den behandlingsansvarlige. Den gjelder besøkende på dette nettstedet.</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Behandlingsansvarlig</h2>
      <p className="text-neutral-800">McRich Studio</p>
        <p className="text-sm text-neutral-600">ishop.inform@gmail.com</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Hva vi samler inn</h2>
      <p className="text-neutral-700">Kun det du selv sender oss via kontaktskjemaet: navn, kontaktopplysninger og innholdet i meldingen. Nettstedet profilerer ikke besøkende og selger ikke data.</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Hvorfor</h2>
      <p className="text-neutral-700">For å svare på henvendelsen din og, dersom du ba om det, levere tjenesten du tok kontakt om. Grunnlaget er forespørselen din og vår berettigede interesse i å svare.</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Hvor lenge</h2>
      <p className="text-neutral-700">Henvendelser oppbevares så lenge det trengs for å svare og for å oppfylle regnskapsplikten, og slettes deretter.</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Dine rettigheter</h2>
      <p className="text-neutral-700">Du kan be om innsyn i opplysningene vi har om deg, be om retting eller sletting, og protestere mot behandlingen. Skriv til adressen under, så svarer vi.</p>

      <h2 className="mb-2 mt-8 text-xl font-medium">Informasjonskapsler</h2>
      <p className="text-neutral-700">Nettstedet bruker ingen sporings- eller reklamekapsler; ingenting som krever samtykke settes.</p>
    </main>
  );
}
