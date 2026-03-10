import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Leaf, ChevronLeft, ArrowRight, Shield, Globe, Zap, Mail, Lock } from 'lucide-react';

const roles = [
    { id: 'donor', label: 'Donor Portal', icon: '🍱', color: '#059669', path: '/donor', desc: 'Secure surplus food donations' },
    { id: 'corporate', label: 'Corporate Desk', icon: '🏢', color: '#0ea5e9', path: '/corporate', desc: 'Enterprise CSR & Canteen management' },
    { id: 'restaurant', label: 'Restaurant Hub', icon: '🍳', color: '#f59e0b', path: '/restaurant', desc: 'Manage kitchen surplus & menus' },
    { id: 'ngo', label: 'NGO Network', icon: '🏠', color: '#8b5cf6', path: '/ngo', desc: 'Strategic food distribution' },
    { id: 'community', label: 'Community Hub', icon: '🌍', color: '#10b981', path: '/community', desc: 'Waste-free advocacy & growth' },
    { id: 'admin', label: 'System Control', icon: '⚡', color: '#ef4444', path: '/admin', desc: 'Global analytics & infrastructure' },
];

const LoginPage = () => {
    const { isDark } = useTheme();
    const { login } = useApp();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedRole, setSelectedRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam) {
            const role = roles.find(r => r.id === roleParam);
            if (role) setSelectedRole(role);
        }
    }, [searchParams]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both Gmail and password');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (selectedRole.id === 'donor') {
            if (email !== 'chethuc809@gmail.com' || password !== 'password123') {
                setError('Invalid Donor credentials. Please use chethuc809@gmail.com / password123');
                setIsLoading(false);
                return;
            }
        }

        if (selectedRole.id === 'ngo') {
            if (email !== 'sttsupdates@gmail.com' || password !== 'password 123') {
                setError('Invalid NGO credentials. Please use sttsupdates@gmail.com / password 123');
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(true);
        setError('');

        // Mock Login Flow
        setTimeout(() => {
            login({
                name: email.split('@')[0],
                email: email,
                role: selectedRole.id,
                authMethod: 'direct_gmail'
            });
            navigate(selectedRole.path);
        }, 1500);
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${isDark ? 'bg-darkbg text-white' : 'bg-lightbg text-stone-900'}`}>
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] ${isDark ? 'bg-stone-500' : 'bg-stone-400'}`} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-7xl w-full z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-16 px-4">
                    {/* Left Info */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                        <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
                            <motion.button
                                onClick={() => navigate('/')}
                                whileHover={{ x: -4 }}
                                className="p-2.5 rounded-xl bg-stone-100 dark:bg-white/5 text-stone-500 hover:text-primary transition-all border border-transparent hover:border-primary/20"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <div className="h-6 w-px bg-stone-200 dark:bg-stone-800" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <Leaf size={20} className="text-white fill-current" />
                                </div>
                                <h2 className="text-lg font-black tracking-tighter uppercase whitespace-nowrap">ResQ<span className="text-primary">-AI</span></h2>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-10 tracking-tighter">
                            Access the <span className="text-primary italic">Intelligence</span> Layer.
                        </h1>
                        <p className={`text-xl ${isDark ? 'text-stone-400' : 'text-stone-600'} font-medium leading-relaxed mb-12 max-w-lg mx-auto lg:mx-0`}>
                            Direct authentication with Gmail credentials to manage your sector in our coordinated grid.
                        </p>

                        <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 max-w-sm mx-auto lg:mx-0">
                            <Shield className="text-primary" size={24} />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase text-stone-500 tracking-widest">Secure Infrastructure</p>
                                <p className="text-xs font-bold text-primary">Encrypted Session Handling</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Portal */}
                    <div className="lg:col-span-7 w-full">
                        <AnimatePresence mode="wait">
                            {!selectedRole ? (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                                >
                                    {roles.map((role, i) => (
                                        <motion.div
                                            key={role.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.03, y: -4 }}
                                            onClick={() => setSelectedRole(role)}
                                            className={`p-7 rounded-[2rem] border transition-all duration-500 group cursor-pointer 
                                                ${isDark ? 'bg-stone-900/80 backdrop-blur-xl border-white/5 hover:border-emerald-500/30' : 'bg-white border-stone-100 hover:border-emerald-500/30 shadow-xl'}`}
                                        >
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-inner" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
                                                {role.icon}
                                            </div>
                                            <h3 className="text-lg font-black tracking-tight mb-2 uppercase">{role.label}</h3>
                                            <p className={`text-[10px] ${isDark ? 'text-stone-500' : 'text-stone-400'} font-bold uppercase tracking-widest`}>{role.desc}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="auth"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-10 rounded-[2.5rem] border ${isDark ? 'bg-stone-900 border-white/5 shadow-2xl' : 'bg-white border-stone-100 shadow-xl'}`}
                                >
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${selectedRole.color}10`, color: selectedRole.color }}>
                                            {selectedRole.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter">
                                                {selectedRole.label} <span className="text-primary">Gate</span>
                                            </h3>
                                            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Enter credentials to connect</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 ml-1">Gmail Address</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="example@gmail.com"
                                                    className={`w-full p-5 pl-14 bg-transparent rounded-2xl border-2 transition-all outline-none text-lg font-bold
                                                        ${isDark ? 'border-white/5 focus:border-primary bg-white/5 text-white' : 'border-stone-100 focus:border-primary bg-stone-50 text-stone-900'}`}
                                                />
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 ml-1">Password</label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`w-full p-5 pl-14 bg-transparent rounded-2xl border-2 transition-all outline-none text-lg font-bold
                                                        ${isDark ? 'border-white/5 focus:border-primary bg-white/5 text-white' : 'border-stone-100 focus:border-primary bg-stone-50 text-stone-900'}`}
                                                />
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center">⚠️ {error}</p>
                                        )}

                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedRole(null)}
                                                className={`px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                                                    ${isDark ? 'bg-white/5 text-stone-400 hover:bg-white/10' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                                            >
                                                Back
                                            </button>
                                            <button
                                                disabled={isLoading}
                                                type="submit"
                                                className={`flex-1 p-5 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2
                                                    ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                                            >
                                                {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
                                                {!isLoading && <ArrowRight size={16} />}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-10 p-5 rounded-2xl bg-stone-950 text-white flex items-center gap-4">
                                        <Zap className="text-primary" size={20} />
                                        <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                                            Direct Gmail login active. OAuth verification bypassed for local node stability.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="pt-12 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>
                        ResQ-AI Infrastructure • Global Recovery Network
                    </p>
                    <div className="flex gap-6 text-[10px] font-bold text-stone-500 uppercase">
                        <span>Documentation</span>
                        <span>Network Status</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
