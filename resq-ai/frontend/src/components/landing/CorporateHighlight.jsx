import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../ui/ClayCard';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Building2, Users, FileBarChart, Trophy, Briefcase, ArrowRight } from 'lucide-react';

const CorporateHighlight = () => {
    const { isDark } = useTheme();
    const { user } = useApp();
    const navigate = useNavigate();

    return (
        <section className={`py-24 px-6 overflow-hidden ${isDark ? 'bg-darkbg text-white' : 'bg-lightbg text-stone-900'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black mb-6 uppercase tracking-widest border 
                            ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            <Briefcase size={14} /> Global Enterprise Ecosystem
                        </div>
                        <h2 className="text-4xl md:text-6xl font-[900] mb-8 tracking-tighter leading-[1.1]">
                            Automate Your Surplus. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Scale Your Impact.</span>
                        </h2>
                        <p className={`text-lg mb-10 ${isDark ? 'text-stone-400' : 'text-stone-500'} font-medium leading-relaxed`}>
                            Empowering sophisticated enterprises with autonomous waste logistics, verified ESG reporting, and strategic resource recovery.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {[
                                { icon: <FileBarChart size={20} />, label: 'ESG Analytics', desc: 'Real-time carbon tracking.', color: 'text-emerald-500' },
                                { icon: <Users size={20} />, label: 'Team Engagement', desc: 'Strategic volunteering matching.', color: 'text-sky-500' },
                                { icon: <Trophy size={20} />, label: 'Verified Badging', desc: 'Immutable impact certificates.', color: 'text-amber-500' },
                                { icon: <Building2 size={20} />, label: 'Logistics Desk', desc: 'Smart canteen surplus pickup.', color: 'text-emerald-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 
                                        ${isDark ? 'bg-white/5' : 'bg-stone-50 border border-stone-100'} ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black tracking-tight">{item.label}</div>
                                        <div className={`text-xs ${isDark ? 'text-stone-500' : 'text-stone-400'} font-medium`}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(user ? '/corporate' : '/login')}
                            className="px-10 py-5 rounded-2xl bg-primary text-white font-black shadow-2xl shadow-emerald-600/20 flex items-center gap-3 transition-all hover:bg-primary-hover"
                        >
                            Launch Corporate Portal <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>

                    {/* Right Panel: The Corporate Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className={`relative z-10 p-1 rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'bg-stone-800 border-white/5' : 'bg-white border-stone-100'}`}>
                            <div className={`${isDark ? 'bg-stone-900' : 'bg-stone-50/50'} rounded-[22px] p-8 border border-white/5`}>
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                                            <Building2 size={30} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>GrowthCorp Hub</h3>
                                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase border 
                                                ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                                Verified Enterprise
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">ESG Score</div>
                                        <div className="text-3xl font-black text-emerald-500">A+</div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between text-xs font-black mb-2 uppercase tracking-tighter">
                                            <span className="text-stone-400">Sustainability target</span>
                                            <span className="text-emerald-500">82%</span>
                                        </div>
                                        <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-200/50 border-stone-100'}`}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '82%' }}
                                                transition={{ duration: 2, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-stone-100 shadow-sm'}`}>
                                            <div className="text-[9px] font-black text-stone-400 mb-1 uppercase tracking-widest">Meals Donated</div>
                                            <div className="text-xl font-black text-emerald-600">4,832</div>
                                        </div>
                                        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-stone-100 shadow-sm'}`}>
                                            <div className="text-[9px] font-black text-stone-400 mb-1 uppercase tracking-widest">CO2 Prevented</div>
                                            <div className="text-xl font-black text-emerald-600">1.2 Tons</div>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black">SDG</div>
                                            <div className="text-xs font-black text-emerald-600 uppercase tracking-tight">SDG 13 Certified</div>
                                        </div>
                                        <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase">View Verification</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CorporateHighlight;