import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import MainLayout from '../../components/MainLayout';
import ClayCard from '../../components/ui/ClayCard';
import {
    User,
    Building2,
    Shield,
    Award,
    Settings,
    Bell,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    Edit3,
    Save
} from 'lucide-react';

const Profile = () => {
    const { isDark } = useTheme();
    const { user, globalStats, updateUser } = useApp();
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editOrg, setEditOrg] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: 'personal', label: 'Identity', icon: User },
        { id: 'organization', label: 'Node Intel', icon: Building2 },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    const enterEditMode = () => {
        setEditName(user.name);
        setEditOrg(user.org || '');
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            updateUser({ name: editName, org: editOrg });
            setIsEditing(false);
            setIsSaving(false);
        }, 1200);
    };

    if (!user) return null;

    return (
        <MainLayout>
            <div className={`pt-24 pb-12 px-6 lg:px-24 min-h-screen ${isDark ? 'bg-darkbg text-white' : 'bg-lightbg text-stone-900'}`}>
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-primary/10 overflow-hidden border-4 border-primary/20 p-2">
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-2xl" />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={isEditing ? handleSave : enterEditMode}
                                    disabled={isSaving}
                                    className={`absolute bottom-1 right-1 p-2.5 rounded-2xl ${isEditing ? 'bg-emerald-500' : 'bg-primary'} text-white shadow-xl transition-colors`}
                                >
                                    {isSaving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        isEditing ? <Save size={16} /> : <Edit3 size={16} />
                                    )}
                                </motion.button>
                            </div>

                            <div className="text-center md:text-left">
                                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                    <h1 className="text-4xl font-black tracking-tighter uppercase">{user.name || 'Anonymous ResQ'}</h1>
                                    <CheckCircle2 size={24} className="text-primary" />
                                </div>
                                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                        {user.role} Portal Access
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-full ${isDark ? 'bg-white/5' : 'bg-stone-100'} text-stone-500 text-[10px] font-black uppercase tracking-widest border ${isDark ? 'border-white/5' : 'border-stone-200'}`}>
                                        UID: RSQ-2024-{Math.floor(Math.random() * 9000) + 1000}
                                    </span>
                                </div>
                            </div>

                            <div className="md:ml-auto flex gap-4">
                                <ClayCard className="!p-4 bg-primary text-white border-none flex flex-col items-center justify-center min-w-[120px]">
                                    <Award size={20} className="mb-1" />
                                    <div className="text-2xl font-black">94</div>
                                    <div className="text-[8px] uppercase tracking-widest font-bold opacity-80">ESG Score</div>
                                </ClayCard>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                                    ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                        : isDark ? 'bg-white/5 text-stone-500 hover:bg-white/10' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ClayCard className="!p-10">
                                {activeTab === 'personal' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                                    <User className="text-primary" /> Personal Identification
                                                </h3>
                                                {isEditing ? (
                                                    <button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                                        <Save size={12} /> Sync Changes
                                                    </button>
                                                ) : (
                                                    <button onClick={enterEditMode} className="text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                                        <Edit3 size={12} /> Modify
                                                    </button>
                                                )}
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-500 ml-1">Full Representative Name</label>
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className={`w-full p-5 rounded-2xl border-2 outline-none transition-all font-bold text-lg
                                                                ${isDark ? 'bg-white/5 border-white/10 focus:border-primary text-white' : 'bg-stone-50 border-stone-200 focus:border-primary text-stone-900'}`}
                                                        />
                                                    ) : (
                                                        <div className={`p-5 rounded-2xl border-2 ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'} font-bold text-lg`}>
                                                            {user.name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-500 ml-1">Verified Email Address</label>
                                                    <div className={`p-5 rounded-2xl border-2 ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'} font-bold flex items-center justify-between opacity-60`}>
                                                        <span>{user.name.toLowerCase().replace(/\s+/g, '.')}@resq-ai.org</span>
                                                        <CheckCircle2 size={16} className="text-primary" />
                                                    </div>
                                                    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest ml-1 italic">Protocol email is managed by network administrators.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                                <Bell className="text-emerald-500" /> Notifications
                                            </h3>
                                            <div className={`p-6 rounded-2xl border ${isDark ? 'border-white/5 bg-white/5' : 'border-stone-100 bg-stone-50'}`}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-bold">Email Alerts</span>
                                                    <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer">
                                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold">Mobile Notifications</span>
                                                    <div className={`w-12 h-6 rounded-full relative cursor-pointer ${isDark ? 'bg-white/10' : 'bg-stone-200'}`}>
                                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'organization' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
                                                <Building2 className="text-primary" size={28} /> Network Node Intel
                                            </h3>
                                            <button className="px-6 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/20 transition-all">
                                                Verified Org
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className={`p-6 rounded-2xl border ${isDark ? 'border-white/5 bg-white/5' : 'border-stone-100 bg-stone-50'}`}>
                                                <Settings size={20} className="text-primary mb-4" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-1">Role Type</p>
                                                <p className="text-lg font-black capitalize">{user.role}</p>
                                                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-widest mt-2">Immutable Protocol Role</p>
                                            </div>

                                            <div className={`p-6 rounded-2xl border transition-all ${isEditing ? (isDark ? 'bg-primary/10 border-primary/30' : 'bg-primary/5 border-primary/20') : (isDark ? 'border-white/5 bg-white/5' : 'border-stone-100 bg-stone-50')}`}>
                                                <Building2 size={20} className="text-primary mb-4" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-1">Organization</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editOrg}
                                                        onChange={(e) => setEditOrg(e.target.value)}
                                                        className={`w-full bg-transparent border-b-2 border-primary/30 outline-none font-black text-lg py-1 focus:border-primary transition-all`}
                                                    />
                                                ) : (
                                                    <p className="text-lg font-black capitalize">{user.org || 'Independent Node'}</p>
                                                )}
                                                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-widest mt-2">{isEditing ? 'Modify entity name' : 'Current active node entity'}</p>
                                            </div>

                                            <div className={`p-6 rounded-2xl border ${isDark ? 'border-white/5 bg-white/5' : 'border-stone-100 bg-stone-50'}`}>
                                                <Award size={20} className="text-primary mb-4" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-1">Registry Date</p>
                                                <p className="text-lg font-black capitalize">Feb 2024</p>
                                                <p className="text-[8px] font-bold text-stone-500 uppercase tracking-widest mt-2">Verified Blockchain Timestamp</p>
                                            </div>
                                        </div>

                                        <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-primary/5 border-primary/10' : 'bg-primary/10 border-primary/10'}`}>
                                            <h4 className="text-xs font-black uppercase tracking-widest mb-4">ESG Impact Contribution</h4>
                                            <div className="flex items-end gap-2 mb-6">
                                                <div className="text-5xl font-black tracking-tighter text-primary">A+</div>
                                                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Network Efficiency</div>
                                            </div>
                                            <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-white/10 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '92%' }}
                                                    className="h-full bg-primary relative"
                                                >
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                </motion.div>
                                            </div>
                                            <div className="mt-4 flex justify-between text-[9px] font-black uppercase tracking-widest text-stone-500">
                                                <span>Global Avg: B</span>
                                                <span>Your Node: A+</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="max-w-xl space-y-8">
                                        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
                                            <Shield className="text-primary" size={28} /> Protocol Security
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between px-1">
                                                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-500">Access Key / PIN</label>
                                                    <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline">Rotate Key</button>
                                                </div>
                                                <div className={`p-5 rounded-2xl border-2 ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'} font-bold tracking-[0.5em]`}>
                                                    ••••••••
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-500 ml-1">Session Management</label>
                                                <button className="w-full p-5 rounded-2xl border-2 border-stone-200 dark:border-white/5 text-xs font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all">
                                                    Terminate All Active Sessions
                                                </button>
                                            </div>

                                            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-100'}`}>
                                                <p className="text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Danger Territory</p>
                                                <p className={`text-[11px] font-medium leading-relaxed mb-4 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                                                    Deleting this node account will permanently wipe all history of surplus prevention and ESG impact score. This action cannot be undone.
                                                </p>
                                                <button className="text-[10px] font-black uppercase tracking-widest text-white bg-rose-500 px-6 py-3 rounded-xl shadow-lg shadow-rose-500/20">
                                                    Decommission Node
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ClayCard>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
