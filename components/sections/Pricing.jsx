import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { pricing } from "@/lib/data/content";

export default function Pricing() {
  return (
    <section id="precios" className="section section-alt">
      <div className="container-page">
        <SectionHeader {...pricing.header} />

        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-6 md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <PricingCard key={plan.tier} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}