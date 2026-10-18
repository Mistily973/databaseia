import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DataBaseIA
        </Link>
      </div>
      <RegisterForm />
    </div>
  );
}
