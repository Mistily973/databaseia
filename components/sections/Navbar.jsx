import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { navLinks } from "@/lib/data/content";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />

        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <a href="#" className="nav-link hidden sm:block">Iniciar sesión</a>
          <Button href="#precios" size="sm">Empezar gratis</Button>
        </div>
      </nav>
    </header>
  );
}