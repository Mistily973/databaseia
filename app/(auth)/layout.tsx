import Logo from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-brand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8"><Logo /></div>
      {children}
    </main>
  );
}
