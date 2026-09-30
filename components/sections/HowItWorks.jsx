import SectionHeader from "@/components/ui/SectionHeader";
import StepCard from "@/components/ui/StepCard";
import { howItWorks } from "@/lib/data/content";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container-page">
        <SectionHeader {...howItWorks.header} />

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Línea que conecta las tarjetas (solo en pantallas medianas o más) */}
          <div className="absolute inset-x-0 top-10 hidden h-px bg-brand-200 md:block" />

          {howItWorks.steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}