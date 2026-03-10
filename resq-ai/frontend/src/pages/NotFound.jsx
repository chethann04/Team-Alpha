import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FileQuestion, ChevronLeft } from 'lucide-react';
import ClayCard from '../components/ui/ClayCard';

const NotFound = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? 'bg-darkbg text-white' : 'bg-lightbg text-gray-900'}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                <ClayCard className="flex flex-col items-center py-12">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-20 h-20 rounded-3xl bg-red-400/10 flex items-center justify-center mb-6"
                    >
                        <FileQuestion size={40} className="text-red-400" />
                    </motion.div>

                    <h1 className="text-6xl font-black mb-2 tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        404
                    </h1>
                    <p className="text-xl font-bold mb-6 opacity-60">
                        Oops! Content Rescued... <br /> Somewhere else.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <ChevronLeft size={18} /> Back to Safety
                    </button>
                </ClayCard>
            </motion.div>
        </div>
    );
};

export default NotFound;
