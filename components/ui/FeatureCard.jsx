export default function FeatureCard({ feature, centered = false, children }) {
  return (
    <article className={`card relative h-full ${centered ? "text-center" : ""}`}>
      {children}

      <div className={`icon-box ${centered ? "mx-auto" : ""}`}>{feature.icon}</div>

      <h3 className="mt-4 font-bold">{feature.title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-brand-900/70">{feature.description}</p>
    </article>
  );
}