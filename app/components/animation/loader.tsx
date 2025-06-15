'use client';
import { useEffect, useState } from 'react';
import React from 'react'

const Loader = ({ delay = 3000 }: { delay?: number }) => {
    const [show, setShow] = useState(true);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), delay);
        setAnimateOut(true);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!show) return null;
    return (
        <div
            className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-all duration-500 ${animateOut ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
                }`}
        >
            <div className='h-screen bg-[#F29727] fixed top-0 right-0 w-full z-50'>
                <div className='flex flex-col items-center justify-center h-full'>

                    <div className="loader"></div>
                </div>
            </div>
        </div>
    )

}

export default Loader