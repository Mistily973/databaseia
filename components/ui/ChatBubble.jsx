// Tabla de estilos: tema → quién habla → clases
const STYLES = {
  light: {
    user: "bg-brand-600 text-white",
    bot: "border border-brand-200 bg-white text-brand-900",
  },
  dark: {
    user: "bg-brand-600 text-white",
    bot: "border border-white/10 bg-white/5 text-white/90",
  },
};

export default function ChatBubble({ from = "bot", theme = "light", children }) {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${STYLES[theme][from]}`}>
        {children}
      </div>
    </div>
  );
}