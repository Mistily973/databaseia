"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type AuthSuccessAnimationProps = {
  mode: "login" | "signup"
  onComplete: () => void
}

export default function AuthSuccessAnimation({
  mode,
  onComplete,
}: AuthSuccessAnimationProps) {
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    statusRef.current?.focus();
    const timer = window.setTimeout(onComplete, 1600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const isSignup = mode === "signup"

  return (
    <div
      className="auth-success"
      ref={statusRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      aria-label={
        isSignup
          ? "Cuenta creada correctamente"
          : "Sesión iniciada correctamente"
      }
    >
      <div className="auth-success__backdrop" />
      <div className="auth-success__card">
        <div className="auth-success__celebration" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <i
              key={index}
              style={{ "--piece": index } as CSSProperties}
            />
          ))}
        </div>

        <div className="auth-success__icon" aria-hidden="true">
          <span className="auth-success__ring" />
          <svg viewBox="0 0 56 56" fill="none">
            <path
              d="m16 29 8 8 17-19"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="auth-success__eyebrow">
          {isSignup ? "Todo preparado" : "Acceso confirmado"}
        </p>
        <h2>
          {isSignup ? "¡Tu cuenta está lista!" : "¡Bienvenido de vuelta!"}
        </h2>
        <p className="auth-success__copy">
          {isSignup
            ? "Tu cuenta de DATAI está preparada."
            : "Estamos abriendo DATAI."}
        </p>

        <div className="auth-success__progress" aria-hidden="true">
          <span />
        </div>
      </div>


    </div>
  )
}
