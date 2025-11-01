import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SellerAuthProvider } from "@/context/SellerAuthContext";


const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: 'AbaTrade - Authentic Nigerian Artisans | Houston-Aba Marketplace',
  description: 'Connect with verified Nigerian artisans from Aba. Trusted B2B/B2C marketplace featuring quality-assured handcrafted products, secure escrow payments, and end-to-end logistics from Nigeria to Houston, Texas.',
  keywords: 'AbaTrade, Nigerian artisans, Aba marketplace, Houston Nigerian products, verified sellers, handcrafted goods, African marketplace, B2B marketplace, Nigerian leather goods, Aba craftsmanship, cross-border trade, Nigerian exports',
  openGraph: {
    title: 'AbaTrade - Houston-Aba Pilot Marketplace',
    description: 'Connecting authentic Nigerian artisans with Houston buyers through verified trust and quality. Shop handcrafted leather goods, textiles, accessories and more from Aba, Nigeria.',
    url: 'https://www.jikonu.com/',
    images: [
      {
        url: '/assets/abatrade-og.jpg',
        alt: 'AbaTrade Marketplace - Authentic Nigerian Craftsmanship',
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
        <AuthProvider>
          <SellerAuthProvider>
            <CartProvider>
              <Header />
              <div className="md:p-[20px] p-[0px]">
                {children}
              </div>
              <Footer />
            </CartProvider>
          </SellerAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
