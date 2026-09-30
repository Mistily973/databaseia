import Button from "@/components/ui/Button";
import WhatsAppChat from "@/components/mockups/WhatsAppChat";
import { whatsappCta } from "@/lib/data/content";

export default function WhatsAppCta() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid items-center gap-12 rounded-3xl bg-linear-to-bl from-brand-700 via-brand-900 to-brand-900 p-8 md:p-14 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <span className="badge badge-dark">{whatsappCta.badge}</span>
            <h2 className="title mt-5 text-white">{whatsappCta.title}</h2>
            <p className="mt-4 text-lg text-brand-200">{whatsappCta.description}</p>
            <Button href="#precios" variant="light" className="mt-8">
              {whatsappCta.cta}
            </Button>
          </div>

          {/* Chat */}
          <WhatsAppChat />
        </div>
      </div>
    </section>
  );
}