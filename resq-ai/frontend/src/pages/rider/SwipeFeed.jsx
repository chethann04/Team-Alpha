import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { riderAPI } from '../../utils/api';
import { MapPin, Box, Zap, Heart, X, Check, Clock, ShieldCheck, Building2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SwipeCard = ({ donation, onSwipeLeft, onSwipeRight }) => {
    const { isDark } = useTheme();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);
    const skipOpacity = useTransform(x, [-100, -20], [1, 0]);
    const acceptOpacity = useTransform(x, [20, 100], [0, 1]);
    const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

    const urgencyColors = {
        low: 'bg-green-500',
        medium: 'bg-yellow-500',
        high: 'bg-orange-500',
        critical: 'bg-red-500 animate-pulse',
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            onSwipeRight();
        } else if (info.offset.x < -100) {
            onSwipeLeft();
        }
    };

    return (
        <motion.div
            style={{ x, rotate, opacity, scale, position: 'absolute', width: '100%', height: '100%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
            className="cursor-grab active:cursor-grabbing"
        >
            <ClayCard className="h-full flex flex-col p-0 overflow-hidden relative border-2 border-transparent hover:border-primary/20 transition-colors">
                {/* Visual Indicators for Swipe */}
                <motion.div style={{ opacity: skipOpacity }} className="absolute top-10 right-10 z-20 border-4 border-red-500 text-red-500 font-black px-6 py-2 rounded-2xl rotate-12 uppercase tracking-widest pointer-events-none text-2xl">
                    SKIP
                </motion.div>
                <motion.div style={{ opacity: acceptOpacity }} className="absolute top-10 left-10 z-20 border-4 border-mint text-mint font-black px-6 py-2 rounded-2xl -rotate-12 uppercase tracking-widest pointer-events-none text-2xl">
                    RESCUE
                </motion.div>

                {/* Imagery Area */}
                <div className="h-[55%] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-mint/20 to-purple-500/20" />
                    <img
                        src={donation.imageUrl || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format`}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        alt="Food Rescue"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badge Overlays */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                        <div className={`px-3 py-1.5 rounded-xl font-bold text-[10px] text-white uppercase tracking-wider flex items-center gap-1.5 ${urgencyColors[donation.urgency || 'medium']}`}>
                            <Clock size={12} /> {donation.urgency || 'Medium'} Urgency
                        </div>
                        {donation.donorType === 'corporate' && (
                            <div className="px-3 py-1.5 rounded-xl bg-purple-600 font-bold text-[10px] text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                                <Building2 size={12} /> Corporate Bonus
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">Rescue Mission</div>
                        <h2 className={`text-3xl font-black text-white leading-tight mb-2`}>
                            {donation.donorName}
                        </h2>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            <span className="text-xs font-bold text-gray-300">
                                {donation.location.address.split(',')[0]} (2.4 km away)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Impact Data */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white/5 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-gray-100'} text-center`}>
                            <div className="text-2xl font-black text-primary">{Math.round(donation.kgFood * 2.5)}</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meals Saved</div>
                        </div>
                        <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-gray-100'} text-center`}>
                            <div className="text-2xl font-black text-mint">{Math.round(donation.kgFood * 4.2)}</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Karma Pts</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center text-mint">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="text-[10px] font-black uppercase text-gray-500">AI Verified Safe</div>
                        </div>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-6 h-6 rounded-full border-2 ${isDark ? 'border-gray-900' : 'border-white'} bg-primary/20`} />
                            ))}
                        </div>
                    </div>
                </div>
            </ClayCard>
        </motion.div>
    );
};

const SwipeFeed = () => {
    const { isDark } = useTheme();
    const [donations, setDonations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        riderAPI.getFeed()
            .then(({ data }) => {
                const all = Array.isArray(data) ? data : (data.donations || data.data || data || []);
                const items = all.filter(d => d.status === 'accepted');
                setDonations(items);
            })
            .catch(() => setDonations([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32">
            <Loader2 size={48} className="text-primary animate-spin mb-4" />
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Scanning Rescue Radar...</p>
        </div>
    );

    const handleSwipeLeft = () => {
        toast('Mission Skipped ⏭️', { icon: '✖️', style: { borderRadius: '20px', background: '#333', color: '#fff' } });
        setCurrentIndex(prev => prev + 1);
    };

    const handleSwipeRight = async () => {
        const d = donations[currentIndex];
        if (d) {
            try {
                await riderAPI.acceptRescue({ donationId: d._id });
                toast.success('Mission Accepted! 🚴‍♂️', { duration: 4000 });
                setCurrentIndex(prev => prev + 1);
            } catch (error) {
                toast.error('Failed to accept mission');
            }
        }
    };

    if (currentIndex >= donations.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-full bg-mint/10 flex items-center justify-center text-mint mb-8 border-4 border-mint/20"
                >
                    <Zap size={48} />
                </motion.div>
                <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter`}>Mission Complete!</h2>
                <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>You've cleared all pending rescues in your area. You're a hero!</p>
                <button
                    onClick={() => setCurrentIndex(0)}
                    className="mt-10 px-12 py-5 rounded-[2rem] bg-gradient-to-r from-primary to-mint text-white font-black shadow-2xl hover:translate-y-[-4px] transition-transform"
                >
                    Refresh Rescue Radar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto relative h-[650px] mt-4 px-4">
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10" />
            <AnimatePresence>
                {donations.slice(currentIndex, currentIndex + 2).reverse().map((d, i) => (
                    <SwipeCard
                        key={d._id}
                        donation={d}
                        onSwipeLeft={handleSwipeLeft}
                        onSwipeRight={handleSwipeRight}
                    />
                ))}
            </AnimatePresence>

            {/* Floating Action Buttons */}
            <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-10">
                <motion.button
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSwipeLeft}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-red-500 shadow-2xl ${isDark ? 'bg-white/5 border-2 border-white/10' : 'bg-white border-2 border-gray-100'}`}
                >
                    <X size={32} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSwipeRight}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-mint shadow-2xl ${isDark ? 'bg-white/5 border-2 border-white/10' : 'bg-white border-2 border-gray-100'}`}
                >
                    <Check size={32} />
                </motion.button>
            </div>
        </div>
    );
};

export default SwipeFeed;