import Button from "@/components/ui/Button";
import AppPreview from "@/components/mockups/AppPreview";
import { hero } from "@/lib/data/content";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-brand-100/70 to-brand-50">
      <div className="container-page grid items-center gap-16 py-20 md:py-28 lg:grid-cols-2">

        {/* Columna izquierda: texto */}
        <div>
         <span className="badge badge-light">{hero.badge}</span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {hero.title}
          </h1>

          <p className="subtitle mt-6 max-w-xl">{hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#precios">Empezar gratis →</Button>
            <Button href="#como-funciona" variant="outline">Ver demo</Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-900/60">
            {hero.checks.map((check) => (
              <li key={check} className="flex items-center gap-2">
                <span className="text-brand-600">✓</span>
                {check}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha: ventanita de la app */}
        <AppPreview />
      </div>
    </section>
  );
}