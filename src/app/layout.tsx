import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat, Cormorant_Garamond, Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taklifnoma.ai"),
  title: "Virtual Taklifnoma",
  description: "Sizni eng baxtli kunimizga lutfan taklif etamiz!",
  openGraph: {
    siteName: "taklifnoma.ai",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/assets/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${playfairDisplay.variable} ${montserrat.variable} ${cormorant.variable} ${notoSerif.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
