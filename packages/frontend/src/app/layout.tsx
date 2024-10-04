import type { Metadata } from "next";
import "@/styles/globals.css";
import { DM_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";
import LayoutWrapper from "@/app/LayoutWrapper";
import Header from "@/components/layout/Header";
import { Toaster } from "sonner";

require("@solana/wallet-adapter-react-ui/styles.css");

export const metadata: Metadata = {
  title: "Blinkord - Monetize your Discord Community effortlessly",
  description:
    "Monetize your Discord Community effortlessly. Blinkord enables you to integrate Solana interactions directly within your Discord server. Create custom links for premium content, NFTs, token swaps, donations, and more. Secure, fast payments in SOL via Solana Actions, all within Discord.",
  keywords: [
    "Discord premium content",
    "Monetize Discord server with blockchain",
    "Solana payments on Discord",
    "Custom Solana blinks",
    "NFT purchases on Discord",
    "Token swaps in Discord",
    "DAO voting in Discord",
    "Secure payments in SOL",
    "Discord role management",
    "Solana integration for Discord",
    "Blockchain transactions in Discord",
    "Blinkord Bot for Solana",
  ],
  openGraph: {
    title: "Blinkord - Monetize and Power Your Discord with Solana",
    description:
      "Transform your Discord community with Blinkord. Enable Solana-powered transactions for premium roles, NFT trading, token swaps, and more. All secured through blockchain technology and made seamless with Blinkord Bot.",
    url: "https://blinkord.com",
    type: "website",
    images: [
      {
        url: "https://blinkord.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blinkord platform enabling Solana transactions in Discord",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blinkord - Power Your Discord with Solana",
    description:
      "Monetize your Discord server with Blinkord. Enable Solana interactions directly within your Discord Server.",
    images: ["https://blinkord.com/images/og-image.png"],
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <LayoutWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* SEO Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />

          {/* Open Graph & Twitter Cards */}
          <meta
            property="og:title"
            content="Blinkord - Monetize your Discord Community"
          />
          <meta
            property="og:description"
            content="Monetize your Discord server effortlessly. Create shareable links that enable Solana interactions directly within your Discord Server"
          />
          <meta property="og:url" content="https://blinkord.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://blinkord.com/images/og-image.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Blinkord platform interface" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Blinkord - Monetize your Discord Community"
          />
          <meta
            name="twitter:description"
            content="Monetize your Discord server effortlessly. Create shareable links that enable Solana interactions directly within your Discord Server"
          />
          <meta
            name="twitter:image"
            content="https://blinkord.com/images/og-image.png"
          />

          <script src="/scripts/mailgo.min.js" />
          <meta name="dscvr:canvas:version" content="vNext" />
        </head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_10%,#63e_100%)] dark:bg-slate-950 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_10%,#63e_100%)]",
            fontSans.variable
          )}
        >
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" />
        </body>
      </html>
    </LayoutWrapper>
  );
}
