import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Noto_Sans_KR,
  Black_Han_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { PageGradient } from "@/components/layout/page-gradient";
import "@/styles/globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "VALORANT FC CARD",
  description: "나만의 발로란트 FC 카드를 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
          className={`${barlowCondensed.variable} ${notoSansKR.variable} ${blackHanSans.variable}`}
        >
        <PageGradient />
        {children}
        <Footer />
      </body>
    </html>
  );
}
