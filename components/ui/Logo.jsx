import Link from "next/link";

export default function Logo({ dark = false }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M3 4h10M3 8h7M3 12h10" />
        </svg>
      </span>
      <span className={`text-lg font-bold ${dark ? "text-white" : "text-brand-900"}`}>
        Data<span className="text-brand-500">Base</span>IA
      </span>
    </Link>
  );
}