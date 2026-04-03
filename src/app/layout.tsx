import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat, Cormorant_Garamond, Noto_Serif, Plus_Jakarta_Sans, Manrope } from "next/font/google";
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

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Kenjabek & Safiya - Nikoh to'yi",
  description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
  openGraph: {
    title: "Kenjabek & Safiya - Nikoh to'yi",
    description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
    siteName: "taklifnoma.ai",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/assets/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Kenjabek & Safiya Nikoh to'yi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenjabek & Safiya - Nikoh to'yi",
    description: "Bizning baxtli kunimizga lutfan taklif etamiz!",
    images: ["/assets/og-preview.jpg"],
  },
};

import { Providers } from "./providers";
import LeadCaptureModal from "@/components/LeadCaptureModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${playfairDisplay.variable} ${montserrat.variable} ${cormorant.variable} ${notoSerif.variable} ${plusJakartaSans.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block" />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Taklifnoma.Asia",
                    "operatingSystem": "Web",
                    "applicationCategory": "DesignApplication",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": "1240"
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "190000",
                      "priceCurrency": "UZS"
                    },
                    "description": "Eng chiroyli va interaktiv virtual taklifnomalar yaratish xizmati O'zbekistonda."
                })
            }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
            {children}
            <LeadCaptureModal />
        </Providers>
      </body>
    </html>
  );
}
