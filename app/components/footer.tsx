"use client"
import Image from 'next/image';
import { SlideUp } from './animation/slideUp';
import ButtonAnimate from './animation/buttonAnimate';


export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="social-div">
            <Image src="/assets/jikonu.svg" alt="Jikonu Logo" width={100} height={40} />
            <div className="social">
              <Image src="/assets/ri_instagram-fill.svg" alt="Instagram" width={30} height={30} />
              <Image src="/assets/twitter.svg" alt="Twitter" width={30} height={30} />
              <Image src="/assets/facebook.svg" alt="Facebook" width={30} height={30} />
            </div>
            <button>Contact Us</button>
          </div>
          <div className="links"></div>
        </div>
        <div className="copy">
          <h1>© 2025 CateredbyAfrica, Inc. - All Rights Reserved</h1>
          <div>
            <p>Terms of use </p>
            <p>Privacy policy </p>
          </div>
        </div>
      </footer>
    </>
  );
}