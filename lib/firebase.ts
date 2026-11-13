import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Public Firebase web configuration for the existing DATAI project.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function getFirebaseAuth() {
  const required = [firebaseConfig.apiKey, firebaseConfig.authDomain, firebaseConfig.projectId, firebaseConfig.appId];
  if (required.some((value) => !value?.trim())) {
    throw Object.assign(new Error("Missing Firebase web configuration"), { code: "auth/configuration-missing" });
  }
  const app = getApps().find((app) => app.name === "[DEFAULT]") ?? initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = "es";
  return auth;
}

export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";
  const messages: Record<string, string> = {
    "auth/configuration-missing": "El acceso no está disponible por un problema de configuración. Contacta al administrador.",
    "auth/invalid-api-key": "El acceso no está disponible por un problema de configuración. Contacta al administrador.",
    "auth/app-not-authorized": "Esta aplicación no está autorizada para iniciar sesión. Contacta al administrador.",
    "auth/web-storage-unsupported": "El navegador no permite guardar la sesión. Habilita el almacenamiento del sitio e inténtalo de nuevo.",
    "auth/operation-not-supported-in-this-environment": "Abre DATAI en un navegador compatible para iniciar sesión.",
    "auth/invalid-credential": "El correo o la contraseña son incorrectos.",
    "auth/wrong-password": "El correo o la contraseña son incorrectos.",
    "auth/user-not-found": "El correo o la contraseña son incorrectos.",
    "auth/invalid-email": "Ingresa un correo electrónico válido.",
    "auth/email-already-in-use":
      "Este correo ya tiene una cuenta. Inicia sesión o recupera tu contraseña.",
    "auth/weak-password":
      "La contraseña no cumple los requisitos de seguridad. Usa una más segura.",
    "auth/password-does-not-meet-requirements":
      "La contraseña no cumple los requisitos de seguridad. Usa una más segura.",
    "auth/too-many-requests":
      "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.",
    "auth/network-request-failed":
      "No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.",
    "auth/popup-closed-by-user":
      "Cerraste la ventana de Google antes de completar el acceso.",
    "auth/popup-blocked":
      "Permite las ventanas emergentes para continuar con Google.",
    "auth/cancelled-popup-request":
      "Ya hay una solicitud de acceso con Google en curso.",
    "auth/account-exists-with-different-credential":
      "Este correo utiliza otro método de acceso. Inicia sesión con ese método.",
    "auth/operation-not-allowed":
      "Este método de acceso no está habilitado. Contacta al administrador.",
    "auth/unauthorized-domain":
      "Este dominio no está autorizado para iniciar sesión. Contacta al administrador.",
    "auth/user-disabled":
      "Esta cuenta está deshabilitada. Contacta al administrador.",
  };
  return (
    messages[code] ?? "No pudimos completar la solicitud. Inténtalo de nuevo."
  );
}
