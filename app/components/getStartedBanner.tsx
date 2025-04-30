"use client"
import Image from 'next/image';
import { SlideUp } from './animation/slideUp';
import ButtonAnimate from './animation/buttonAnimate';


export default function GetStartedBanner() {
  return (
    <>
      <SlideUp transition={{
        duration: 0.5,
        delay: 0.9,
        ease: "easeOut"
      }}>
        <section className="footer_banner">
          <div className="content flex flex-col justify-between py-[50px]">
            <h1>Ready to <span>Grow <br />Your Business?</span></h1>
            <a href="https://form.jotform.com/250930986221155">
              <ButtonAnimate>Get Started Today!</ButtonAnimate>
            </a>
          </div>
          <div className="footer-banner-image">
            <div>
              <Image src="/assets/zig-svg.svg" alt="Decoration" width={100} height={50} />
              <Image src="/assets/zig-arrow-svg.svg" alt="Arrow" width={50} height={30} />
            </div>
          </div>
        </section>
      </SlideUp>

     
    </>
  );
}