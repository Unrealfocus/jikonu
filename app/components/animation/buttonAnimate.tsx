import { motion } from "framer-motion"




export default function ButtonAnimate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            
        >
            {children}
        </motion.button>
    );
}
