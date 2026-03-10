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
    const [pendingRequests, setPendingRequests] = useState([]);
    const [activeRescues, setActiveRescues] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        setLoading(true);
        donationAPI.getAll()
            .then(({ data }) => {
                const all = Array.isArray(data) ? data : (data.donations || data.data || []);
                console.log("Donations received:", all.length);
                setPendingRequests(all.filter(d => d.status === 'verified'));
                setActiveRescues(all.filter(d => d.status === 'in_transit' || d.status === 'accepted'));
            })
            .catch(() => {
                setPendingRequests([]);
                setActiveRescues([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await donationAPI.updateStatus(id, newStatus);
            loadData();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

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
                            <div className="space-y-12">
                                {/* Pending Requests Section */}
                                <section className="space-y-6">
                                    <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tight`}>
                                        🆕 Pending Recovery Requests
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {pendingRequests.length === 0 && !loading && (
                                            <div className={`p-10 text-center rounded-3xl border-2 border-dashed ${isDark ? 'border-stone-800 text-stone-600' : 'border-stone-200 text-stone-400'}`}>
                                                <div className="text-3xl mb-2">📡</div>
                                                <p className="font-bold uppercase tracking-widest text-[10px]">No pending requests in your area</p>
                                            </div>
                                        )}
                                        {pendingRequests.map((d, i) => (
                                            <ClayCard key={d._id} delay={i * 0.1}>
                                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                                    <div className="flex gap-4">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${isDark ? 'bg-white/5' : 'bg-stone-50'}`}>
                                                            🍱
                                                        </div>
                                                        <div>
                                                            <div className={`font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>{d.donorName}</div>
                                                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">{d.foodItem} • {d.kgFood}kg</div>
                                                            <div className="text-[10px] font-bold text-stone-500 mt-1 uppercase tracking-widest leading-relaxed">
                                                                📍 {d.location?.address}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(d._id, 'rejected')}
                                                            className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                                                                ${isDark ? 'bg-white/5 text-stone-500 hover:bg-rose-500/10 hover:text-rose-500' : 'bg-stone-100 text-stone-400 hover:bg-rose-50'}`}
                                                        >
                                                            Decline
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(d._id, 'accepted')}
                                                            className="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                                                        >
                                                            Confirm Recovery
                                                        </button>
                                                    </div>
                                                </div>
                                            </ClayCard>
                                        ))}
                                    </div>
                                </section>

                                {/* Active Rescues Section */}
                                <section className="space-y-6">
                                    <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tight`}>
                                        🚴 Active Rescues En Route
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {activeRescues.length === 0 && !loading && (
                                            <div className={`p-10 text-center rounded-3xl border-2 border-dashed ${isDark ? 'border-stone-800 text-stone-600' : 'border-stone-200 text-stone-400'} col-span-full`}>
                                                <p className="font-bold uppercase tracking-widest text-[10px]">No active logistics missions</p>
                                            </div>
                                        )}
                                        {activeRescues.map((d, i) => (
                                            <ClayCard key={d._id} delay={i * 0.1}>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className={`font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>{d.donorName}</div>
                                                    <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
                                                        {d.status === 'accepted' ? 'Assigning Rider' : 'In Transit'}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-1 text-[10px] text-stone-500 font-black uppercase">
                                                        <Package size={14} className="text-primary" /> {d.kgFood}kg
                                                    </div>
                                                    <div className="w-full h-1 bg-stone-200/20 rounded-full overflow-hidden">
                                                        <motion.div
                                                            animate={{ x: ['-100%', '300%'] }}
                                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                            className="w-1/4 h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-stone-500 font-bold uppercase tracking-tight">Estimated ETA: {d.status === 'accepted' ? 'Calculating...' : '8m'}</div>
                                            </ClayCard>
                                        ))}
                                    </div>
                                </section>
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