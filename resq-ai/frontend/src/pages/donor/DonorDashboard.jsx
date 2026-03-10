import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import SafetyWizard from './SafetyWizard';
import FoodBinDashboard from './FoodBinDashboard';
import ClayCard from '../../components/ui/ClayCard';
import { donationAPI } from '../../utils/api';
import SDGBadgeReveal from '../../components/ui/SDGBadgeReveal';
import WeeklyActivity from '../../components/ui/WeeklyActivity';
import AchievementsSection from '../../components/ui/AchievementsSection';

const DonorDashboard = () => {
    const { isDark } = useTheme();
    const [showBadge, setShowBadge] = useState(false);
    const [donations, setDonations] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [activeOp, setActiveOp] = useState(null); // 'wizard' or 'bin' or null

    const location = useLocation();

    const loadHistory = () => {
        setHistoryLoading(true);
        donationAPI.getAll()
            .then(({ data }) => setDonations(data.donations || data.data || []))
            .catch(() => setDonations([]))
            .finally(() => setHistoryLoading(false));
    };

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        if (location.hash === '#milestones') {
            setActiveOp('achievements');
            setTimeout(() => {
                document.getElementById('ops-hub')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, [location.hash]);

    const handleWizardComplete = () => {
        // Trigger Badge Reveal for first-time or high-impact donation
        setTimeout(() => {
            setShowBadge(true);
        }, 1000);
        loadHistory();
    };

    return (
        <MainLayout>
            <div className="pt-24 px-6 pb-20 max-w-5xl mx-auto">
                <SDGBadgeReveal
                    isOpen={showBadge}
                    onClose={() => {
                        console.log("Closing Badge Reveal and resetting activeOp");
                        setShowBadge(false);
                        setActiveOp(null); // Return to dashboard home
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border 
                            ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            Citizen Recovery Network
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h1 className={`text-5xl font-[900] ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter leading-none`}>
                        Donor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Dashboard</span>
                    </h1>
                </motion.div>

                {/* Primary Impact Command Dashboard */}
                <div className="space-y-10 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ClayCard className="bg-emerald-500/5 p-8 border-l-4 border-emerald-500">
                            <div className="text-4xl font-[900] text-emerald-600 mb-1">1,240</div>
                            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Lifetime Meals Saved</div>
                        </ClayCard>
                        <ClayCard className="bg-sky-500/5 p-8 border-l-4 border-sky-500">
                            <div className="text-4xl font-[900] text-sky-600 mb-1">492 kg</div>
                            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Total CO2 Prevented</div>
                        </ClayCard>
                        <ClayCard className="bg-amber-500/5 p-8 border-l-4 border-amber-500">
                            <div className="text-4xl font-[900] text-amber-600 mb-1">12</div>
                            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Badges Earned</div>
                        </ClayCard>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-stone-900'} mb-6 uppercase tracking-[0.2em]`}>Recent Protocol Log</h3>
                            {donations.length === 0 ? (
                                <div className={`text-center py-12 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                                    <div className="text-4xl mb-3">📭</div>
                                    <p className="font-black uppercase tracking-widest text-sm">No donations recorded yet</p>
                                    <p className="text-xs mt-1">Start a rescue to see your impact log here.</p>
                                </div>
                            ) : donations.map((d, i) => (
                                <ClayCard key={d._id} delay={i * 0.1} className="p-6 group hover:translate-x-2 transition-transform">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${isDark ? 'bg-white/5' : 'bg-stone-50'}`}>🍱</div>
                                            <div>
                                                <h4 className={`font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tighter`}>{d.donorName}</h4>
                                                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Secured {new Date().toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-[900] text-emerald-600">+{d.kgFood}kg</div>
                                            <div className={`text-[10px] font-black uppercase tracking-widest ${d.status === 'delivered' ? 'text-emerald-500' : 'text-amber-500'
                                                }`}>{d.status}</div>
                                        </div>
                                    </div>
                                </ClayCard>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <WeeklyActivity role="donor" />
                        </div>
                    </div>
                </div>

                {/* Operations Control Center */}
                <div id="ops-hub" className="space-y-12">
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveOp(activeOp === 'wizard' ? null : 'wizard')}
                            className={`flex-1 p-8 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden
                                ${activeOp === 'wizard'
                                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-600/20'
                                    : isDark ? 'bg-stone-900 border-white/5 text-stone-300 hover:border-emerald-500/30' : 'bg-white border-stone-100 text-stone-600 hover:border-emerald-500/30 shadow-sm'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                    ${activeOp === 'wizard' ? 'bg-white/20' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    🚀
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-black uppercase tracking-tighter">Rescue Wizard</h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeOp === 'wizard' ? 'text-emerald-100' : 'text-stone-500'}`}>Start Protocol Verification</p>
                                </div>
                            </div>
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveOp(activeOp === 'bin' ? null : 'bin')}
                            className={`flex-1 p-8 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden
                                ${activeOp === 'bin'
                                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/20'
                                    : isDark ? 'bg-stone-900 border-white/5 text-stone-300 hover:border-emerald-500/30' : 'bg-white border-stone-100 text-stone-600 hover:border-emerald-500/30 shadow-sm'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                    ${activeOp === 'bin' ? 'bg-white/20' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    📦
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-black uppercase tracking-tighter">Live Food Bin</h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeOp === 'bin' ? 'text-emerald-50' : 'text-stone-500'}`}>Monitor Node Resources</p>
                                </div>
                            </div>
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveOp(activeOp === 'achievements' ? null : 'achievements')}
                            className={`flex-1 p-8 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden
                                ${activeOp === 'achievements'
                                    ? 'bg-teal-600 border-teal-500 text-white shadow-xl shadow-teal-600/20'
                                    : isDark ? 'bg-stone-900 border-white/5 text-stone-300 hover:border-emerald-500/30' : 'bg-white border-stone-100 text-stone-600 hover:border-emerald-500/30 shadow-sm'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                    ${activeOp === 'achievements' ? 'bg-white/20' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    🏆
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-black uppercase tracking-tighter">Achievements</h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeOp === 'achievements' ? 'text-teal-50' : 'text-stone-500'}`}>View Protocol Streaks</p>
                                </div>
                            </div>
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeOp && (
                            <motion.div
                                key={activeOp}
                                initial={{ opacity: 0, height: 0, y: 20 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: 20 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="overflow-hidden border-t border-stone-800 pt-12"
                            >
                                {activeOp === 'wizard' && (
                                    <section>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                                <span className="text-xl">🚀</span>
                                            </div>
                                            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tighter`}>Active <span className="text-emerald-500">Wizard Instance</span></h2>
                                        </div>
                                        <SafetyWizard onComplete={handleWizardComplete} />
                                    </section>
                                )}
                                {activeOp === 'bin' && (
                                    <section>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                                                <span className="text-xl">📦</span>
                                            </div>
                                            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tighter`}>Node <span className="text-sky-500">Bin Status</span></h2>
                                        </div>
                                        <FoodBinDashboard />
                                    </section>
                                )}
                                {activeOp === 'achievements' && (
                                    <section>
                                        <AchievementsSection role="donor" streak={8} />
                                    </section>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
};

export default DonorDashboard;