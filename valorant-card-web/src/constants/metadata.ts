import type { Metadata } from "next";

const SITE_URL = "https://valfc-card.com";
const SITE_TITLE = "VAL CARD";
const SITE_DESCRIPTION = "나만의 발로란트 카드를 만들어보세요";

const siteMetadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, siteMetadata };
