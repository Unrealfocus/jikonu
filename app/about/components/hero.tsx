"use client";
import Loader from '@/app/components/animation/loader';
import { Card } from '@/components/ui/card';
import React from 'react';
import { SlideUp } from '@/app/components/animation/slideUp';

const Hero = () => {
    return (
        <>
            <Loader delay={1000} />
            <div className='p-[30px]'>
                <section className="md:-mt-[100px]">
                    <div className='flex md:flex-row flex-col-reverse justify-between items-center'>

                        <SlideUp transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className='space-y-4'>
                                <div className='flex gap-[10px]'>
                                    <a className='translate-y-1 ' href="/">
                                        <p className='text-[16px] hover:text-[#F29727] text-[#cfcfcf]'>Home</p>
                                    </a>
                                    <p className='text-[16px] text-[#363636]'>About us</p>
                                </div>
                                <p className='font-[700px] text-[48px]'>About us</p>
                                <p className='text-[#787878] text-[16px]'>
                                    We craft strategies that drive growth and share Africa’s flavor with the world.
                                    <br />
                                    Let me know if you’d like a more formal, playful, or minimalist tone.
                                </p>
                            </div>
                        </SlideUp>


                        <div className='md:w-[60%]'>
                            <SlideUp transition={{ duration: 0.5, delay: 0.3 }}>
                                <img src="/assets/aboutus.jpg" alt="contact us" />
                            </SlideUp>
                        </div>


                    </div>
                </section>
            </div>
        </>
    );
};

export default Hero;
