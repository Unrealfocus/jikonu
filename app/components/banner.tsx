"use client"
import Image from 'next/image';
import { SlideUp } from './animation/slideUp';
import ButtonAnimate from './animation/buttonAnimate';

export default function Banner() {
  return (

    <section className="banner flex">

      <div className="banner_content flex flex-col pr-0 mr-0">
        < SlideUp transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut"
        }}>
          <h1 className='text-[20px] font-[600] p-0 m-0 text-start'>Expert Digital Marketing for Growth</h1>
        </SlideUp>
        < SlideUp transition={{
          duration: 0.8,
          delay: 0.9,
          ease: "easeOut"
        }}>
          <p>Effective marketing solutions for your business</p>
        </SlideUp>
        < SlideUp transition={{
          duration: 1.0,
          delay: 1.2,
          ease: "easeOut"
        }}>
          <div className='mt-[40px]' >
            <ButtonAnimate>Get Started Today</ButtonAnimate>
          </div>
        </SlideUp>
      </div>
      < SlideUp>
        <div className=" md:w-[600px] flex">
          <img src="/assets/crop-banner.png" className='h-[400px] w-[800px]' alt="Banner" />
        </div>
      </SlideUp>

    </section>


  );
}