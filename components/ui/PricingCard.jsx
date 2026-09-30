import Button from "@/components/ui/Button";

// Estilos según si el plan está destacado o no
const THEMES = {
  light: {
    card: "card",
    muted: "text-brand-900/50",
    check: "text-brand-600",
    button: "soft",
  },
  dark: {
    card: "rounded-2xl border border-brand-600 bg-brand-900 p-6 text-white shadow-2xl shadow-brand-900/30",
    muted: "text-brand-300",
    check: "text-brand-300",
    button: "accent",
  },
};

export default function PricingCard({ plan }) {
  const theme = THEMES[plan.highlighted ? "dark" : "light"];

  return (
    <article className={`flex flex-col ${theme.card}`}>
      {plan.highlighted && (
        <span className="badge badge-dark mb-4 self-start">⭐ Más popular</span>
      )}

      <p className={`text-sm font-semibold ${theme.muted}`}>{plan.tier}</p>

      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold tracking-tight">{plan.priceLabel}</span>
        {plan.period && <span className={`text-sm ${theme.muted}`}>{plan.period}</span>}
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className={theme.check}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Button href="#" variant={theme.button} className="mt-8 w-full">
        {plan.cta}
      </Button>
    </article>
  );
}