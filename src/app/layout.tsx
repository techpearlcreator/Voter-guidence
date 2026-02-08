import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import IdleTimer from "@/components/IdleTimer";
import KioskMode from "@/components/KioskMode";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
});

export const metadata: Metadata = {
  title: "Voter Forms Guidance Portal",
  description:
    "Public awareness portal for Election Commission Forms 6, 7, 8 in Tamil and English",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta">
      <body
        className={`${inter.variable} ${notoTamil.variable} antialiased`}
      >
        <LanguageProvider>
          <KioskMode />
          <IdleTimer />
          <Header />
          <main className="min-h-screen">{children}</main>
          {/* Footer */}
          <footer className="bg-navy text-white/60 text-center py-4 4k:py-8 text-sm 4k:text-kiosk-base">
            <div className="flex h-1 4k:h-2 mb-4">
              <div className="flex-1 bg-saffron" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-green-accent" />
            </div>
            <p>Voter Forms Guidance Portal &copy; {new Date().getFullYear()}</p>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
