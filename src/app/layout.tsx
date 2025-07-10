import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SUNRICE TAXI — приключение начинается",
  description: "NFT-игра, комьюнити, световые послания и цифровая магия. Присоединяйся к SUNRICE COMMUNITY!",
  keywords: ["NFT", "Sunrice", "Web3", "игра", "комьюнити", "приключение", "цифровая магия"],
  openGraph: {
    title: "SUNRICE TAXI — приключение начинается",
    description: "NFT-игра, комьюнити, световые послания и цифровая магия. Присоединяйся к SUNRICE COMMUNITY!",
    url: "https://www.psyfreeman.art/",
    siteName: "SUNRICE COMMUNITY",
    images: [
      {
        url: "https://www.psyfreeman.art/",
        width: 1200,
        height: 630,
        alt: "SUNRICE COMMUNITY",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#181c1f" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
