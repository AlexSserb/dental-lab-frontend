import { motion } from "motion/react";

type Props = {
    children: React.ReactNode;
}

const MotionEnterDiv = ({ children }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            {children}
        </motion.div>
    );
};

export default MotionEnterDiv;
