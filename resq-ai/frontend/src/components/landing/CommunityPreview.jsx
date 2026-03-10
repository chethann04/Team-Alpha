import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../ui/ClayCard';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatCounter from '../ui/StatCounter';
import { Camera, Heart, MessageCircle, Share2, Users } from 'lucide-react';

const CommunityPreview = () => {
    const { isDark } = useTheme();
    const { user } = useApp();
    const navigate = useNavigate();

    const socialPosts = [
        { name: 'Arjun S.', type: 'Rider', text: 'Just rescued 15kg from the festival! 🚴‍♂️', icon: '🍎' },
        { name: 'Sunrise Cafe', type: 'Donor', text: 'Fresh pastries now at Hope NGO. 🥐', icon: '🥧' },
        { name: 'Sarah J.', type: 'Volunteer', text: 'Feeding 50 families tonight! ❤️', icon: '🍲' },
        { name: 'Green Hub', type: 'Admin', text: 'City carbon down by 2 tons today! 🌍', icon: '🌳' },
    ];

    return (
        <section className={`py-24 px-6 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-50 border-t border-gray-100'}`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black mb-6 uppercase tracking-widest border border-primary/20">
                        <Users size={14} /> The Human Side of Impact
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-[900] mb-8 tracking-tighter leading-[1.1] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Real Stories, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint">Shared by Heroes.</span>
                    </h2>
                    <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                        Every rescue is a story of hope. Join thousands of zero-waste heroes documenting their daily impact on our live community feed.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className={`p-6 rounded-[2rem] ${isDark ? 'bg-white/5 border border-white/5' : 'bg-white shadow-clay'}`}>
                            <div className="text-3xl font-black text-primary"><StatCounter end={120} suffix="k+" /></div>
                            <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest mt-1">Heroes Joined</div>
                        </div>
                        <div className={`p-6 rounded-[2rem] ${isDark ? 'bg-white/5 border border-white/5' : 'bg-white shadow-clay'}`}>
                            <div className="text-3xl font-black text-mint"><StatCounter end={45} suffix="k+" /></div>
                            <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest mt-1">Stories Shared</div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(user ? '/community' : '/login')}
                        className={`px-10 py-5 rounded-[2rem] font-black shadow-2xl transition-all ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-black'
                            }`}
                    >
                        🌍 Join the Movement
                    </motion.button>
                </motion.div>

                {/* Grid Side: Instagram Grid Feel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full grid grid-cols-2 gap-6"
                >
                    {socialPosts.map((post, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, rotate: i % 2 === 0 ? -2 : 2 }}
                            className={`p-1 rounded-[2.5rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-clay shadow-xl'}`}
                            style={{
                                marginTop: i % 2 === 0 ? '0' : '40px',
                                marginBottom: i % 2 === 0 ? '40px' : '0'
                            }}
                        >
                            <div className={`rounded-[2.2rem] overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-50'} p-5 h-full flex flex-col`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-black">
                                        {post.name[0]}
                                    </div>
                                    <div>
                                        <div className={`text-[10px] font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.name}</div>
                                        <div className="text-[8px] text-gray-500 font-bold uppercase">{post.type}</div>
                                    </div>
                                </div>

                                <div className={`flex-1 aspect-square rounded-2xl mb-4 flex items-center justify-center text-5xl bg-gradient-to-br from-primary/10 to-mint/10 border border-white/5`}>
                                    {post.icon}
                                </div>

                                <p className={`text-[10px] font-medium leading-relaxed italic ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                    "{post.text}"
                                </p>

                                <div className="flex items-center gap-4 text-gray-400">
                                    <Heart size={14} />
                                    <MessageCircle size={14} />
                                    <Share2 size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CommunityPreview;