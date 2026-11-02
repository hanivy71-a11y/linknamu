import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { themeInitScript } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import "./globals.css";

const plexSansKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 테마 스크립트가 렌더링 전에 class="dark"를 붙이므로 하이드레이션 경고를 끈다.
    <html lang="ko" suppressHydrationWarning className={plexSansKr.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
