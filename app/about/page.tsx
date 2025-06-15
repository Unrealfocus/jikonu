"use client"
import React from 'react'
import { SlideUp } from '../components/animation/slideUp'
import Hero from './components/hero'
import Mission from './components/mission'
import Serve from './components/serve'

const page = () => {
    return (
        <div>
            <Hero />
            <Mission />
            <Serve />
            {/* <section className="about_block_container">
               
                < SlideUp transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: "easeOut"
                }}>
                    <div className="about_box">
                        <h1> Who We Serve</h1>
                        <p> From local jollof joints and fine-dining Ethiopian spots to Afro-fusion snack brands and diaspora food startups,
                            we partner with passionate business owners who are sharing African food with the world. Whether you're launching
                            your first food truck or scaling your packaged goods line, we're here to elevate your vision.
                        </p>
                    </div>
                </SlideUp>
                < SlideUp transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: "easeOut"
                }}>
                    <div className="about_box">
                        <h1> Our Vision</h1>
                        <p> A world where African food is celebrated, recognized, and accessible — not just in ethnic aisles or cultural
                            enclaves, but everywhere. We’re on a mission to help African food businesses get the spotlight they deserve.
                        </p>
                    </div>
                </SlideUp>
            </section> */}
        </div>
    )
}

export default page