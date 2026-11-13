"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserLocalPersistence, setPersistence, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth, authErrorMessage } from "@/lib/firebase";

import AuthSuccessAnimation from "./AuthSuccessAnimation";

export default function RegisterForm() {
  const router = useRouter();
  const requestPending = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const completeSignIn = useCallback(() => router.replace("/"), [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestPending.current || isSuccess || successMessage) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    if (requestPending.current || isSuccess || successMessage) return;
    requestPending.current = true;
    setIsLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      try {
        await updateProfile(user, { displayName: name.trim() });
      } catch {
        setSuccessMessage("Tu cuenta fue creada, pero no pudimos guardar tu nombre. Puedes continuar al inicio.");
        return;
      }
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(authErrorMessage(error));
    } finally {
      requestPending.current = false;
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (requestPending.current || isSuccess || successMessage) return;
    requestPending.current = true;
    setIsGoogleLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, new GoogleAuthProvider());
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(authErrorMessage(error));
    } finally {
      requestPending.current = false;
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      {isSuccess && <AuthSuccessAnimation mode="signup" onComplete={completeSignIn} />}
    <div inert={isSuccess} className="w-full max-w-sm mx-auto">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-brand-900 tracking-tight">
            Crea tu cuenta gratis
          </h1>
          <p className="mt-2 text-sm text-brand-900/70">
            Empieza a transformar tus Excel en IA con <span className="font-semibold text-brand-700">DATAI</span>
          </p>
        </div>

        {errorMessage && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage} <Link href="/" className="underline">Ir al inicio</Link></span>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isGoogleLoading || isLoading || isSuccess || !!successMessage}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-brand-50/60 text-brand-900 font-medium text-sm rounded-xl border border-brand-200 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <svg className="animate-spin h-5 w-5 text-brand-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
          <span>{isGoogleLoading ? "Conectando con Google..." : "Registrarse con Google"}</span>
        </button>

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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="register-name"
              className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5"
            >
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-brand-200 rounded-xl text-brand-900 placeholder-brand-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                placeholder="Juan Pérez"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="register-email"
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
              htmlFor="register-password"
              className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-900/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full pl-11 pr-11 py-2.5 bg-white border border-brand-200 rounded-xl text-brand-900 placeholder-brand-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-900/40 hover:text-brand-700 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="register-confirm-password" className="block text-xs font-bold uppercase tracking-wider text-brand-900/80 mb-1.5">
              Confirmar contraseña
            </label>
            <input
              id="register-confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-4 py-2.5 bg-white border border-brand-200 rounded-xl text-brand-900 placeholder-brand-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              placeholder="Repite tu contraseña"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading || isSuccess || !!successMessage}
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Creando cuenta...</span>
              </>
            ) : (
              <span>Crear cuenta gratis</span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-900/70">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
