import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { Clock, Zap, ShieldCheck } from 'lucide-react';

const ShelfLifePredictor = () => {
    const { isDark } = useTheme();

    return (
        <div className="space-y-6">
            <ClayCard className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                    <Clock size={40} />
                </div>
                <h2 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Shelf-Life AI</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xs mx-auto mb-8`}>
                    Upload food metrics or snap a photo to predict remaining freshness using Gemini Vision.
                </p>
                <button className="px-8 py-4 rounded-3xl bg-primary text-white font-black shadow-lg">
                    Launch AI Predictor
                </button>
            </ClayCard>

            <div className="grid grid-cols-2 gap-4">
                <ClayCard className="bg-mint/5 border border-mint/10">
                    <Zap className="text-mint mb-2" size={20} />
                    <div className="text-xs font-bold text-gray-600 uppercase">Accuracy</div>
                    <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>98.2%</div>
                </ClayCard>
                <ClayCard className="bg-blue-500/5 border border-blue-500/10">
                    <ShieldCheck className="text-blue-500 mb-2" size={20} />
                    <div className="text-xs font-bold text-gray-600 uppercase">Verified</div>
                    <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Certified</div>
                </ClayCard>
            </div>
        </div>
    );
};

export default ShelfLifePredictor;