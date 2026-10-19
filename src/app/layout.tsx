import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "greek"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const title = "Τεντοδιακοσμητική Κύμης | Τέντες, Πέργκολες & Συστήματα Σκίασης";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: "/images/projects/rooftop-reed-seating.jpg",
        width: 2000,
        height: 2667,
        alt: "Σκιασμένος εξωτερικός χώρος εστίασης με ψάθινες επιφάνειες και τραπεζοκαθίσματα",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/projects/rooftop-reed-seating.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07111C",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/projects/rooftop-reed-seating.jpg`,
  telephone: "+306970148794",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Παραλία Κύμης",
    postalCode: "34003",
    addressLocality: "Κύμη",
    addressRegion: "Εύβοια",
    addressCountry: "GR",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Κύμη, Εύβοια",
  },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el" className={manrope.variable}>
      <body className="overflow-x-clip bg-[#F7F7F2] font-sans text-[#101820] antialiased selection:bg-[#318BC3] selection:text-[#07111C]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
