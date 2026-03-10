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
                const items = all.filter(d => d.status === 'accepted');
                setRescues(items);
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

    return (
        <div className="space-y-4">
            {rescues.length > 0 ? rescues.map((r, i) => (
                <ClayCard key={r._id} delay={i * 0.05}>
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.donorName}</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{r.location.address}</p>
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
    );
};

export default RiderFeed;
