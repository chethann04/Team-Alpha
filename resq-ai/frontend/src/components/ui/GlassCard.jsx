import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const GlassCard = ({ children, className = '', delay = 0, onClick }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={onClick ? { y: -4 } : {}}
      onClick={onClick}
      className={`rounded-2xl p-6 transition-all duration-300 border ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`}
      style={{
        background: isDark
          ? 'rgba(30, 41, 59, 0.7)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;