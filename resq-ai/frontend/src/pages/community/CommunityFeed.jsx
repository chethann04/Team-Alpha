import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/navbar/Navbar';
import ClayCard from '../../components/ui/ClayCard';
import { communityAPI } from '../../utils/api';
import { demoRiders, demoNGOs } from '../../utils/demoData';
import { Heart, MessageCircle, Share2, TrendingUp, Award, Zap, Camera, Sparkles, MoreHorizontal, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

const StoryCard = ({ item, isDark }) => (
    <motion.div
        whileHover={{ scale: 1.1, rotate: 2 }}
        className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer pt-2 px-1 mb-4"
    >
        <div className={`p-1 rounded-full bg-gradient-to-tr from-orange-500 via-primary to-mint shadow-xl ${isDark ? 'ring-2 ring-white/5' : 'ring-2 ring-gray-100'}`}>
            <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${isDark ? 'border-darkbg' : 'border-white'} relative`}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name || item.authorName}`} alt="Story" className="bg-primary/20 w-full h-full object-cover" />
                {item.urgency === 'critical' && <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 bg-red-500" />}
            </div>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${isDark ? 'text-gray-400' : 'text-gray-600'} w-20 text-center truncate`}>
            {item.name || item.authorName}
        </span>
    </motion.div>
);

const PostContent = ({ type, authorName, isDark }) => {
    const images = {
        corporate_impact: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format',
        rescue_selfie: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=800&auto=format',
        donation_story: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format'
    };

    return (
        <div className="relative aspect-square md:aspect-video bg-gray-900 overflow-hidden group">
            <img
                src={images[type] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format'}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
                alt="Impact"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-primary shadow-xl text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                    <Sparkles size={10} /> AI GENERATED STORY
                </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-mint text-white text-[8px] font-black uppercase tracking-tighter shadow-lg">
                        NEW RESCUE SUCCESS
                    </div>
                </div>
                <div className="text-white/40 text-[8px] font-black uppercase">{authorName} x ResQ-AI</div>
            </div>
        </div>
    );
};

const CommunityFeed = () => {
    const { isDark } = useTheme();
    const [posts, setPosts] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        communityAPI.getFeed()
            .then(({ data }) => {
                const items = data.posts || data.data || data || [];
                setPosts(items);
            })
            .catch(() => setPosts([]));
    }, []);

    const generateAIPost = () => {
        setLoadingAI(true);
        setTimeout(() => {
            const newPost = {
                _id: Date.now().toString(),
                authorName: 'AI Guardian',
                authorRole: 'system',
                postType: 'rescue_selfie',
                content: `Today's Waste Intelligence Update: 1.2 tons of food rescued globally. Carbon offset equivalent to 240 trees planted! 🌳✨`,
                likes: 1042,
                comments: [],
                createdAt: new Date().toISOString(),
            };
            setPosts([newPost, ...posts]);
            setLoadingAI(false);
            toast.success('AI Impact Story Generated! ✨');
        }, 3000);
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
            <Navbar />

            <div className="pt-24 px-4 md:px-6 pb-20 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

                {/* Main Content Area */}
                <div className="flex-1 lg:max-w-[60%] space-y-10">

                    {/* Story Rail */}
                    <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={generateAIPost}
                            className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer pt-2 snap-start"
                        >
                            <div className={`w-18 h-18 rounded-full flex items-center justify-center border-2 border-dashed ${isDark ? 'border-primary/40 text-primary' : 'border-primary/40 text-primary'} bg-primary/5 shadow-2xl relative`}>
                                {loadingAI ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={28} /></motion.div> : <Camera size={28} />}
                                {loadingAI && <div className="absolute -bottom-1 whitespace-nowrap text-[8px] font-black bg-primary text-white px-2 py-0.5 rounded-full">AI WORKING</div>}
                            </div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Generate</span>
                        </motion.div>
                        {[...demoRiders, ...demoNGOs].map((item, i) => (
                            <StoryCard key={i} item={item} isDark={isDark} />
                        ))}
                    </div>

                    {/* Feed Posts */}
                    <AnimatePresence>
                        {posts.map((post, i) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="snap-start"
                            >
                                <div className={`rounded-[2rem] overflow-hidden ${isDark ? 'bg-[#111] border border-white/5 shadow-2xl' : 'bg-white shadow-clay border border-gray-100'} mb-10`}>
                                    {/* Post Header */}
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-mint">
                                                <div className="w-10 h-10 rounded-full bg-black overflow-hidden border-2 border-black">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorName}`} alt="Author" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-1.5`}>
                                                    {post.authorName}
                                                    {post.authorRole === 'system' && <BadgeCheck className="text-primary fill-current" size={14} />}
                                                </div>
                                                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none mt-0.5">{post.authorRole}</div>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                                    </div>

                                    {/* Content Page */}
                                    <PostContent type={post.postType} authorName={post.authorName} isDark={isDark} />

                                    {/* Interaction Bar */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex gap-6">
                                                <motion.button whileTap={{ scale: 0.7 }} className={`${post.authorRole === 'system' ? 'text-red-500' : isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    <Heart fill={post.authorRole === 'system' ? 'currentColor' : 'none'} size={28} />
                                                </motion.button>
                                                <button className={isDark ? 'text-white' : 'text-gray-900'}><MessageCircle size={28} /></button>
                                                <button className={isDark ? 'text-white' : 'text-gray-900'}><Share2 size={28} /></button>
                                            </div>
                                            <button className={isDark ? 'text-white' : 'text-gray-900'}><Bookmark size={28} /></button>
                                        </div>

                                        <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{post.likes.toLocaleString()} likes</div>

                                        <div className="text-sm leading-relaxed">
                                            <span className={`font-black mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.authorName}</span>
                                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{post.content}</span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {['#ResQAI', '#ZeroWaste', '#ImpactHub'].map(tag => (
                                                <span key={tag} className="text-xs font-black text-primary hover:underline cursor-pointer">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="mt-4 text-[9px] text-gray-500 uppercase font-black tracking-[0.2em]">
                                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Right Sidebar - Tracking & Highlights */}
                <div className="hidden lg:block lg:w-[35%] space-y-10 sticky top-24 h-fit">

                    {/* Hero Widget */}
                    <div className={`p-8 rounded-[3rem] ${isDark ? 'bg-gradient-to-br from-primary/20 to-mint/20 border border-white/10 shadow-2xl' : 'bg-white shadow-clay'}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-[1rem] bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly Leaders</h3>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Community MVP Race</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {demoRiders.slice(0, 4).map((rider, i) => (
                                <motion.div
                                    key={rider._id}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-mint">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rider.name}`} alt="Top Rider" />
                                            </div>
                                            {i === 0 && <div className="absolute -top-1 -right-1 bg-yellow-400 text-[8px] p-0.5 rounded-full shadow-lg">👑</div>}
                                        </div>
                                        <div>
                                            <div className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-primary transition-colors`}>{rider.name}</div>
                                            <div className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{rider.karmaPoints} Points</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2].map(b => (
                                            <div key={b} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-mint' : 'bg-gray-400/20'}`} />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-5 rounded-[2rem] bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-primary transition-colors">
                            View Global Leaderboard
                        </button>
                    </div>

                    {/* Community Goal */}
                    <div className={`p-8 rounded-[3rem] ${isDark ? 'bg-[#111] border border-white/5' : 'bg-gray-50'}`}>
                        <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-[0.2em] mb-4">Collective Impact</div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end text-[10px] font-black mb-2 uppercase tracking-widest">
                                    <span className="text-primary flex items-center gap-1.5"><Zap size={14} className="fill-current" /> Bangalore Goal</span>
                                    <span className={isDark ? 'text-white' : 'text-gray-900'}>84%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200/20 rounded-full overflow-hidden p-0.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '84%' }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-primary to-mint rounded-full"
                                    />
                                </div>
                            </div>
                            <ClayCard className="p-4 bg-primary/5 border border-primary/10">
                                <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'} italic font-medium leading-relaxed`}>
                                    "Our collective rescue is just <span className="text-primary font-black">12kg away</span> from the city record! Let's keep the movement alive! 🌍"
                                </p>
                            </ClayCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BadgeCheck = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" /></svg>
);

export default CommunityFeed;