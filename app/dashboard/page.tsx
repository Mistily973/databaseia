"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import ProtectedRoute from "@/components/safety/ProtectedRoute";
import Dashboard, { Usuario } from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Toma el nombre y correo de la cuenta que inició sesión
  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), (user) => {
      if (!user) return;
      setUsuario({
        nombre:
          user.displayName?.trim() || user.email?.split("@")[0] || "Usuario",
        correo: user.email ?? "",
      });
    });
  }, []);

  const cerrarSesion = async () => {
    await signOut(getFirebaseAuth());
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      {usuario && (
        <Dashboard
          usuario={usuario}
          onLogout={cerrarSesion}
          onPreguntarIA={() => router.push("/chat")}
          onWhatsApp={() => router.push("/whatsapp")}
        />
      )}
    </ProtectedRoute>
  );
}
