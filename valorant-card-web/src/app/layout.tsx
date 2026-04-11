import {
  Barlow_Condensed,
  Noto_Sans_KR,
  Black_Han_Sans,
} from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { PageGradient } from "@/components/layout/page-gradient";
import { siteMetadata } from "@/constants/site/metadata";
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

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${barlowCondensed.variable} ${notoSansKR.variable} ${blackHanSans.variable}`}
    >
      <body>
        <PageGradient />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
