import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ClayCard = ({ children, className = '', onClick, delay = 0 }) => {
    const { isDark } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={`minimal-card ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ClayCard;