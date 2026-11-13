import AuthShell from "@/components/auth/AuthShell";
import "@/components/auth/auth-animations.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
