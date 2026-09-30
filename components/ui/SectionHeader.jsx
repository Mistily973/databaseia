export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="title mt-2">{title}</h2>
      {subtitle && <p className="subtitle mt-3">{subtitle}</p>}
    </div>
  );
}