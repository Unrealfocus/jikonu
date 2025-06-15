"use client"

import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobileMenu';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? 'underline text-[red] underline-offset-4 text-black'  
      : 'text-gray-600'; 

  return (
    <section className="header px-[0px] flex items-center justify-between">
      <Link href="/">
        <Image src="/assets/jikonu.svg" alt="Jikonu Logo" width={100} height={40} />
      </Link>

      <div className="link flex gap-6">
        <Link href="/" className={linkStyle("/")}>Home</Link>
        <Link href="/contact" className={linkStyle("/contact")}>Contact us</Link>
        <Link href="/about" className={linkStyle("/about")}>About us</Link>
      </div>

      <Link href="https://form.jotform.com/250930986221155">
        <button className='hidden md:block'>Join Us</button>
      </Link>

      <div className='md:hidden block'>
        <MobileMenu />
      </div>
    </section>
  );
}
