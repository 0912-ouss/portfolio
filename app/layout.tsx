import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "OU BERHAYLA | Creative UI & UX Designer Portfolio",
  description: "Modern & Premium UI/UX design portfolio showcasing high-end digital experiences, web design, and creative solutions for luxury brands.",
  keywords: ["UI Designer", "UX Designer", "Portfolio", "Web Design", "Creative", "Luxury Design"],
  authors: [{ name: "OU BERHAYLA" }],
  creator: "OU BERHAYLA",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FF6B35' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://ouberhayla.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ouberhayla.com',
    title: "OU BERHAYLA | Creative UI & UX Designer",
    description: "Modern & Premium UI/UX design portfolio",
    siteName: "OU BERHAYLA Portfolio",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'OU BERHAYLA Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "OU BERHAYLA | UI & UX Designer",
    description: "Modern & Premium UI/UX design portfolio",
    images: ['/twitter-image.jpg'],
  },
};

import { ClientProviders } from "@/components/providers/ClientProviders";
import { PortfolioUI } from "@/components/layout/PortfolioUI";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
        <StructuredData />
        <ErrorBoundary>
          <ClientProviders>
            <PortfolioUI>
              {children}
            </PortfolioUI>
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}

