import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MainLayout from '../../components/MainLayout';
import SwipeFeed from './SwipeFeed';
import RiderFeed from './RiderFeed';
import LiveTracking from './LiveTracking';
import RiderLeaderboard from './RiderLeaderboard';
import { LayoutDashboard, Zap, Map, Trophy, List } from 'lucide-react';

const RiderDashboard = () => {
    const { isDark } = useTheme();
    const [tab, setTab] = useState('radar');

    const tabs = [
        { id: 'radar', label: 'Rescue Radar', icon: <Zap size={18} />, color: 'from-emerald-600 to-sky-600' },
        { id: 'feed', label: 'Mission Feed', icon: <List size={18} />, color: 'from-primary to-mint' },
        { id: 'track', label: 'Live Tracking', icon: <Map size={18} />, color: 'from-blue-600 to-indigo-600' },
        { id: 'stats', label: 'Leaderboard', icon: <Trophy size={18} />, color: 'from-orange-500 to-yellow-500' },
    ];

    return (
        <MainLayout>
            <div className="pt-24 px-6 pb-20 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-between items-end flex-wrap gap-4"
                >
                    <div>
                        <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tight`}>
                            🚴‍♂️ Delivery <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint">Partner</span>
                        </h1>
                        <p className={`mt-2 ${isDark ? 'text-stone-400' : 'text-stone-500'} font-bold uppercase text-[10px] tracking-widest`}>Hero mode: Active. Ready for rescue missions.</p>
                    </div>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {tabs.map((t) => (
                        <motion.button
                            key={t.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 min-w-[140px] py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${tab === t.id
                                ? `bg-gradient-to-r ${t.color} text-white shadow-emerald-500/20`
                                : isDark ? 'bg-stone-900 text-stone-500' : 'bg-white text-stone-400 border border-stone-100'
                                }`}
                        >
                            {t.icon} {t.label}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {tab === 'radar' && <SwipeFeed />}
                        {tab === 'feed' && <RiderFeed />}
                        {tab === 'track' && <LiveTracking />}
                        {tab === 'stats' && <RiderLeaderboard />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </MainLayout>
    );
};

export default RiderDashboard;
