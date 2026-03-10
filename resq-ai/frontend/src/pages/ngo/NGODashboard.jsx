import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MainLayout from '../../components/MainLayout';
import ClayCard from '../../components/ui/ClayCard';
import UrgencyMatcher from './UrgencyMatcher';
import { ngoAPI, donationAPI } from '../../utils/api';
import { LayoutDashboard, Zap, Clock, Package, History } from 'lucide-react';
import WeeklyActivity from '../../components/ui/WeeklyActivity';

const NGODashboard = () => {
    const { isDark } = useTheme();
    const [tab, setTab] = useState('match');
    const [activeRescues, setActiveRescues] = useState([]);

    useEffect(() => {
        donationAPI.getAll()
            .then(({ data }) => {
                const all = data.donations || data.data || [];
                setActiveRescues(all.filter(d => d.status === 'in_transit'));
            })
            .catch(() => setActiveRescues([]));
    }, []);

    return (
        <MainLayout>
            <div className="pt-24 px-6 pb-12 max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end flex-wrap gap-4">
                    <div>
                        <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tight`}>
                            🏠 NGO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Operations</span>
                        </h1>
                        <p className={`mt-2 ${isDark ? 'text-stone-400' : 'text-stone-500'} font-bold uppercase text-[10px] tracking-widest`}>Connecting surplus with critical community needs.</p>
                    </div>
                </motion.div>

                {/* NGO Navigation */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTab('match')}
                        className={`flex-1 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all ${tab === 'match'
                            ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg'
                            : isDark ? 'bg-stone-900 text-stone-500' : 'bg-white text-stone-400 shadow-md'
                            }`}
                    >
                        <Zap size={18} /> Urgency Match
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTab('incoming')}
                        className={`flex-1 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all ${tab === 'incoming'
                            ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg'
                            : isDark ? 'bg-stone-900 text-stone-500' : 'bg-white text-stone-400 shadow-md'
                            }`}
                    >
                        <Clock size={18} /> Incoming
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTab('activity')}
                        className={`flex-1 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all ${tab === 'activity'
                            ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg'
                            : isDark ? 'bg-stone-900 text-stone-500' : 'bg-white text-stone-400 shadow-md'
                            }`}
                    >
                        <History size={18} /> Activity
                    </motion.button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {tab === 'match' && <UrgencyMatcher />}
                        {tab === 'incoming' && (
                            <div className="space-y-6">
                                <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                                    🚴 Active Rescues En Route
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeRescues.map((d, i) => (
                                        <ClayCard key={d._id} delay={i * 0.1}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-black text-emerald-600">{d.donorName}</div>
                                                <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                                    In Transit
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="flex items-center gap-1 text-xs text-stone-500 font-bold">
                                                    <Package size={14} /> {d.kgFood}kg
                                                </div>
                                                <div className="w-full h-1 bg-stone-200/20 rounded-full overflow-hidden">
                                                    <motion.div
                                                        animate={{ x: ['-100%', '300%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                        className="w-1/4 h-full bg-emerald-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-stone-500 font-bold uppercase">Estimated ETA: 8m</div>
                                        </ClayCard>
                                    ))}
                                </div>
                            </div>
                        )}
                        {tab === 'activity' && <WeeklyActivity role="ngo" />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </MainLayout>
    );
};

export default NGODashboard;