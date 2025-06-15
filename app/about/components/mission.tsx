"use client";
import { SlideUp } from '@/app/components/animation/slideUp';
import React from 'react';


const Mission = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-[20px]">

            <div className="md:w-[50%]">
                <SlideUp>
                    <img src="/assets/mission.jpg" alt="Social Media Marketing" />
                </SlideUp>
            </div>
            <div className="flex  md:w-[40%] flex-col gap-[30px]">
                <SlideUp transition={{ duration: 0.5, delay: 0.2 }}>
                    <h1 className="text-[48px]">Our Mission</h1>
                    <p className="text-[16px] text-[#787878]">
                        To help African food entrepreneurs, restaurants, caterers, and product brands grow through authentic branding,
                        digital marketing, and customer connection that celebrates African culture and cuisine.
                    </p>
                </SlideUp>
            </div>
        </div>
    );
};

export default Mission;
