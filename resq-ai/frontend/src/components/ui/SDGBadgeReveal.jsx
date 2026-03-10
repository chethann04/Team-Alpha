import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Trophy, Star, Zap, Shield } from 'lucide-react';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const SDGBadgeReveal = ({ isOpen, onClose, badgeType = 'SDG 12: Responsible Consumption' }) => {
    const { isDark } = useTheme();
    const [audioPlayed, setAudioPlayed] = useState(false);

    useEffect(() => {
        if (isOpen && !audioPlayed) {
            console.log("Playing sound: achievement-unlock.mp3");
            setAudioPlayed(true);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary/20 backdrop-blur-3xl"
                    />

                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={400}
                        gravity={0.1}
                        colors={['#63b3ed', '#68d391', '#805ad5', '#ed8936', '#f687b3']}
                        style={{ pointerEvents: 'none' }}
                    />

                    <motion.div
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        transition={{ type: "spring", damping: 12, stiffness: 100 }}
                        className="relative text-center"
                    >
                        {/* Background Radial Glow */}
                        <div className="absolute -inset-40 bg-gradient-radial from-mint/40 via-transparent to-transparent opacity-50 animate-pulse" />

                        {/* The Badge */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-64 h-64 rounded-full bg-white shadow-[0_0_100px_rgba(104,211,145,0.4)] border-8 border-mint flex flex-col items-center justify-center p-10 mx-auto group"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bg-mint text-white p-6 rounded-3xl shadow-2xl mb-4"
                            >
                                <Trophy size={60} />
                            </motion.div>
                            <h2 className="text-2xl font-[1000] text-gray-900 leading-none mb-2 tracking-tighter">UNLOCKED</h2>
                            <p className="text-[10px] font-black text-mint uppercase tracking-widest">{badgeType}</p>

                            {/* Floating elements around badge */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        x: [Math.cos(i) * 100, Math.cos(i) * 150, Math.cos(i) * 100],
                                        y: [Math.sin(i) * 100, Math.sin(i) * 150, Math.sin(i) * 100],
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                                    className="absolute"
                                >
                                    <Star className="text-yellow-400 fill-current" size={16} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-12 space-y-4"
                        >
                            <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter`}>Level Up: Climate Guardian</h3>
                            <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}>
                                Your contribution has reached the Milestone Alpha tier. Global SDG verification pending.
                            </p>
                            <button
                                onClick={() => {
                                    console.log("Continue Mission clicked");
                                    onClose();
                                }}
                                className="mt-6 px-12 py-5 rounded-[2.5rem] bg-white text-black font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all relative z-[1001]"
                            >
                                Continue Mission
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SDGBadgeReveal;
