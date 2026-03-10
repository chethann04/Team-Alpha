import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const EmptyState = ({
  icon = '🍱',
  title = 'Nothing here yet',
  description = 'Data will appear here once available.',
  action,
  actionLabel,
}) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl mb-4"
      >
        {icon}
      </motion.div>
      <h3
        className={`text-lg font-bold mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">{description}</p>
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-mint text-white font-semibold text-sm"
        >
          {actionLabel || 'Get Started'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;