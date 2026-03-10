import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/navbar/Navbar';
import GodViewMap from './GodViewMap';
import WasteAnalytics from './WasteAnalytics';
import FoodQualityGrid from './FoodQualityGrid';
import CarbonDashboard from './CarbonDashboard';
import ClayCard from '../../components/ui/ClayCard';
import { adminAPI } from '../../utils/api';
import WeeklyActivity from '../../components/ui/WeeklyActivity';
import { Database, Map, BarChart3, Globe2, Download, AlertTriangle, ShieldAlert, Zap, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const tabs = [
    { id: 'overview', label: 'Dashboard', icon: <Database size={18} /> },
    { id: 'system', label: 'System Control', icon: <Zap size={18} /> },
    { id: 'map', label: 'God View Map', icon: <Map size={18} /> },
    { id: 'analytics', label: 'Waste Intel', icon: <BarChart3 size={18} /> },
    { id: 'carbon', label: 'Climate ESG', icon: <Globe2 size={18} /> },
];

const AdminDashboard = () => {
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        adminAPI.getStats()
            .then(({ data }) => { if (data.success) setStats(data.stats); })
            .catch(() => { })
            .finally(() => setStatsLoading(false));
    }, []);

    const toggleEmergency = () => {
        setEmergencyMode(!emergencyMode);
        if (!emergencyMode) {
            toast.error('EMERGENCY MODE ACTIVE: High Intensity Red Alert Sent!', {
                icon: '🚨',
                duration: 5000,
                style: { background: '#ef4444', color: '#fff', fontWeight: '900' }
            });
        } else {
            toast.success('Emergency Mode Deactivated. Resuming Normal Ops.');
        }
    };

    const statCards = [
        { label: 'Total Meals Saved', value: stats?.totalMealsSaved?.toLocaleString(), icon: '🍽️', color: '#10b981', sub: '+12% vs last week' },
        { label: 'Kg Bio-Waste Diverted', value: `${stats?.totalKgRescued?.toLocaleString()}`, icon: '🥗', color: '#0ea5e9', sub: '92% Recovery Rate' },
        { label: 'Global CO2 Offset', value: `${stats?.totalCO2Prevented?.toLocaleString()} kg`, icon: '🌍', color: '#059669', sub: 'SDG Alpha Certified' },
        { label: 'Network Rescuers', value: stats?.activeRiders, icon: '🚴', color: '#8b5cf6', sub: 'Avg 4.2m Response' },
        { label: 'Corporate Partners', value: stats?.totalNGOs, icon: '🏢', color: '#f59e0b', sub: 'ESG Focus: High' },
        { label: 'System Uptime', value: '99.98%', icon: '✨', color: '#10b981', sub: 'AI Engine: Optimized' },
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#050505]' : 'bg-[#fafafa]'} transition-colors duration-1000`}>
            {/* Emergency Mode Overlay */}
            <AnimatePresence>
                {emergencyMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.2, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="fixed inset-0 bg-red-600 pointer-events-none z-50"
                    />
                )}
            </AnimatePresence>

            <Navbar />

            <div className="pt-24 px-6 pb-20 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Administrator Tier</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-mint" />)}
                            </div>
                        </div>
                        <h1 className={`text-6xl font-[900] ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter leading-none`}>
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Hub</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleEmergency}
                            className={`px-8 py-4 rounded-3xl font-black text-xs shadow-2xl flex items-center gap-2 transition-all ${emergencyMode
                                ? 'bg-white text-red-600 border-2 border-red-600 animate-pulse'
                                : 'bg-red-500/10 text-red-500 border-2 border-red-500/20 hover:bg-red-500 hover:text-white'
                                }`}
                        >
                            {emergencyMode ? <ShieldAlert size={18} /> : <AlertTriangle size={18} />}
                            {emergencyMode ? 'DEACTIVATE EMERGENCY' : 'EMERGENCY MODE'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-3xl bg-emerald-500 text-white font-black text-xs shadow-xl flex items-center gap-2 hover:bg-emerald-600 shadow-emerald-500/20"
                        >
                            <Download size={18} /> Intelligence Report
                        </motion.button>
                    </div>
                </div>

                {/* Cyberpunk Navigation Tabs */}
                <div className="flex gap-3 mb-12 overflow-x-auto pb-6 no-scrollbar">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ y: -3 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-10 py-6 rounded-[2.5rem] font-black text-xs whitespace-nowrap flex items-center gap-3 transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-[0_20px_40px_rgba(16,185,129,0.3)]'
                                : isDark ? 'bg-[#111] text-gray-400 border border-white/5 hover:border-white/20' : 'bg-white shadow-clay text-gray-500'
                                }`}
                        >
                            {tab.icon} {tab.label.toUpperCase()}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    >
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {statCards.map((s, i) => (
                                    <ClayCard key={i} className="text-left group hover:translate-y-[-8px] transition-all duration-500 p-8 border border-transparent hover:border-emerald-500/20 relative overflow-hidden">
                                        <div className="absolute -top-10 -right-10 text-9xl opacity-[0.03] group-hover:scale-125 transition-transform duration-700 pointer-events-none">{s.icon}</div>
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-4xl shadow-inner">{s.icon}</div>
                                            <div className="w-2 h-10 rounded-full bg-emerald-500/20 overflow-hidden">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: '70%' }}
                                                    transition={{ delay: i * 0.1, duration: 1.5 }}
                                                    className="w-full bg-emerald-500"
                                                />
                                            </div>
                                        </div>
                                        <div className={`text-4xl font-[900] mb-2 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                                        <div className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>
                                            {s.label}
                                        </div>
                                        <div className="text-[9px] font-black text-emerald-500 uppercase flex items-center gap-1">
                                            <Zap size={10} fill="currentColor" /> {s.sub}
                                        </div>
                                    </ClayCard>
                                ))}
                            </div>
                        )}
                        {activeTab === 'system' && (
                            <div className="max-w-4xl mx-auto">
                                <WeeklyActivity role="system" />
                            </div>
                        )}
                        {activeTab === 'map' && (
                            <div className="h-[600px]">
                                <GodViewMap />
                            </div>
                        )}
                        {activeTab === 'analytics' && (
                            <div className="space-y-8">
                                <WasteAnalytics />
                                <FoodQualityGrid />
                            </div>
                        )}
                        {activeTab === 'carbon' && <CarbonDashboard />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminDashboard;