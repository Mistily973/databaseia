export default function TestimonialCard({ testimonial }) {
  return (
    <article className="card flex h-full flex-col">
      <span className="text-2xl leading-none text-brand-600">❝</span>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-900/80">
        “{testimonial.quote}”
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-brand-100 pt-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-200 font-bold text-brand-900">
          {testimonial.initial}
        </span>
        <div>
          <p className="text-sm font-bold">{testimonial.author}</p>
          <p className="text-xs text-brand-900/50">{testimonial.subtitle}</p>
        </div>
      </div>
    </article>
  );
}