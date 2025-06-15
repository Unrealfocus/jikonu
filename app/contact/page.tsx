"use client";
import React from "react";
import { SlideUp } from "../components/animation/slideUp";
import { Card } from "@/components/ui/card";
import Loader from "../components/animation/loader";

const Page = () => {
    return (
        <>
            <Loader delay={1000} />
            <div className="p-[30px] mb-[150px] md:mb-[0px]">
                <section className="md:-mt-[100px]">
                    <div className="flex  flex-col-reverse md:flex-row  justify-between items-center">
                        <SlideUp>
                            <div className="space-y-4">
                                <div className="flex gap-[10px]">
                                    <a className="translate-y-1 " href="/">
                                        <p className="text-[16px] hover:text-[#F29727] text-[#cfcfcf]">
                                            Home
                                        </p>
                                    </a>
                                    <p className="text-[16px] text-[#363636]">Contacts</p>
                                </div>
                                <p className="font-[700px] text-[48px]">Contact us</p>
                                <p className="text-[#787878] text-[16px]">
                                    Get in Touch <br />
                                    We'd love to hear from you! <br />
                                    Reach out for collaborations, inquiries, or just to say hello
                                </p>

                                <div className="flex justify-between">
                                    <a href="https://wa.me/14244274006">
                                        <Card className="px-[20px] cursor-pointer hover:bg-[#F29727] text-[#363636] text-[16px] hover:text-white">
                                            Whatsapp Chat
                                        </Card>
                                    </a>
                                    <a href="https://cateredbyafrica.freshdesk.com/support/tickets/new">
                                        <Card className="px-[20px] cursor-pointer hover:bg-[#F29727] text-[#363636] text-[16px] hover:text-white">
                                            Create a Ticket
                                        </Card>
                                    </a>
                                </div>
                            </div>
                        </SlideUp>


                        <div className="md:w-[60%]">
                            <SlideUp>
                                <img src="/assets/contactus.jpg" alt="contact us" />
                            </SlideUp>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default Page;
