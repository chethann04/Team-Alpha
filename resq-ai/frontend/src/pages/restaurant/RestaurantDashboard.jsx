import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MainLayout from '../../components/MainLayout';
import ClayCard from '../../components/ui/ClayCard';
import { donationAPI } from '../../utils/api';
import { Utensils, TrendingUp, Award, Clock, Plus, History, ChefHat } from 'lucide-react';
import WeeklyActivity from '../../components/ui/WeeklyActivity';
import AchievementsSection from '../../components/ui/AchievementsSection';
import SafetyWizard from '../donor/SafetyWizard';

const RestaurantDashboard = () => {
    const { isDark } = useTheme();
    const [tab, setTab] = useState('overview');
    const [stats, setStats] = useState({
        mealsDonated: 1240,
        kgRescued: 492,
        activePosts: 3,
        safetyRank: 'A+'
    });
    const [activeOp, setActiveOp] = useState(null); // 'post' or null

    return (
        <MainLayout>
            <div className="pt-24 px-6 pb-12 max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex justify-between items-end flex-wrap gap-6"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border 
                                ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                Premium Culinary Partner
                            </span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className={`text-5xl font-[900] ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter leading-none`}>
                            Restaurant <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-mint">Hub</span>
                        </h1>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveOp(activeOp === 'post' ? null : 'post')}
                        className={`px-8 py-4 rounded-3xl font-[900] text-xs shadow-xl flex items-center gap-2 transition-all 
                            ${activeOp === 'post'
                                ? 'bg-stone-800 text-white'
                                : 'bg-emerald-600 text-white shadow-emerald-600/20'}`}
                    >
                        {activeOp === 'post' ? 'CANCEL PROTOCOL' : <><Plus size={18} /> POST SURPLUS</>}
                    </motion.button>
                </motion.div>

                {/* Operations Section */}
                <AnimatePresence>
                    {activeOp === 'post' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-12 overflow-hidden"
                        >
                            <ClayCard className="p-8 border-t-4 border-emerald-500 bg-emerald-500/5">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <span className="text-xl">🚀</span>
                                    </div>
                                    <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tighter`}>Active <span className="text-emerald-500">Surplus Protocol</span></h2>
                                </div>
                                <SafetyWizard onComplete={() => setActiveOp(null)} />
                            </ClayCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Meals Saved', value: stats.mealsDonated, icon: <Utensils />, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                        { label: 'Kg Rescued', value: stats.kgRescued, icon: <TrendingUp />, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                        { label: 'Live Listings', value: stats.activePosts, icon: <ChefHat />, color: 'text-sky-500', bg: 'bg-sky-500/5' },
                        { label: 'Safety Rank', value: stats.safetyRank, icon: <Award />, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                    ].map((s, i) => (
                        <ClayCard key={i} className={`${s.bg} p-6 border-l-4 ${s.color.replace('text', 'border')}`}>
                            <div className={`text-3xl font-[900] ${s.color} mb-1`}>{s.value}</div>
                            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-2">
                                {s.icon} {s.label}
                            </div>
                        </ClayCard>
                    ))}
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {[
                        { id: 'overview', label: 'Overview', icon: <TrendingUp size={18} /> },
                        { id: 'history', label: 'Donation Logs', icon: <History size={18} /> },
                        { id: 'achievements', label: 'Achievements', icon: <Award size={18} /> },
                        { id: 'activity', label: 'Activity Feed', icon: <Clock size={18} /> },
                    ].map(t => (
                        <motion.button
                            key={t.id}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTab(t.id)}
                            className={`px-8 py-4 rounded-3xl font-bold flex items-center gap-2 transition-all whitespace-nowrap
                                ${tab === t.id
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                                    : isDark ? 'bg-stone-900 text-stone-500' : 'bg-white text-stone-400 shadow-md'
                                }`}
                        >
                            {t.icon} {t.label.toUpperCase()}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <ClayCard className="p-8">
                                    <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-stone-900'} mb-6 uppercase tracking-widest`}>Kitchen Impact Analysis</h3>
                                    <div className="h-64 flex items-center justify-center border border-dashed border-stone-800 rounded-3xl text-stone-600 font-bold uppercase text-[10px] tracking-widest">
                                        Impact Chart Placeholder
                                    </div>
                                </ClayCard>
                                <WeeklyActivity role="corporate" />
                            </div>
                        )}
                        {tab === 'history' && (
                            <ClayCard className="p-8">
                                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-stone-900'} mb-6 uppercase tracking-widest`}>Donation History</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`p-4 rounded-2xl flex items-center justify-between ${isDark ? 'bg-stone-900' : 'bg-stone-50'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">🍱</div>
                                                <div>
                                                    <div className={`font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>Surplus Batch #{304 - i}</div>
                                                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Delivered • 2 days ago</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-[900] text-emerald-500">+12kg</div>
                                                <div className="text-[8px] text-stone-500 font-black uppercase tracking-[0.2em]">Verified Impact</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ClayCard>
                        )}
                        {tab === 'achievements' && <AchievementsSection role="donor" streak={15} />}
                        {tab === 'activity' && <WeeklyActivity role="corporate" />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </MainLayout>
    );
};

export default RestaurantDashboard;
