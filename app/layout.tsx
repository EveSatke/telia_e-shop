import './globals.css'
import { Metadata } from 'next'
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'E-shop',
  description: 'E-shop of mobile phones and accessories',
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @font-face {
              font-family: 'HelveticaNeue';
              src: url('/telia_e-shop/fonts/HelveticaNeue-Light.otf') format('opentype');
              font-weight: 400;
              font-style: light;
            }
            @font-face {
              font-family: 'HelveticaNeue';
              src: url('/telia_e-shop/fonts/HelveticaNeue-Roman.otf') format('opentype');
              font-weight: 500;
              font-style: roman;
            }
            @font-face {
              font-family: 'HelveticaNeue';
              src: url('/telia_e-shop/fonts/HelveticaNeueBold.ttf') format('truetype');
              font-weight: 700;
              font-style: bold;
            }
          `}
        </style>
      </head>
      <body className="font-['HelveticaNeue']">
        <Header />
        {children}
      </body>
    </html>
  )
}
