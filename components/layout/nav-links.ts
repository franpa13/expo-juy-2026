export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-expojuy", label: "Sobre ExpoJuy" },
  { href: "/expositores", label: "Expositores" },
  { href: "/agenda", label: "Agenda" },
  { href: "/mapa", label: "Mapa del predio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];
