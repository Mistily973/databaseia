import SectionHeader from "@/components/ui/SectionHeader";
import AccordionItem from "@/components/ui/AccordionItem";
import { faq } from "@/lib/data/content";

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container-page">
        <SectionHeader {...faq.header} />

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {faq.items.map((item) => (
            <AccordionItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}