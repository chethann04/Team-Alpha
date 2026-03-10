import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { X, Download, Share2, Award, ShieldCheck, Globe } from 'lucide-react';

const CertificatePreview = ({ isOpen, onClose, data }) => {
    const { isDark } = useTheme();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className={`relative w-full max-w-2xl aspect-[1/1.414] rounded-[2rem] overflow-hidden shadow-2xl border-8 ${isDark ? 'border-white/5 bg-[#111]' : 'border-white bg-[#fff]'}`}
                >
                    {/* Decorative Border */}
                    <div className="absolute inset-4 border-2 border-primary/20 rounded-[1.5rem] pointer-events-none" />

                    {/* Content */}
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center relative">
                        {/* Holographic Seal Background */}
                        <div className="absolute top-20 opacity-[0.03] pointer-events-none">
                            <Globe size={400} className="animate-spin-slow text-primary" />
                        </div>

                        <div className="mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Award size={40} className="text-primary" />
                            </div>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Verified ESG Certificate</h4>
                        </div>

                        <h1 className={`text-5xl font-[900] ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter mb-4`}>
                            Certificate of Excellence
                        </h1>
                        <p className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-10`}>
                            In Recognition of Sustainable Food Rescue Ops
                        </p>

                        <div className={`w-full py-8 border-y ${isDark ? 'border-white/5' : 'border-gray-100'} mb-10`}>
                            <p className={`text-md ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium italic`}>
                                This document officially certifies that
                            </p>
                            <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'} mt-2 mb-4`}>TechCorp India</h2>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-sm mx-auto`}>
                                has successfully diverted <span className="text-primary font-black">4,820 kg</span> of surplus food from landfills,
                                resulting in <span className="text-mint font-black">12.5 tons</span> of CO2 emission avoidance.
                            </p>
                        </div>

                        <div className="flex gap-20 items-center justify-center w-full">
                            <div className="text-center">
                                <div className="w-16 h-px bg-gray-400/30 mb-2 mx-auto" />
                                <div className="text-[8px] font-black uppercase text-gray-500">Operation Zero-Waste</div>
                            </div>
                            <div className="relative">
                                {/* Gold Seal */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full blur-xl opacity-20 shadow-2xl" />
                                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-200/50 flex items-center justify-center text-white shadow-xl">
                                    <ShieldCheck size={28} />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-px bg-gray-400/30 mb-2 mx-auto" />
                                <div className="text-[8px] font-black uppercase text-gray-500">Global SDG Registry</div>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-xl"><Download size={20} /></button>
                            <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-xl"><Share2 size={20} /></button>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
                        >
                            Close Preview
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CertificatePreview;
