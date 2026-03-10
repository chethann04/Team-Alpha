import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Leaf, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const FloatingActionButton = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-8 right-8 z-40"
        >
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/donor')}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isDark
                        ? 'bg-primary text-white shadow-primary/20 hover:shadow-primary/40'
                        : 'bg-primary text-white shadow-primary/30 hover:shadow-primary/50'
                    }`}
            >
                <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Plus size={32} />
                </motion.div>

                {/* Secondary Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-mint flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                    <Heart size={10} className="text-white fill-white" />
                </div>
            </motion.button>

            {/* Hint Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
            >
                <div className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xl border ${isDark ? 'bg-gray-900 text-white border-white/10' : 'bg-white text-gray-800 border-gray-100'
                    }`}>
                    Donate Surplus Now
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FloatingActionButton;