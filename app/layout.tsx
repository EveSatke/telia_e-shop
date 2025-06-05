import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";

const helveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeue-Light.otf",
      weight: "400",
      style: "light",
    },
    {
      path: "./fonts/HelveticaNeue-Roman.otf",
      weight: "500",
      style: "roman",
    },
    {
      path: "./fonts/HelveticaNeueBold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "E-shop",
  description: "E-shop of mobile phones and accessories",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={helveticaNeue.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
