"use client"
import React from 'react'
import { SlideUp } from '../components/animation/slideUp'

const page = () => {
    return (
        <div>
            <section className="banner">
                <div className="banner_content about_content">
                    < SlideUp transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeOut"
                    }}>
                        <h1>About Us</h1>
                    </SlideUp>
                    < SlideUp transition={{
                        duration: 0.7,
                        delay: 0.7,
                        ease: "easeOut"
                    }}>
                        <p> Empowering African Food Brands to Thrive

                            At Jikonu Marketing, we specialize in igniting the growth of African food businesses by crafting bold,
                            culturally rich, and results-driven marketing strategies. We’re not just a marketing agency — we’re
                            storytellers, strategists, and cultural advocates dedicated to bringing African flavors to the forefront
                            of the global food scene.
                        </p>
                    </SlideUp>

                </div>
                <div>
                    < SlideUp transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeOut"
                    }}>
                        <img id="about_banner" src="./assets/about.jpg" alt="" />
                    </SlideUp>
                </div>
            </section>
            <section className="about_block_container">
                < SlideUp transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: "easeOut"
                }}>
                    <div className="about_box">

                        <h1>Our Mission</h1>
                        <p> To help African food entrepreneurs, restaurants, caterers, and product brands grow through authentic branding,
                            digital marketing, and customer connection that celebrates African culture and cuisine.
                        </p>
                    </div>
                </SlideUp>
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
            </section>
        </div>
    )
}

export default page