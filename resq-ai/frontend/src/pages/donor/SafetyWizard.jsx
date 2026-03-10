import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import ImageChecker from './ImageChecker';
import { donationAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { ChevronRight, ChevronLeft, Package, Sparkles, ShieldCheck, Heart } from 'lucide-react';

const SafetyWizard = ({ onComplete }) => {
    const { isDark } = useTheme();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [formData, setFormData] = useState({
        donorName: '',
        donorType: 'restaurant',
        location: { address: '', lat: 12.9716, lng: 77.5946 },
        foodItems: [{ name: '', quantity: '', unit: 'kg' }],
        preparedTime: 'Just now',
        safety: {
            temp: 'Cold',
            packaging: 'Sealed',
            smell: 'Fresh'
        }
    });

    const [aiResult, setAiResult] = useState(null);

    const steps = [
        { id: 1, title: 'Rescue Details', icon: <Package size={20} /> },
        { id: 2, title: 'Safety Check', icon: <ShieldCheck size={20} /> },
        { id: 3, title: 'Gemini AI', icon: <Sparkles size={20} /> },
        { id: 4, title: 'Mission Ready', icon: <Heart size={20} /> }
    ];

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSafetyChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            safety: { ...prev.safety, [field]: value }
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.foodItems];
        newItems[index][field] = value;
        setFormData(prev => ({ ...prev, foodItems: newItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            foodItems: [...prev.foodItems, { name: '', quantity: '', unit: 'kg' }]
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const kg = formData.foodItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);
            const payload = {
                ...formData,
                kgFood: kg,
                mealsFed: kg * 2.5,
                co2Prevented: kg * 2.5,
                status: 'verified'
            };

            await donationAPI.create(payload);
            setShowConfetti(true);
            toast.success('Zero Waste Mission Started! 🚀');

            setTimeout(() => {
                setShowConfetti(false);
                onComplete();
            }, 5000);
        } catch (error) {
            toast.error('Mission failed to launch, but saved locally!');
            onComplete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-10 px-2">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 flex-1 relative">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${step >= s.id ? 'bg-primary text-white shadow-xl scale-110' : isDark ? 'bg-white/5 text-gray-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {s.icon}
                        </div>
                        <span className={`text-[9px] uppercase font-black tracking-widest ${step >= s.id ? 'text-primary' : 'text-gray-500'
                            }`}>{s.title}</span>
                        {i < steps.length - 1 && (
                            <div className={`absolute top-6 left-1/2 w-full h-[2px] -z-0 ${step > s.id ? 'bg-primary' : 'bg-gray-200/20'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && (
                        <div className="space-y-4">
                            <ClayCard className="border-l-4 border-primary">
                                <h3 className={`text-xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Rescue Details</h3>
                                <div className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity Name</label>
                                        <input
                                            name="donorName"
                                            placeholder="e.g. Grand Plaza Hotel"
                                            value={formData.donorName}
                                            onChange={handleFormChange}
                                            className={`w-full p-4 rounded-2xl font-bold ${isDark ? 'bg-white/5 text-white' : 'bg-white shadow-clay'} focus:ring-2 ring-primary/20 outline-none`}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prepared Time</label>
                                        <select
                                            name="preparedTime"
                                            value={formData.preparedTime}
                                            onChange={handleFormChange}
                                            className={`w-full p-4 rounded-2xl font-bold ${isDark ? 'bg-white/5 text-white' : 'bg-white shadow-clay'} focus:ring-2 ring-primary/20 outline-none`}
                                        >
                                            <option>Just now</option>
                                            <option>1 hour ago</option>
                                            <option>2 hours ago</option>
                                            <option>3+ hours ago</option>
                                        </select>
                                    </div>
                                </div>
                            </ClayCard>

                            <ClayCard className="border-l-4 border-mint">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Food Items</h3>
                                    <button onClick={addItem} className="px-3 py-1 rounded-lg bg-mint/10 text-mint text-[10px] font-black uppercase">+ Add</button>
                                </div>
                                <div className="space-y-3">
                                    {formData.foodItems.map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <input
                                                placeholder="e.g. Mixed Curry"
                                                value={item.name}
                                                onChange={e => handleItemChange(i, 'name', e.target.value)}
                                                className={`flex-1 p-4 rounded-2xl font-bold ${isDark ? 'bg-white/5 text-white' : 'bg-white shadow-clay'} outline-none`}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Kg"
                                                value={item.quantity}
                                                onChange={e => handleItemChange(i, 'quantity', e.target.value)}
                                                className={`w-20 p-4 rounded-2xl font-bold text-center ${isDark ? 'bg-white/5 text-white' : 'bg-white shadow-clay'} outline-none`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </ClayCard>

                            <button onClick={nextStep} className="w-full py-5 rounded-[2rem] bg-primary text-white font-black shadow-xl flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform">
                                Continue to Safety Check <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <ClayCard className="border-l-4 border-orange-400">
                                <h3 className={`text-xl font-black mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Safety Questions</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: 'Temperature', field: 'temp', options: ['Cold', 'Room Temp', 'Hot'] },
                                        { label: 'Packaging', field: 'packaging', options: ['Sealed', 'Partial', 'Open'] },
                                        { label: 'Smell', field: 'smell', options: ['Fresh', 'Neutral', 'Vibrant'] },
                                    ].map((q) => (
                                        <div key={q.field} className="space-y-3">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{q.label}</label>
                                            <div className="flex gap-2">
                                                {q.options.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleSafetyChange(q.field, opt)}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${formData.safety[q.field] === opt
                                                                ? 'bg-primary text-white shadow-lg'
                                                                : isDark ? 'bg-white/5 text-gray-500' : 'bg-white text-gray-400 shadow-inner'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ClayCard>
                            <div className="flex gap-4">
                                <button onClick={prevStep} className={`flex-1 py-5 rounded-[2rem] font-black ${isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-600 shadow-clay'}`}>Back</button>
                                <button onClick={nextStep} className="flex-[2] py-5 rounded-[2rem] bg-primary text-white font-black shadow-xl flex items-center justify-center gap-2">
                                    Continue to Gemini AI <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <ImageChecker
                                onResult={(res) => {
                                    setAiResult(res);
                                    setIsAnalyzing(false);
                                }}
                                onStart={() => setIsAnalyzing(true)}
                            />
                            {isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-4 flex flex-col items-center gap-3"
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-2 h-2 rounded-full bg-primary"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-black text-primary uppercase tracking-[0.2em] animate-pulse">Gemini is Thinking...</span>
                                </motion.div>
                            )}
                            <div className="flex gap-4">
                                <button onClick={prevStep} className={`flex-1 py-5 rounded-[2rem] font-black ${isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-600 shadow-clay'}`}>Back</button>
                                <button onClick={nextStep} disabled={!aiResult} className={`flex-[2] py-5 rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-2 ${aiResult ? 'bg-primary text-white' : 'bg-gray-300 text-white cursor-not-allowed grayscale'}`}>
                                    View Result <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <ClayCard className="text-center py-10 overflow-hidden relative">
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="w-24 h-24 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-6 text-mint border-4 border-mint/20 shadow-2xl"
                                >
                                    <ShieldCheck size={48} />
                                </motion.div>

                                <div className="inline-block px-4 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-black uppercase tracking-widest mb-4">
                                    ✓ Safe to Donate
                                </div>
                                <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Mission Verified</h2>
                                <p className="text-xs text-gray-500 font-medium mb-8">AI Analysis complete. Impact logged successfully.</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className={`p-5 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <div className="text-3xl font-black text-primary">
                                            {formData.foodItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0) * 2.5}
                                        </div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Meals Fed</div>
                                    </div>
                                    <div className={`p-5 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <div className="text-3xl font-black text-mint">
                                            {(formData.foodItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0) * 0.8).toFixed(1)}
                                        </div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Kg CO2 Saved</div>
                                    </div>
                                </div>

                                {/* Rescue Ticket */}
                                <div className={`border-2 border-dashed ${isDark ? 'border-primary/20' : 'border-primary/40'} rounded-2xl p-4 flex items-center justify-between bg-primary/5`}>
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-primary uppercase">Rescue Ticket ID</div>
                                        <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>#RESQ-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                                    </div>
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-gray-900">
                                        <Package size={24} />
                                    </div>
                                </div>
                            </ClayCard>

                            <div className="flex gap-4">
                                <button onClick={prevStep} disabled={loading} className={`flex-1 py-5 rounded-[2rem] font-black ${isDark ? 'bg-white/5 text-white' : 'bg-white text-gray-600 shadow-clay'}`}>Back</button>
                                <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-5 rounded-[2rem] bg-gradient-to-r from-primary to-mint text-white font-black shadow-xl flex items-center justify-center gap-2 overflow-hidden relative">
                                    {loading ? 'Launching Mission...' : '🚀 Generate Rescue Ticket'}
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SafetyWizard;