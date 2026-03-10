import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Skeleton = ({ className, width, height, rounded = 'rounded-2xl' }) => {
    const { isDark } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`${className} ${rounded} ${isDark ? 'bg-white/5' : 'bg-gray-200'
                }`}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
