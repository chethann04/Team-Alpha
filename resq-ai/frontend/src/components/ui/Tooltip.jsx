import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Tooltip = ({ children, content, position = 'top' }) => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  const positions = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap pointer-events-none ${
              positions[position]
            } ${
              isDark
                ? 'bg-gray-800 text-white border border-white/10'
                : 'bg-gray-900 text-white'
            } shadow-xl`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;