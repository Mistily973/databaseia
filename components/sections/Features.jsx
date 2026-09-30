import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";
import { features } from "@/lib/data/content";

export default function Features() {
  return (
    <section id="funciones" className="section section-alt">
      <div className="container-page">
        <SectionHeader {...features.header} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}