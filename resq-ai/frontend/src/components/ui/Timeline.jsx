import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle2, Circle, Clock, Package, Bike, Home } from 'lucide-react';

const TimelineStep = ({ step, currentStep, isLast, isDark }) => {
    const isActive = step.id === currentStep;
    const isCompleted = step.id < currentStep;

    const icons = {
        pickup: <Package size={18} />,
        picked: <CheckCircle2 size={18} />,
        transit: <Bike size={18} />,
        delivered: <Home size={18} />,
        waiting: <Clock size={18} />
    };

    return (
        <div className="flex gap-4 min-h-[80px]">
            <div className="flex flex-col items-center">
                <motion.div
                    animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                        backgroundColor: isCompleted || isActive ? '#63b3ed' : (isDark ? '#1f2937' : '#e5e7eb')
                    }}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white z-10`}
                >
                    {isCompleted ? <CheckCircle2 size={20} /> : (icons[step.type] || <Circle size={20} />)}
                </motion.div>
                {!isLast && (
                    <div className={`w-0.5 flex-1 my-1 transition-colors duration-500 ${isCompleted ? 'bg-primary' : 'bg-gray-200/20'}`} />
                )}
            </div>
            <div className={`pb-8 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                <h4 className={`text-sm font-black uppercase tracking-widest ${isActive ? 'text-primary' : isDark ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                </h4>
                <p className={`text-[10px] font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                    {step.time}
                </p>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 text-[9px] font-black text-mint uppercase tracking-tighter bg-mint/10 px-2 py-1 rounded-lg inline-block"
                    >
                        Live Intelligence Active
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const Timeline = ({ currentStep = 2 }) => {
    const { isDark } = useTheme();

    const steps = [
        { id: 1, title: 'Waiting Pickup', time: '10:42 AM', type: 'waiting' },
        { id: 2, title: 'Picked Up', time: '11:05 AM', type: 'pickup' },
        { id: 3, title: 'In Transit', time: 'ETA 4 mins', type: 'transit' },
        { id: 4, title: 'Delivered', time: 'Pending', type: 'delivered' },
    ];

    return (
        <div className="p-2">
            {steps.map((step, i) => (
                <TimelineStep
                    key={step.id}
                    step={step}
                    currentStep={currentStep}
                    isLast={i === steps.length - 1}
                    isDark={isDark}
                />
            ))}
        </div>
    );
};

export default Timeline;