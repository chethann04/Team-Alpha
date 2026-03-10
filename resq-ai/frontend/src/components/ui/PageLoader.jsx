import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PageLoader = () => {
    const { isDark } = useTheme();

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${isDark ? 'bg-darkbg' : 'bg-lightbg'}`}>
            <div className="relative">
                {/* Outer Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-[-20px] bg-primary/20 blur-2xl rounded-full"
                />

                {/* Loading Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-clay ${isDark ? 'bg-white/10 border border-white/10' : 'bg-white/80 border border-white/60'
                        }`}
                >
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-mint flex items-center justify-center shadow-lg"
                    >
                        <Leaf className="text-white" size={24} />
                    </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-32 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className={`text-sm font-black tracking-widest uppercase opacity-40 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Rescuing Meals...
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default PageLoader;