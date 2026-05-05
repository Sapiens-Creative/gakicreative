import type { Metadata } from "next";
import "./globals.css";
import { Google_Sans, Ovo } from "next/font/google";
import { cn } from "@/lib/utils";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GAKI — Comunicação Estratégica",
  description:
    "A Gaki é uma agência-estúdio de comunicação estratégica em São Paulo. Design, conteúdo e consultoria integrados — para empresas que crescem e precisam que a comunicação acompanhe.",
  keywords: [
    "comunicação estratégica",
    "agência de comunicação",
    "branding",
    "identidade visual",
    "conteúdo para redes sociais",
    "consultoria de marketing",
    "São Paulo",
    "Gaki",
  ],
  authors: [{ name: "Gaki Comunicação Estratégica" }],
  creator: "Gaki Comunicação Estratégica",
  publisher: "Gaki Comunicação Estratégica",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "GAKI — Comunicação Estratégica",
    description:
      "Design, conteúdo e consultoria — integrados ou por demanda. Para empresas que crescem com comunicação proporcional.",
    type: "website",
    locale: "pt_BR",
    siteName: "GAKI",
    url: "https://gaki.com.br",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAKI — Comunicação Estratégica",
    description:
      "Design, conteúdo e consultoria — integrados ou por demanda.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("font-sans", googleSans.variable, ovo.variable)}
    >
      <body data-theme="light">{children}</body>
    </html>
  );
}
