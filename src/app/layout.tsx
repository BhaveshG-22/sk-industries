import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex, Arimo } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

async function getSiteSettings() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: ['site_name', 'site_description', 'meta_title', 'meta_description']
        }
      }
    });

    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      siteName: settingsMap.site_name || 'SK Group Industries',
      siteDescription: settingsMap.site_description || 'Quality products for your home and business',
      metaTitle: settingsMap.meta_title || settingsMap.site_name || 'SK Group Industries',
      metaDescription: settingsMap.meta_description || settingsMap.site_description || 'Quality products for your home and business'
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {
      siteName: 'SK Group Industries',
      siteDescription: 'Quality products for your home and business',
      metaTitle: 'SK Group Industries',
      metaDescription: 'Quality products for your home and business'
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: siteSettings.metaTitle,
    description: siteSettings.metaDescription,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable} ${arimo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
