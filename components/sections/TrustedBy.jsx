import { trustedBusinesses } from "@/lib/data/content";

export default function TrustedBy() {
  return (
    <section className="section-alt py-10">
      <div className="container-page text-center">
        <p className="eyebrow opacity-70">Utilizado por negocios en toda Latinoamérica</p>

        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {trustedBusinesses.map((business) => (
            <li key={business} className="font-medium text-brand-900/50">
              {business}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}