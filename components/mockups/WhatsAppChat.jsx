import ChatBubble from "@/components/ui/ChatBubble";

export default function WhatsAppChat() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5" aria-hidden="true">
      {/* Encabezado del chat */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
          D
        </span>
        <div>
          <p className="text-sm font-bold text-white">DataBaseIA Bot</p>
          <p className="text-xs text-brand-300">En línea</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="mt-4 space-y-3">
        <ChatBubble from="user" theme="dark">
          ¡Hola! ¿Cuánto stock me queda de Laptops?
        </ChatBubble>

        <ChatBubble theme="dark">
          📊 Tienes <strong>34 unidades</strong> de Laptop HP 15&quot; en tu inventario.
          <br />
          <br />
          Valor en almacén: <strong>$425,000 MXN</strong>
        </ChatBubble>

        <ChatBubble from="user" theme="dark">
          ¿Y cuántas vendí este mes?
        </ChatBubble>

        <ChatBubble theme="dark">
          Este mes vendiste <strong>8 laptops</strong> por un total de <strong>$100,000 MXN</strong> 🎉
        </ChatBubble>
      </div>
    </div>
  );
}