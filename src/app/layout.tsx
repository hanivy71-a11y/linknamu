import type { Metadata } from "next";
import localFont from "next/font/local";
import { themeInitScript } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import "./globals.css";

// Pretendard 가변 폰트(pretendard 패키지)를 직접 번들해 외부 CDN 없이 쓴다.
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  weight: "45 920",
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
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
