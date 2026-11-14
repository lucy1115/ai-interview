import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["600", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Rehearse 面試演練｜AI 模擬面試",
  description: "貼上職缺描述，AI 面試官依職缺出題、逐題評分，並給你每一題的示範回答。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
