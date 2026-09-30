import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { finalCta } from "@/lib/data/content";

export default function FinalCta() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeader {...finalCta.header} />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#precios">{finalCta.primary}</Button>
          <Button href="#como-funciona" variant="soft">
            {finalCta.secondary}
          </Button>
        </div>
      </div>
    </section>
  );
}