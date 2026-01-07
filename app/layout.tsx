import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "OU BERHAYLA | Creative UI & UX Designer Portfolio",
  description: "Modern & Premium UI/UX design portfolio for high-end digital experiences.",
};

import { ClientProviders } from "@/components/providers/ClientProviders";
import { PortfolioUI } from "@/components/layout/PortfolioUI";
import { PageTransition } from "@/components/ui/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
        <ClientProviders>
          <PortfolioUI>
            <PageTransition>
              {children}
            </PageTransition>
          </PortfolioUI>
        </ClientProviders>
      </body>
    </html>
  );
}

