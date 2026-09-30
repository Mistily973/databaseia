import ChatBubble from "@/components/ui/ChatBubble";
import { previewProducts } from "@/lib/data/content";

// Cada columna dice qué propiedad del producto muestra y con qué título
const COLUMNS = [
  { key: "id", label: "🔢 ID" },
  { key: "name", label: "💬 Nombre" },
  { key: "stock", label: "🔢 Stock" },
  { key: "date", label: "📅 Fecha" },
];

export default function AppPreview() {
  return (
    // aria-hidden: es decorativo, los lectores de pantalla lo saltan
    <div className="relative" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-xl shadow-brand-900/5">

        {/* --- Barra del navegador --- */}
        <div className="flex items-center gap-3 border-b border-brand-200 bg-brand-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 rounded-md border border-brand-200 bg-white px-3 py-1 text-xs text-brand-900/50">
            databasaia.com/app
          </div>
        </div>

        <div className="p-5">
          {/* --- Encabezado de la tabla --- */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Inventario Productos</h3>
            <span className="rounded-full border border-brand-300 bg-brand-100 px-2.5 py-0.5 text-xs text-brand-700">
              148 filas
            </span>
          </div>

          {/* --- Tabla --- */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-brand-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-50 text-brand-900/70">
                <tr>
                  {COLUMNS.map((col) => (
                    <th key={col.key} className="px-4 py-2 font-semibold">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewProducts.map((product) => (
                  <tr key={product.id} className="border-t border-brand-100">
                    {COLUMNS.map((col) => (
                      <td key={col.key} className="px-4 py-2.5">{product[col.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Chat IA --- */}
          <div className="mt-4 space-y-2 rounded-xl border border-brand-200 bg-brand-50 p-4 pb-8">
            <p className="text-xs text-brand-900/60">💬 Chat IA</p>
            <ChatBubble from="user">¿Cuánto vale el inventario?</ChatBubble>
            <ChatBubble from="bot">
              El valor total es <strong>$1,245,800 MXN</strong> 📊
            </ChatBubble>
          </div>
        </div>
      </div>

      {/* --- Tarjeta flotante de WhatsApp --- */}
      <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl border border-brand-200 bg-white px-4 py-3 shadow-lg sm:-left-8">
        <span className="text-2xl">📱</span>
        <div>
          <p className="text-sm font-bold">WhatsApp conectado</p>
          <p className="text-xs text-brand-900/50">Consulta desde tu celular</p>
        </div>
      </div>
    </div>
  );
}