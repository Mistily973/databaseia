import Link from "next/link";


const VARIANTS = {
  primary: "btn-primary",
  outline: "btn-outline",
  soft: "btn-soft",
  light: "btn-light",
  accent: "btn-accent",
};

const SIZES = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3",
};

export default function Button({ href = "#", variant = "primary", size = "md", className = "", children }) {
  return (
    <Link href={href} className={`btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {children}
    </Link>
  );
}