"use client"
import Image from 'next/image';
import { SlideUp } from './animation/slideUp';

export default function Features() {
  return (
    <section className="feature">
      <SlideUp transition={{
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut"
      }}>
        <h1>Why Thousands of <br /> Businesses Trust Us?</h1>
      </SlideUp>
      <SlideUp transition={{
        duration: 0.8,
        delay: 0.9,
        ease: "easeOut"
      }}>
        <p>Tailored strategies for small <br /> Businesses</p>
      </SlideUp>
      <div className="feature_banner">
        <SlideUp transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut"
        }}>
          <Image src="/assets/feature.svg" alt="Features" width={500} height={400} />
        </SlideUp>
        <div className="feature_content_container">
          <SlideUp transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut"
          }}>
            <div className="feature_content">
              <Image src="/assets/budget.svg" alt="Budget Friendly" width={50} height={50} />
              <p>Budget-Friendly Packages</p>
            </div>
          </SlideUp>
          <SlideUp transition={{
            duration: 0.9,
            delay: 0.7,
            ease: "easeOut"
          }}>
            <div className="feature_content">
              <Image src="/assets/data-driven.svg" alt="Data Driven" width={50} height={50} />
              <p>Data-Driven & Results-Oriented Approach</p>
            </div>
          </SlideUp>
          <SlideUp transition={{
            duration: 0.5,
            delay: 0.9,
            ease: "easeOut"
          }}>
            <div className="feature_content">
              <Image src="/assets/black-support.svg" alt="Support" width={50} height={50} />
              <p>Dedicated Support & Monthly Reports</p>
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}