import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "waannalter.github.io";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Shafwan T.A. — DevSecOps & Infrastructure Engineer",
    description: "DevSecOps and Infrastructure Engineer focused on secure delivery, GitOps, cloud and edge platforms, infrastructure as code, and embedded Linux.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Shafwan T.A. — DevSecOps & Infrastructure Engineer",
      description: "Secure, reliable systems—from commit to edge.",
      type: "website",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Shafwan T.A., DevSecOps and Infrastructure Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Shafwan T.A. — DevSecOps & Infrastructure Engineer",
      description: "Secure, reliable systems—from commit to edge.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
