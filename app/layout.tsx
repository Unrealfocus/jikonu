import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Jikonu - Digital Marketing, SEO & Web Development Services',
  description: 'Grow your brand with Jikonu. We offer expert social media marketing, SEO, ads campaigns, and website development tailored to your goals.',
  keywords: 'Jikonu, digital marketing, SEO services, social media marketing, website development, Google Ads, Facebook Ads, Instagram marketing',
  openGraph: {
    title: 'Jikonu Digital Services',
    description: 'Expert services in social media marketing, SEO, ads, and web development.',
    url: 'https://www.jikonu.com/',
    images: [
      {
        url: '/assets/jikonu.svg',
        alt: 'Jikonu Social Media Marketing',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Header />
        <div className="md:p-[20px] p-[0px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
