import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";


const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: 'Jikonu - Digital Marketing, SEO & Web Development Services',
  description: 'Grow your brand with Jikonu. We offer expert social media marketing, SEO, ads campaigns, and website development tailored to your goals. Expert Digital Marketing for Growth · Our Services · Social Media Marketing · SEO & Ads Campaigns · Website Building & Management · Why Thousands of. Businesses ...',
  keywords: 'Jikonu,jikonu.com,jikonu, digital marketing, SEO services, social media marketing, website development, Google Ads, Facebook Ads, Instagram marketing ',
  openGraph: {
    title: 'Jikonu Digital Services',
    description: 'Expert services in social media marketing, SEO, ads, and web development. Expert Digital Marketing for Growth · Our Services · Social Media Marketing · SEO & Ads Campaigns · Website Building & Management · Why Thousands of. Businesses ...',
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
    <html className={rubik.variable} lang="en">
      <body
        className={`font-rubik`}
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
