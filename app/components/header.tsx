"use client"

import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './mobileMenu';

export default function Header() {
  return (
    <section className="header px-[0px]">
      <Link href="/">
        <Image src="/assets/jikonu.svg" alt="Jikonu Logo" width={100} height={40} />
      </Link>
      <div className="link">
        <Link href="/contact">Contact us</Link>
        <Link href="/about">About us</Link>
      </div>
      <Link href="https://form.jotform.com/250930986221155">
        <button className='hidden md:block '>
          Sign up
        </button>
      </Link>
      <div className=' md:hidden block'>
        <MobileMenu />
      </div>
    </section>
  );
}