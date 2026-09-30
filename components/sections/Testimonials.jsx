import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data/content";

export default function Testimonials() {
  return (
    <section id="testimonios" className="section">
      <div className="container-page">
        <SectionHeader {...testimonials.header} />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.items.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}