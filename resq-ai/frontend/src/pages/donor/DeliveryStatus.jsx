import { motion } from 'framer-motion';

const steps = [
    { id: 'verified', icon: '🤖', label: 'Safety Check' },
    { id: 'in_transit', icon: '🚴', label: 'On the Way' },
    { id: 'delivered', icon: '✅', label: 'Arrived' },
];

const DeliveryStatus = ({ status }) => {
    const currentStep = steps.findIndex(s => s.id === status);

    return (
        <div className="pt-4 border-t border-white/5 mt-4">
            <div className="flex justify-between relative mb-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0" />
                <motion.div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
                {steps.map((step, i) => (
                    <div key={i} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${i <= currentStep ? 'bg-primary text-white scale-110' : 'bg-gray-800 text-gray-500'
                        }`}>
                        {step.icon}
                    </div>
                ))}
            </div>
            <div className="flex justify-between px-1">
                {steps.map((step, i) => (
                    <span key={i} className={`text-[8px] font-bold uppercase ${i <= currentStep ? 'text-primary' : 'text-gray-500'}`}>
                        {step.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DeliveryStatus;
