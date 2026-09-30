import FeatureCard from "@/components/ui/FeatureCard";

export default function StepCard({ step }) {
  return (
    <FeatureCard feature={step} centered>
      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        {step.number}
      </span>
    </FeatureCard>
  );
}