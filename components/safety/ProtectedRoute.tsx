"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      setUser(currentUser);
      if (currentUser === null) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (user === undefined) {
    return <p role="status">Comprobando sesion...</p>;
  }
  if (user === null) {
    return <p role="status">Redirigiendo al login...</p>;
  }
  return <>{children}</>;
}
