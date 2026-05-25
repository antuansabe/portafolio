import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antonio Fernandez · Senior AI Engineer & Full-Stack Developer",
  description: "Portafolio de Antonio Fernandez (Antonn). Desarrollo de productos digitales con Inteligencia Artificial, chatbots avanzados, OCR y desarrollo web prémium con diseño minimalista japonés.",
  keywords: ["Antonio Fernandez", "Antonn", "AI Engineer", "Senior AI Engineer", "Full-Stack Developer", "Next.js", "AI Integration", "React", "Python"],
  authors: [{ name: "Antonio Fernandez" }],
  openGraph: {
    title: "Antonio Fernandez | Senior AI Engineer & Full-Stack Developer",
    description: "Construyo productos digitales con Inteligencia Artificial. Servicios de desarrollo web y consultoría AI.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-zen text-foreground-zen selection:bg-pastel-sage selection:text-foreground-zen">
        {children}
      </body>
    </html>
  );
}
