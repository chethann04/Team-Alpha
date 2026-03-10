import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import StatCounter from '../ui/StatCounter';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Box, Zap, Heart, Map as MapIcon, ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const { isDark } = useTheme();
    const { user } = useApp();
    const navigate = useNavigate();
    const [co2, setCo2] = useState(48320);
    const [meals, setMeals] = useState(1240);

    // Live counter simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setCo2(prev => prev + Math.floor(Math.random() * 2));
            setMeals(prev => prev + (Math.random() > 0.8 ? 1 : 0));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`min-h-[85vh] flex flex-col lg:flex-row items-center justify-center relative overflow-hidden pt-32 pb-20 px-6 lg:px-24 ${isDark ? 'bg-darkbg text-white' : 'bg-lightbg text-stone-900'}`}>
            {/* Minimalist Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
                <div className={`absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] ${isDark ? 'bg-amber-500' : 'bg-amber-400'}`} />
            </div>

            {/* Left Content */}
            <div className="flex-1 z-10 text-center lg:text-left max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 text-xs font-bold border ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    AI-Powered Resource Recovery
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tight"
                >
                    From <span className="text-primary tracking-tighter decoration-primary/20">Waste</span> to Worth —
                    <br /> <span className="text-stone-500 font-extralight italic">Every Meal Matters.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-lg md:text-xl ${isDark ? 'text-stone-400' : 'text-stone-600'} mb-10 leading-relaxed font-medium max-w-lg`}
                >
                    A sophisticated, AI-driven logistics network dedicated to reducing food waste and connecting surplus resources with humanity.
                </motion.p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <motion.button
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/login')}
                        className="btn-primary flex items-center gap-2 !bg-primary hover:!bg-primary-hover shadow-lg shadow-emerald-500/20"
                    >
                        Join the Movement <ArrowRight size={18} />
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-secondary !border-stone-200 dark:!border-stone-700"
                    >
                        Explore Impact
                    </motion.button>
                </div>
            </div>

            {/* Right Side: Professional Data Visualization */}
            <div className="flex-1 w-full lg:w-auto mt-16 lg:mt-0 flex items-center justify-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative w-full max-w-lg p-8 rounded-3xl border ${isDark ? 'bg-stone-900/50 border-white/5 shadow-2xl shadow-black/20' : 'bg-white border-stone-100 shadow-xl'}`}
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="space-y-1">
                            <h3 className="font-bold text-sm uppercase tracking-wider text-stone-400">Network Intelligence</h3>
                            <p className="text-2xl font-black tracking-tight">Real-time Recovery</p>
                        </div>
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-stone-50'}`}>
                            <MapIcon size={20} className="text-emerald-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <p className="text-xs font-bold text-stone-400 uppercase mb-2">CO2 Prevented</p>
                            <p className="text-3xl font-black text-primary">{co2.toLocaleString()}kg</p>
                            <div className="mt-4 h-1 w-full bg-stone-200/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    animate={{ width: ['40%', '70%', '60%'] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                />
                            </div>
                        </div>
                        <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                            <p className="text-xs font-bold text-stone-400 uppercase mb-2">Meals Rescued</p>
                            <p className="text-3xl font-black text-amber-500">{meals.toLocaleString()}</p>
                            <div className="mt-4 flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        className={`h-4 w-1 flex-1 rounded-full ${i <= 4 ? 'bg-amber-500' : 'bg-stone-200/20'}`}
                                        animate={{ height: [12, 16, 14, 18, 12][i - 1] * (Math.random() + 0.5) }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Minimalist Rider Status */}
                    <div className={`mt-8 p-4 rounded-xl border ${isDark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'} flex items-center gap-4`}>
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                                <Box size={20} />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-500 rounded-full border-2 border-white dark:border-stone-900" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold">Active Logistics</p>
                            <p className="text-xs text-stone-500">Fleet operational in your area</p>
                        </div>
                        <Heart className="text-rose-500 fill-rose-500/10" size={20} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;