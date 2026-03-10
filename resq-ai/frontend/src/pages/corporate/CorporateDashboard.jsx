import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MainLayout from '../../components/MainLayout';
import ClayCard from '../../components/ui/ClayCard';
import toast from 'react-hot-toast';
import { FileText, Zap, Globe, Download, Eye, Award, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import CertificatePreview from '../../components/ui/CertificatePreview';
import WeeklyActivity from '../../components/ui/WeeklyActivity';

const CorporateDashboard = () => {
    const { isDark } = useTheme();
    const [data, setData] = useState({ mealsSaved: 3120, co2Saved: 1240, treeEq: 62, certificateCount: 14 });
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePrediction = async () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 3000)),
            {
                loading: 'Initializing Genetic Algorithm Prediction Engine...',
                success: 'Waste Intelligence: 14.8kg predicted for tomorrow. Logistics sync complete! 🤖',
                error: 'Intelligence link disrupted',
            },
            {
                style: {
                    minWidth: '350px',
                    borderRadius: '25px',
                    background: isDark ? '#111' : '#fff',
                    color: isDark ? '#fff' : '#000',
                    fontWeight: '900',
                    border: '2px solid #63b3ed'
                }
            }
        );
    };

    return (
        <MainLayout>
            <CertificatePreview isOpen={previewOpen} onClose={() => setPreviewOpen(false)} data={data} />

            <div className="pt-24 px-6 pb-20 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex justify-between items-end flex-wrap gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border 
                                ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                Enterprise Ecosystem
                            </span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className={`text-5xl font-[900] ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter leading-none`}>
                            ESG <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Analytics</span>
                        </h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-stone-400' : 'text-stone-600'} font-medium`}>TechCorp India — Bangalore Campus Operations</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Meals Saved', value: data.mealsSaved, color: '#059669', icon: <FileText size={24} />, bg: 'bg-emerald-500/5' },
                        { label: 'CO2 Offset', value: `${data.co2Saved} kg`, color: '#0ea5e9', icon: <Globe size={24} />, bg: 'bg-sky-500/5' },
                        { label: 'SDG Compliance', value: 'High', color: '#10b981', icon: <ShieldCheck size={24} />, bg: 'bg-mint/5' },
                        { label: 'Certificates', value: data.certificateCount, color: '#f59e0b', icon: <Award size={24} />, bg: 'bg-amber-500/5' },
                    ].map((s, i) => (
                        <ClayCard key={i} delay={i * 0.1} className={`text-center p-8 group hover:translate-y-[-5px] transition-transform ${s.bg}`}>
                            <div className="mb-4 inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 text-gray-400 group-hover:text-emerald-500 transition-colors">{s.icon}</div>
                            <div className="text-3xl font-[900] mb-1 tracking-tighter" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{s.label}</div>
                        </ClayCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Prediction Engine */}
                        <ClayCard className="p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap size={140} className="text-emerald-500" />
                            </div>
                            <div className="relative z-10">
                                <h3 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter`}>Waste Probability <span className="text-emerald-600">Engine</span></h3>
                                <p className={`text-sm mb-10 ${isDark ? 'text-stone-400' : 'text-stone-500'} max-w-md font-medium leading-relaxed`}>
                                    Utilizing Gemini Vision APIs and predictive node analytics to calculate surplus yield before it happens.
                                </p>

                                <div className="grid grid-cols-2 gap-6 mb-10 text-stone-900">
                                    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                                        <div className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">Confidence Score</div>
                                        <div className="text-xl font-black text-emerald-500">98.4%</div>
                                    </div>
                                    <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
                                        <div className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-1">Model Accuracy</div>
                                        <div className="text-xl font-black text-sky-500">High Intel</div>
                                    </div>
                                </div>

                                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={handlePrediction}
                                    className="px-10 py-5 rounded-[2.5rem] bg-primary text-white font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:bg-primary-hover transition-colors">
                                    <Sparkles size={18} /> Run Waste Prediction Link <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </ClayCard>

                        <WeeklyActivity role="corporate" />
                    </div>

                    {/* Certificates */}
                    <div className="space-y-6">
                        <ClayCard className="p-8">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500"><Award size={18} /></div>
                                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter uppercase`}>Impact Logs</h3>
                            </div>
                            <p className={`text-[10px] mb-8 ${isDark ? 'text-stone-500' : 'text-stone-400'} font-bold uppercase tracking-widest`}>Legally Verified Certification</p>

                            <div className="space-y-4">
                                {['Feb 2025 Impact Audit', 'Jan 2025 CSR Compliance'].map(cert => (
                                    <div key={cert} className={`group p-5 rounded-[2rem] ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-stone-50 hover:bg-stone-100'} transition-all cursor-pointer border border-transparent hover:border-emerald-500/20 shadow-sm`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-xs font-black tracking-tight">{cert}</div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setPreviewOpen(true)} className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg"><Eye size={14} /></button>
                                                <button className="p-2 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all shadow-lg"><Download size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="w-full h-1 bg-stone-200/20 rounded-full overflow-hidden">
                                            <div className="w-[100%] h-full bg-emerald-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ClayCard>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CorporateDashboard;