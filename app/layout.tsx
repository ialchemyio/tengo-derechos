import "./globals.css";
import { baseMetadata, orgJsonLd } from "@/lib/seo";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { OfflineStatus } from "@/components/OfflineStatus";

export const metadata = {
  ...baseMetadata,
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport = {
  themeColor: "#fdfaf3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ServiceWorkerRegistrar />
        <OfflineStatus />
      </body>
    </html>
  );
}
