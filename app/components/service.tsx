"use client"

import Image from 'next/image';
import { SlideUp } from './animation/slideUp';
import ButtonAnimate from './animation/buttonAnimate';

export default function Services() {
  return (
    <section id="services" className="services">
      <SlideUp transition={{
        duration: 0.2,
        delay: 0.2,
        ease: "easeOut"
      }}>
        <h1 className="services_title">Our Services</h1>
      </SlideUp>
      <SlideUp transition={{
        duration: 0.3,
        delay: 0.3,
        ease: "easeOut"
      }}>
        <div className="left_service">
          <Image src="/assets/social_marketing_svg.svg" alt="Social Media Marketing" width={400} height={300} />
          <div className="service_content first_service flex flex-col gap-[30px]">
            <div>
              <h1>Social Media Marketing</h1>
              <p>Boost engagement, grow your audience, and increase conversions with strategic content and Ad campaigns on across social media.</p>
            </div>
            <div >
              <a href="https://form.jotform.com/250930986221155">
                <ButtonAnimate>Learn More</ButtonAnimate>
              </a>
            </div>
          </div>
        </div>
      </SlideUp>
      <SlideUp transition={{
        duration: 0.3,
        delay: 0.3,
        ease: "easeOut"
      }}>
        <div className="right_service">
          <div id="second_service" className="service_content">
            <div>
              <h1>SEO & Ads Campaigns</h1>
              <p>Rank higher on Google, drive organic traffic, and maximize ROI with optimized SEO strategies and targeted ads on Google, Facebook, and Instagram.</p>
            </div>

            <a href="https://form.jotform.com/250930986221155">
              <ButtonAnimate>Learn More</ButtonAnimate>
            </a>
          </div>
          <Image src="/assets/seo.svg" alt="SEO & Ads" width={400} height={300} />
        </div>
      </SlideUp>
      <SlideUp transition={{
        duration: 0.3,
        delay: 0.3,
        ease: "easeOut"
      }}>
        <div className="left_service">
          <Image src="/assets/website.svg" alt="Website Building" width={400} height={300} />
          <div className="service_content third_service">
            <div>
              <h1>Website Building & Management</h1>
              <p>Get a professional website tailored to your brand. We handle design, development, and ongoing maintenance to ensure peak performance.</p>
            </div>
            <a href="https://form.jotform.com/250930986221155">
              <ButtonAnimate>Learn More</ButtonAnimate>
            </a>
          </div>
        </div>
      </SlideUp>
    </section>
  );
}