import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta", // este nombre lo usamos en @theme
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DATAI | Tu Excel convertido en base de datos inteligente",
  description: "Sube tus hojas de cálculo y consulta tu negocio en español, desde la web o WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
