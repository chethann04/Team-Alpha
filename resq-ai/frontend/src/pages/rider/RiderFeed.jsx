import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { riderAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const RiderFeed = () => {
    const { isDark } = useTheme();
    const [rescues, setRescues] = useState([]);

    useEffect(() => {
        riderAPI.getFeed()
            .then(({ data }) => {
                const all = Array.isArray(data) ? data : (data.donations || data.data || data || []);
                setRescues(all);
            })
            .catch(() => setRescues([]));
    }, []);

    const handleAccept = async (id) => {
        try {
            await riderAPI.acceptRescue({ donationId: id });
            toast.success('Rescue mission accepted! 🚴‍♂️');
            setRescues(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            toast.error('Failed to accept mission');
        }
    };

    const handleComplete = async (id) => {
        try {
            await riderAPI.complete({ donationId: id });
            toast.success('Mission accomplished! Food delivered 🏁');
            setRescues(prev => prev.filter(r => r._id !== id));
        } catch (error) {
            toast.error('Failed to complete mission');
        }
    };

    const activeMissions = rescues.filter(r => r.status === 'in_transit');
    const availableMissions = rescues.filter(r => r.status === 'accepted');

    return (
        <div className="space-y-8">
            {/* Active Missions Section */}
            {activeMissions.length > 0 && (
                <div className="space-y-4">
                    <h2 className={`text-lg font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-stone-900'} flex items-center gap-2`}>
                        🚴 Active Missions
                    </h2>
                    {activeMissions.map((r, i) => (
                        <ClayCard key={r._id} delay={i * 0.05} className="border-2 border-emerald-500/30 bg-emerald-500/5">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-4">
                                    {r.imageUrl && (
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-emerald-500/20">
                                            <img src={r.imageUrl} alt="Rescue" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.donorName}</h3>
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{r.location.address}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-emerald-500 font-black text-lg">{r.kgFood}kg</div>
                                    <div className="text-[8px] uppercase font-bold text-gray-500">In Transit</div>
                                </div>
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleComplete(r._id)}
                                className="w-full py-3 rounded-xl bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-500/20">
                                ✅ Mark as Delivered
                            </motion.button>
                        </ClayCard>
                    ))}
                </div>
            )}

            {/* Available Missions Section */}
            <div className="space-y-4">
                <h2 className={`text-lg font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-stone-900'} flex items-center gap-2`}>
                    📡 Available Rescues
                </h2>
                {availableMissions.length > 0 ? availableMissions.map((r, i) => (
                    <ClayCard key={r._id} delay={i * 0.05}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-4">
                                {r.imageUrl && (
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                        <img src={r.imageUrl} alt="Rescue" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.donorName}</h3>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{r.location.address}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-primary font-black text-lg">{r.kgFood}kg</div>
                                <div className="text-[8px] uppercase font-bold text-gray-500">To Rescue</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {r.foodItems?.map((item, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-1 rounded-lg bg-primary/10 text-primary font-semibold">
                                    {item.quantity}{item.unit} {item.name}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAccept(r._id)}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-mint text-white font-bold text-sm shadow-md">
                                ⚡ Accept Mission
                            </motion.button>
                            <button className={`px-4 py-3 rounded-xl font-bold text-sm ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                🗺️ View Map
                            </button>
                        </div>
                    </ClayCard>
                )) : (
                    <div className="text-center py-12 text-gray-500 text-sm">No new rescue missions available in your area. Check back soon!</div>
                )}
            </div>
        </div>
    );
};

export default RiderFeed;
