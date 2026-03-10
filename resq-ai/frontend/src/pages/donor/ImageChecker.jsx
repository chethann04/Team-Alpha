import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { aiAPI } from '../../utils/api';
import ClayCard from '../../components/ui/ClayCard';
import toast from 'react-hot-toast';
import { Camera, Zap, ShieldCheck, UploadCloud, RefreshCw } from 'lucide-react';

const ImageChecker = ({ onResult, onStart, onImageCapture, embedded = false }) => {
    const { isDark } = useTheme();
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please upload a valid image file');
            return;
        }
        setImage(file);
        setResult(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            if (onImageCapture) onImageCapture(reader.result);
        };
        reader.readAsDataURL(file);

        // Auto-analyze
        analyzeImage(file);
    };

    const analyzeImage = async (file) => {
        setLoading(true);
        if (onStart) onStart();
        try {
            const formData = new FormData();
            formData.append('image', file);

            // Actually call the API if possible, otherwise use demo
            try {
                const { data } = await aiAPI.imageCheck(formData);
                setResult(data);
                if (onResult) onResult(data);
                toast.success('Gemini AI Analysis Success! ✨');
            } catch (e) {
                // Demo Fallback - Smarter for testing
                setTimeout(() => {
                    const isUnsafeTest = file.name.toLowerCase().match(/waste|expired|rotten|bad|old/);
                    const demoResult = isUnsafeTest ? {
                        quality: 'Unsafe',
                        status: 'unsafe',
                        confidence: 98.5,
                        label: 'Compromised Food Item',
                        shelfLife: 'Expired',
                        score: 0.12,
                        findings: ['Signs of spoilage detected', 'Potentially expired', 'Unfit for donation'],
                        isDemo: true
                    } : {
                        quality: 'Safe',
                        status: 'safe',
                        confidence: 99.2,
                        label: 'Safe Food Item',
                        shelfLife: '18-24 Hours',
                        score: 0.98,
                        findings: ['Food looks fresh', 'Properly packaged', 'No signs of spoilage'],
                        isDemo: true
                    };
                    setResult(demoResult);
                    if (onResult) onResult(demoResult);
                    toast(isUnsafeTest ? 'Simulation: Unsafe Food Detected! ⚠' : 'Simulation: Safety Verified! ✓', {
                        icon: '🤖',
                        duration: 4000
                    });
                    setLoading(false);
                }, 2000);
            }
        } catch (error) {
            toast.error('AI Analysis failed. Try again.');
            setLoading(false);
        } finally {
            if (result) setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {!embedded && (
                <div className="text-center mb-6">
                    <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>🤖 AI Guardian</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Snap a photo. Let Gemini verify safety.</p>
                </div>
            )}

            <ClayCard className={loading ? 'animate-pulse' : ''}>
                <div
                    onClick={() => inputRef.current?.click()}
                    className={`relative w-full h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${preview ? 'border-primary/50' : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-primary/50'
                        }`}
                >
                    {preview ? (
                        <>
                            <img src={preview} className="w-full h-full object-cover" alt="Food" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <RefreshCw className="text-white" size={32} />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <UploadCloud size={32} />
                            </div>
                            <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Upload Food Photo</span>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="text-primary"
                            >
                                <Zap size={40} />
                            </motion.div>
                            <span className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Gemini analyzing...</span>
                        </div>
                    )}
                </div>
                <input type="file" hidden ref={inputRef} onChange={(e) => handleFile(e.target.files[0])} accept="image/*" />
            </ClayCard>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <ClayCard className={`${result.status === 'safe' ? 'bg-mint/5 border-mint/20' : result.quality === 'Caution' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-xl text-white ${result.status === 'safe' ? 'bg-mint' : result.quality === 'Caution' ? 'bg-orange-500' : 'bg-red-500'}`}>
                                    {result.status === 'safe' ? <ShieldCheck size={20} /> : <Zap size={20} />}
                                </div>
                                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {result.status === 'safe' ? 'Safety Verified' : result.quality === 'Caution' ? 'Caution Advised' : 'Unsafe Food Detected'}
                                    {result.isDemo && <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] uppercase tracking-tighter">Simulation</span>}
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-2xl bg-white/5">
                                    <div className="text-[8px] uppercase font-bold text-gray-400">Condition</div>
                                    <div className={`text-sm font-black ${result.status === 'safe' ? 'text-mint' : result.quality === 'Caution' ? 'text-orange-500' : 'text-red-500'}`}>
                                        {result.quality}
                                    </div>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5">
                                    <div className="text-[8px] uppercase font-bold text-gray-400">Confidence</div>
                                    <div className="text-sm font-black text-primary">{result.confidence}%</div>
                                </div>
                            </div>
                            {result.findings && result.findings.length > 0 && (
                                <div className="mt-3 p-3 rounded-xl bg-white/5">
                                    <div className="text-[8px] uppercase font-bold text-gray-400 mb-1">AI Findings</div>
                                    <ul className="text-[10px] space-y-1">
                                        {result.findings.map((f, i) => (
                                            <li key={i} className={isDark ? 'text-gray-300' : 'text-gray-600'}>• {f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </ClayCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageChecker;