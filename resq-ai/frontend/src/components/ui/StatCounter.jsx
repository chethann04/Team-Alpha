import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StatCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end, duration]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                scale: count === end ? [1, 1.05, 1] : 1
            }}
            transition={{
                scale: { duration: 0.4, repeat: count === end ? 0 : 0 }
            }}
            className="tabular-nums"
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    );
};

export default StatCounter;