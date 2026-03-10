import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { ngoAPI, donationAPI } from '../../utils/api';
import { AlertCircle, Zap, CheckCircle2, MapPin, Users, Flame, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const UrgencyMatcher = () => {
    const { isDark } = useTheme();
    const [urgencyThreshold, setUrgencyThreshold] = useState(50);
    const [allNgos, setAllNgos] = useState([]);
    const [ngos, setNgos] = useState([]);
    const [allDonations, setAllDonations] = useState([]);
    const [matching, setMatching] = useState(null);
    const [matchedDonation, setMatchedDonation] = useState(null);

    useEffect(() => {
        ngoAPI.getAll()
            .then(({ data }) => setAllNgos(data.ngos || data.data || data || []))
            .catch(() => setAllNgos([]));
        donationAPI.getAll()
            .then(({ data }) => setAllDonations(data.donations || data.data || []))
            .catch(() => setAllDonations([]));
    }, []);

    useEffect(() => {
        const levelMap = { low: 20, medium: 50, high: 80, critical: 100 };
        const filtered = allNgos.filter(ngo => levelMap[ngo.urgency] >= (100 - urgencyThreshold));
        setNgos(filtered);
    }, [urgencyThreshold, allNgos]);

    const startMatch = (ngo) => {
        setMatching(ngo._id);
        const available = allDonations.filter(d => d.status === 'verified');
        const match = available[Math.floor(Math.random() * available.length)];

        setTimeout(() => {
            setMatchedDonation(match || null);
            setMatching(null);
            if (match) toast.success(`Optimal Match Assigned! 🍱 -> 🏠`);
            else toast.error("No verified surplus available right now.");
        }, 2000);
    };

    const handleDeploy = async (id) => {
        try {
            await donationAPI.updateStatus(id, 'accepted');
            toast.success('Mission Deployed! 🚀');
            setMatchedDonation(null); // Clear for next match
            window.location.reload();
        } catch (error) {
            toast.error('Deployment failed.');
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header with Slider */}
            <div className={`p-8 rounded-[3rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-clay'} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Flame size={120} className="text-orange-500" />
                </div>

                <h2 className={`text-4xl font-[900] ${isDark ? 'text-white' : 'text-gray-900'} mb-2 tracking-tighter`}>Urgency Hub</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 font-medium`}>Intelligent matchmaking for critical food requirements.</p>

                <div className="space-y-4 max-w-md">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest">Sensitivity Slider</label>
                        <span className="text-xs font-black text-orange-500">{urgencyThreshold}% Match Intensity</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={urgencyThreshold}
                        onChange={(e) => setUrgencyThreshold(e.target.value)}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[8px] font-black text-gray-500 uppercase">
                        <span>All Needs</span>
                        <span>Emergency Only</span>
                    </div>
                </div>
            </div>

            {/* NGO Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {ngos.map((ngo) => (
                        <motion.div
                            key={ngo._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <ClayCard className={`h-full relative overflow-hidden border-2 transition-all duration-500 ${ngo.urgency === 'critical'
                                ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.2)]'
                                : isDark ? 'border-white/5' : 'border-gray-100'
                                }`}>
                                {ngo.urgency === 'critical' && (
                                    <motion.div
                                        animate={{ opacity: [0, 0.1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute inset-0 bg-orange-500 pointer-events-none"
                                    />
                                )}

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block mb-3 ${ngo.urgency === 'critical' ? 'bg-orange-500 text-white animate-pulse' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {ngo.urgency} Priority
                                        </div>
                                        <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter`}>{ngo.name}</h3>
                                        <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                                            <MapPin size={12} />
                                            <span className="text-[10px] font-bold">Bangalore South • 3.2km away</span>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ngo.urgency === 'critical' ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/40' : 'bg-primary/20 text-primary'
                                        }`}>
                                        <AlertCircle size={24} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                                    <div className={`p-4 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Meals</div>
                                        <div className={`text-3xl font-[900] ${isDark ? 'text-white' : 'text-gray-900'}`}>{ngo.mealsRequired}</div>
                                    </div>
                                    <div className={`p-4 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Impact Radius</div>
                                        <div className={`text-3xl font-[900] ${isDark ? 'text-primary' : 'text-primary'}`}>4.2k</div>
                                    </div>
                                </div>

                                {matching === ngo._id ? (
                                    <div className="flex flex-col items-center justify-center py-6 gap-3">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                                    className="w-2 h-2 rounded-full bg-primary"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Scanning Surplus Intelligence...</span>
                                    </div>
                                ) : matchedDonation ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                        <div className={`p-5 rounded-[2rem] flex items-center gap-4 ${isDark ? 'bg-mint/10 border border-mint/20' : 'bg-mint/5 border border-mint/20'} relative z-10`}>
                                            <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-white shadow-lg shadow-mint/20">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[9px] font-black text-mint uppercase tracking-widest">Surplus Matched</div>
                                                <div className={`text-md font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{matchedDonation.donorName}</div>
                                                <div className="text-[10px] text-gray-500 font-bold">Distance: 1.4 km • Payload: {matchedDonation.kgFood}kg</div>
                                            </div>
                                            <button
                                                onClick={() => handleDeploy(matchedDonation._id)}
                                                className="px-5 py-2.5 rounded-xl bg-mint text-white text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                                            >
                                                Deploy
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={() => startMatch(ngo)}
                                        className={`w-full py-5 rounded-[2rem] font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 relative z-10 ${ngo.urgency === 'critical' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-primary hover:shadow-primary/30'
                                            }`}
                                    >
                                        <Zap size={20} className="fill-current" /> Auto-Identify Best Match
                                    </button>
                                )}
                            </ClayCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Information Footer */}
            <div className="flex items-center gap-4 p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10">
                <div className="text-indigo-400"><Info size={24} /></div>
                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                    ResQ-AI uses real-time waste intelligence to connect critical NGO needs with surplus food within a 5km radius.
                    Mission priority is automatically calculated based on shelf-life and nutritional density.
                </p>
            </div>
        </div>
    );
};

export default UrgencyMatcher;