export const SITE = {
  name: "Radek Bárta",
  tagline: "Strategie, stabilita a vědomý růst.",
  description:
    "Architekt bohatství, tvůrce obsahu a průvodce na cestě za finanční i osobní svobodou.",
  url: "https://www.radekbarta.cz",
  email: "radek@radekbarta.cz",
  emailPrivate: "radek.barta@goldengate.cz",
  phone: "+420 739 758 734",
  phoneRaw: "+420739758734",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/radek.bartaa",
  instagram: "https://www.instagram.com/radek_barta",
  linkedin: "https://www.linkedin.com/in/radek-barta-155a3717b/",
  youtube: "https://www.youtube.com/@radek_barta",
  principyRustu: "https://www.youtube.com/@Principyrustu",
  spotifyMagieZivota: "https://open.spotify.com/show/magie-zivota", // update with real link
} as const;

export const NAV_LINKS = [
  { label: "Domů", href: "/" },
  { label: "Investice", href: "/investice" },
  { label: "YouTube", href: SOCIAL.youtube, external: true },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

export const BOTTOM_NAV = [
  { label: "Domů", href: "/", icon: "home" },
  { label: "Investice", href: "/investice", icon: "chart" },
  { label: "YouTube", href: SOCIAL.youtube, icon: "youtube", external: true },
  { label: "Kontakt", href: "/#kontakt", icon: "mail" },
] as const;
