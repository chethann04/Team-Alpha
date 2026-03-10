import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { Award, Download, Share2, Heart } from 'lucide-react';

const DonationCertificate = ({ donorName = "Zero Waste Hero", impact = "12" }) => {
    const { isDark } = useTheme();

    return (
        <div className="space-y-6">
            <ClayCard className="relative overflow-hidden border-4 border-primary/20 p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-br-full -translate-x-10 -translate-y-10" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-mint/10 rounded-tl-full translate-x-10 translate-y-10" />

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6"
                >
                    <Award size={48} />
                </motion.div>

                <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Certificate of Impact
                </h2>
                <p className={`text-sm tracking-widest uppercase font-bold text-gray-400 mb-8`}>
                    Awarded for Exceptional Service to the Planet
                </p>

                <div className="space-y-4 mb-8">
                    <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        This certifies that <span className="font-black text-primary underline decoration-mint decoration-4 underline-offset-4">{donorName}</span>
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-sm mx-auto`}>
                        has successfully rescued surplus food, preventing carbon emissions and feeding the community in need.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
                    <div>
                        <div className="text-2xl font-black text-primary">{impact}kg</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500">Food Rescued</div>
                    </div>
                    <div>
                        <div className="text-2xl font-black text-mint">{Math.round(impact * 2.5)}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500">Meals Provided</div>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-2 text-primary font-black italic">
                    <Heart size={16} fill="currentColor" /> ResQ-AI Initiative
                </div>
            </ClayCard>

            <div className="flex gap-4">
                <button className={`flex-1 py-4 rounded-2xl bg-primary text-white font-black shadow-lg flex items-center justify-center gap-2`}>
                    <Download size={20} /> Download PDF
                </button>
                <button className={`flex-1 py-4 rounded-2xl ${isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-700 shadow-clay'} font-black flex items-center justify-center gap-2`}>
                    <Share2 size={20} /> Share Impact
                </button>
            </div>
        </div>
    );
};

export default DonationCertificate;