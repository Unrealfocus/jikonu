import { Transition, motion, useAnimation, useInView } from "framer-motion"
import { div } from "framer-motion/client";
import { useEffect, useRef } from "react";


interface SlideUpProps {
    children: React.ReactNode;
    transition?: Transition;
    once?: boolean;
  }


  export const SlideUp = ({
    children,
    transition = { duration: 0.5, delay: 0.25 },
    once = false,
  }: SlideUpProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const controls = useAnimation();
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView])
    return (
        <div ref={ref}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={controls}
               
                viewport={{ once: false }}
                transition={transition}
            >
                {children}
            </motion.div>
        </div>
    );
}
