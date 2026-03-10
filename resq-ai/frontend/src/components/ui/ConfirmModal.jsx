import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ConfirmModal = ({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}) => {
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-full max-w-sm p-6 rounded-3xl shadow-2xl ${
              isDark
                ? 'bg-gray-900 border border-white/10'
                : 'bg-white border border-gray-100'
            }`}
          >
            <div className="text-4xl mb-4 text-center">
              {danger ? '⚠️' : '❓'}
            </div>
            <h3
              className={`text-lg font-extrabold text-center mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {title}
            </h3>
            {message && (
              <p
                className={`text-sm text-center mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {message}
              </p>
            )}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className={`flex-1 py-3 rounded-2xl font-semibold text-sm ${
                  isDark
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-all`}
              >
                {cancelLabel}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className={`flex-1 py-3 rounded-2xl font-semibold text-sm text-white ${
                  danger
                    ? 'bg-gradient-to-r from-red-500 to-rose-500'
                    : 'bg-gradient-to-r from-primary to-mint'
                } shadow-lg`}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;