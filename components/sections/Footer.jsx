import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/data/content";

export default function Footer() {
  const footerLinks = navLinks.filter((link) => link.showInFooter);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 py-10">
      <div className="container-page flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <Logo dark />

        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-brand-200 transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-brand-200/50">
          © {year} DataBaseIA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}