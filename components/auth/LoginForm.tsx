"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { getFirebaseAuth, authErrorMessage } from "@/lib/firebase";

import AuthSuccessAnimation from "./AuthSuccessAnimation";

export default function LoginForm() {
  const router = useRouter();
  const requestPending = useRef(false);
  const resetPending = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal / Drawer para recuperación de contraseña
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const completeSignIn = useCallback(() => router.replace("/"), [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestPending.current || isSuccess) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (requestPending.current || isSuccess) return;
    requestPending.current = true;
    setIsLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(authErrorMessage(error));
    } finally {
      requestPending.current = false;
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (requestPending.current || isSuccess) return;
    requestPending.current = true;
    setIsGoogleLoading(true);
    setErrorMessage(null);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithPopup(auth, new GoogleAuthProvider());
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(authErrorMessage(error));
    } finally {
      requestPending.current = false;
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPending.current) return;
    if (!resetEmail.trim()) {
      setResetMessage({ type: "error", text: "Ingresa tu correo electrónico." });
      return;
    }
    resetPending.current = true;
    setResetLoading(true);
    setResetMessage(null);
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), resetEmail.trim());
      setResetMessage({ type: "success", text: "Si existe una cuenta con este correo, recibirás un enlace de recuperación. Revisa también spam." });
    } catch (error) {
      const notFound = typeof error === "object" && error !== null && "code" in error && error.code === "auth/user-not-found";
      setResetMessage(notFound
        ? { type: "success", text: "Si existe una cuenta con este correo, recibirás un enlace de recuperación. Revisa también spam." }
        : { type: "error", text: authErrorMessage(error) });
    } finally {
      resetPending.current = false;
      setResetLoading(false);
    }
  };

  return (
    <>
      {isSuccess && <AuthSuccessAnimation mode="login" onComplete={completeSignIn} />}
    <div inert={isSuccess} className="w-full max-w-sm mx-auto">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-brand-900 tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-brand-900/70">
            Ingresa a tu cuenta de{" "}
            <span className="font-semibold text-brand-700">DATAI</span>
          </p>
        </div>

        {/* Notificación de error */}
        {errorMessage && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Notificación de éxito */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Botón de acceso rápido con Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading || isSuccess}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-brand-50/60 text-brand-900 font-medium text-sm rounded-xl border border-brand-200 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-brand-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>
            {isGoogleLoading
              ? "Conectando con Google..."
              : "Continuar con Google"}
          </span>
        </button>

        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#f5faf0] px-3 text-brand-900/50 font-medium tracking-wider">
              o con tu correo
            </span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900/40">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-brand-200 rounded-xl text-brand-900 placeholder-brand-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                placeholder="tu@empresa.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900/40">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pl-11 pr-11 py-2.5 bg-white border border-brand-200 rounded-xl text-brand-900 placeholder-brand-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-900/40 hover:text-brand-700 focus:outline-none cursor-pointer"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 border-brand-300 focus:ring-brand-500 cursor-pointer accent-brand-600"
              />
              <span className="text-brand-900/70 text-xs sm:text-sm">
                Recordarme
              </span>
            </label>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setResetEmail(email);
                setResetMessage(null);
              }}
              className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading || isSuccess}
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Validando credenciales...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>

        {/* Enlace al registro */}
        <p className="mt-6 text-center text-sm text-brand-900/70">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-bold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>

      {/* Modal interactivo de recuperación de contraseña */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-brand-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-900">
                Recuperar contraseña
              </h2>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-brand-900/50 hover:text-brand-900 text-lg p-1"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-brand-900/70 mb-6">
              Ingresa el correo asociado a tu cuenta y te enviaremos las
              instrucciones para restablecer tu contraseña.
            </p>

            {resetMessage && (
              <div
                className={`mb-5 p-4 rounded-xl text-sm ${
                  resetMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {resetMessage.text}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-2.5 bg-white border border-brand-200 rounded-xl text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-brand-900/70 hover:text-brand-900 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl shadow-xs disabled:opacity-60"
                >
                  {resetLoading ? "Enviando..." : "Enviar enlace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
