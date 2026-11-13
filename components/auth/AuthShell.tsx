"use client";

import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import AuthAnimations from "./AuthAnimations";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const isSignup = usePathname() === "/register";
  return (
    <main className="min-h-screen bg-[#f5faf0] lg:flex">
      <aside className={`relative hidden w-1/2 overflow-hidden bg-[#1e3d0e] p-12 lg:flex items-center justify-center ${isSignup ? "order-2" : "order-1"}`}>
        <div aria-hidden="true" className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_60%_40%,#c5e1a5_0%,transparent_65%)]" />
        <div className="relative z-10 w-full max-w-md">
          {isSignup ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5e1a5]">Empieza en minutos</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-white">Tus datos, listos para responder</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a8d080]">Crea tu espacio, sube tu primer Excel y consulta la información de tu negocio sin fórmulas ni tecnicismos.</p>
              <AuthAnimations mode="signup" className="-mb-8" />
            </>
          ) : (
            <>
              <Logo dark />
              <AuthAnimations mode="login" className="-my-7" />
              <h2 className="text-3xl font-bold leading-tight text-white">Transforma tus hojas de cálculo en bases de datos inteligentes</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#a8d080]">Sube tu archivo Excel y en segundos tendrás una base de datos consultable con lenguaje natural desde el chat o WhatsApp.</p>
            </>
          )}
        </div>
      </aside>
      <section className={`flex min-h-screen min-w-0 flex-1 items-center justify-center px-6 py-10 sm:p-8 ${isSignup ? "order-1" : "order-2"}`}>
        <div className="w-full max-w-sm">
          <div className={`mb-8 ${isSignup ? "" : "lg:hidden"}`}><Logo /></div>
          {children}
        </div>
      </section>
    </main>
  );
}
