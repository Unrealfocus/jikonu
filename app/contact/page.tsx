"use client"
import React from 'react'
import { SlideUp } from '../components/animation/slideUp'
import ButtonAnimate from '../components/animation/buttonAnimate'

const page = () => {
    return (
        <div>
            <section className="banner">
                <div className="banner_content text-center flex flex-col justify-center items-center w-full">
                    < SlideUp transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeOut"
                    }}>
                        <h1>Contact Us</h1>
                    </SlideUp>
                    < SlideUp transition={{
                        duration: 0.7,
                        delay: 0.7,
                        ease: "easeOut"
                    }}>
                        <p>Get in Touch</p>
                        <p>We'd love to hear from you! <br/>Reach out for collaborations, inquiries, or just to say hello.</p>
                    </SlideUp>

                </div>
                {/* <div>
                    < SlideUp transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeOut"
                    }}>
                        <img className="contact_banner" src="./assets/contact.jpg" alt="" />
                    </SlideUp>
                </div> */}
            </section>
            <section className="about_block_container">
                < SlideUp transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: "easeOut"
                }}>
                    <div className="about_box">

                        <div className="support-card">
                            <div className="support-icon">
                                <img src="https://img.icons8.com/?size=100&amp;id=16713&amp;format=png&amp;color=000000"
                                    alt="Customer Service Icon" width="30" height="30" />
                            </div>
                            <h3 className="support-title">Whatsapp Chat</h3>
                            <p className="support-description">We are available Sunday to Friday 7 pm PST</p>
                            <a href="https://wa.me/14244274006">
                                <ButtonAnimate>Chat Now</ButtonAnimate>
                            </a>
                        </div>
                    </div>
                </SlideUp>
                < SlideUp transition={{
                    duration: 0.7,
                    delay: 0.7,
                    ease: "easeOut"
                }}>
                    <div className="about_box">
                    <div className="support-card ">
                            <div className="support-icon">
                                <img src="https://img.icons8.com/?size=100&amp;id=XnbZDL7ivsy8&amp;format=png&amp;color=000000"
                                    alt="Customer Service Icon" width="30" height="30" />
                            </div>
                            <h3 className="support-title">Create a Ticket</h3>
                            <p className="support-description">We are available 24/7 to support you</p>

                            <a href="https://cateredbyafrica.freshdesk.com/support/tickets/new">
                                <ButtonAnimate >Submit your
                                    Ticket</ButtonAnimate>
                            </a>
                        </div>
                    </div>
                </SlideUp>
               
            </section>
            {/* <section className="contact">
                <div>
                    <img className="contact_banner" src="./assets/contact.jpg" alt="" />
                </div>
                <div className="banner_content contact_content">
                    <h1>Contact Us</h1>
                    <div className="support-container">
                        <div className="support-card">
                            <div className="support-icon">
                                <img src="https://img.icons8.com/?size=100&amp;id=16713&amp;format=png&amp;color=000000"
                                    alt="Customer Service Icon" width="30" height="30" />
                            </div>
                            <h3 className="support-title">Whatsapp Chat</h3>
                            <p className="support-description">We are available Sunday to Friday 7 pm PST</p>
                            <a href="https://wa.me/14244274006">
                                <button>Chat Now</button>
                            </a>
                        </div>

                        <div className="support-card ">
                            <div className="support-icon">
                                <img src="https://img.icons8.com/?size=100&amp;id=XnbZDL7ivsy8&amp;format=png&amp;color=000000"
                                    alt="Customer Service Icon" width="30" height="30" />
                            </div>
                            <h3 className="support-title">Create a Ticket</h3>
                            <p className="support-description">We are available 24/7 to support you</p>

                            <a href="https://cateredbyafrica.freshdesk.com/support/tickets/new">
                                <button className="ticket">Submit your
                                    Ticket</button>
                            </a>
                        </div>
                    </div>
                </div>



            </section> */}
        </div>
    )
}

export default page