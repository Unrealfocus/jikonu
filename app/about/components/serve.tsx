"use client";
import { Card } from '@/components/ui/card';
import React from 'react';
import { usePathname } from 'next/navigation';
import { SlideUp } from '@/app/components/animation/slideUp';


const Serve = () => {
    return (
        <Card className="border-[#F29727] m-[20px]">
            <SlideUp>
                <h1 className="font-[700px] text-[48px] text-center text-[#F29727]">
                    Who We Serve
                </h1>
            </SlideUp>

            <div className="flex md:flex-row flex-col justify-between items-center">

                <div className="w-[40%]">
                    <SlideUp>
                        <img src="/assets/serve.jpg" alt="" />
                    </SlideUp>
                </div>


                <div className="md:w-[50%] p-[20px] space-y-[20px]">
                    <SlideUp transition={{ duration: 0.5, delay: 0.2 }}>
                        <Card className="px-[20px]">
                            <h1>🍲 Jollof Joints & Ethiopian Dining</h1>
                            <p className="text-[#787878] text-[16px]">
                                We work with local eateries and upscale restaurants showcasing authentic African cuisine.
                            </p>
                        </Card>
                    </SlideUp>

                    <SlideUp transition={{ duration: 0.5, delay: 0.4 }}>
                        <Card className="px-[20px]">
                            <h1>🍘 Afro-Fusion Snack Brands</h1>
                            <p className="text-[#787878] text-[16px]">
                                From innovative snacks to bold new flavors, we help Afro-fusion brands stand out.
                            </p>
                        </Card>
                    </SlideUp>

                    <SlideUp transition={{ duration: 0.5, delay: 0.6 }}>
                        <Card className="px-[20px]">
                            <h1>🌍 Diaspora Food Startups</h1>
                            <p className="text-[#787878] text-[16px]">
                                Supporting entrepreneurs in the diaspora who are reconnecting the world with African food.
                            </p>
                        </Card>
                    </SlideUp>
                </div>
            </div>
        </Card>
    );
};

export default Serve;
