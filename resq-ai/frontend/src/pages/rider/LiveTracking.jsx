import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { useTheme } from '../../context/ThemeContext';
import L from 'leaflet';
import { Navigation, Bike, Package, CheckCircle, Bell, Volume2, ShieldCheck, MapPin } from 'lucide-react';
import Timeline from '../../components/ui/Timeline';
import toast from 'react-hot-toast';

const LiveTracking = () => {
    const { isDark } = useTheme();
    const donorPos = [12.9716, 77.5946];
    const ngoPos = [12.9352, 77.6245];

    const [bikePos, setBikePos] = useState(donorPos);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(3); // In Transit
    const [lastNotif, setLastNotif] = useState(null);

    // Fake GPS Simulation - moves every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 0.05;
                if (next >= 1) {
                    if (currentStep < 4) {
                        setCurrentStep(4);
                        triggerNotification('Mission Accomplished! Food Delivered 🏁');
                    }
                    return 1;
                }
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [currentStep]);

    useEffect(() => {
        const lat = donorPos[0] + (ngoPos[0] - donorPos[0]) * progress;
        const lng = donorPos[1] + (ngoPos[1] - donorPos[1]) * progress;
        setBikePos([lat, lng]);
    }, [progress]);

    const triggerNotification = (msg) => {
        setLastNotif(msg);
        toast.success(msg, {
            icon: '🔔',
            style: { borderRadius: '20px', background: isDark ? '#1a202c' : '#fff', color: isDark ? '#fff' : '#333' }
        });
        // Simulate Bike Sound
        console.log("Playing sound: vroom-vroom.mp3");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[700px]">
            {/* Left Panel: Telemetry & Timeline */}
            <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-6 rounded-[2.5rem] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-clay'} flex-1`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className={`text-xl font-[900] ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter`}>Mission Control</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ID: #RESQ-8429-XC</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 animate-pulse">
                            <Navigation size={20} />
                        </div>
                    </div>

                    <Timeline currentStep={currentStep} />

                    <div className="mt-8 p-5 rounded-3xl bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"><ShieldCheck size={16} /></div>
                            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Environment Shield</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[9px] font-black text-gray-500 uppercase">Temp</div>
                                <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>4.2°C</div>
                            </div>
                            <div>
                                <div className="text-[9px] font-black text-gray-500 uppercase">CO2 Offset</div>
                                <div className="text-sm font-black text-mint">12.5kg</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Audio Waveform Placeholder */}
                <div className={`p-4 rounded-3xl ${isDark ? 'bg-black/40' : 'bg-gray-100'} flex items-center gap-4`}>
                    <Volume2 className="text-primary animate-bounce" size={20} />
                    <div className="flex-1 flex gap-1 h-4 items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 16, 8, 12, 4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                className="flex-1 bg-primary rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">Live Comms</span>
                </div>
            </div>

            {/* Right Panel: Big Map Showpiece */}
            <div className="lg:col-span-2 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`h-full min-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 ${isDark ? 'border-white/5' : 'border-white'} relative z-10`}
                >
                    <MapContainer center={donorPos} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                        <TileLayer
                            url={isDark
                                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                        />

                        {/* Animated Polyline (Polyline itself isn't easily animated in core leaflet without extra plugins, 
                            so we use the dashed line and the bike position) */}
                        <Polyline positions={[donorPos, ngoPos]} color="#63b3ed" weight={6} opacity={0.3} />
                        <Polyline positions={[donorPos, bikePos]} color="#63b3ed" weight={6} />

                        {/* Donor Node */}
                        <Marker position={donorPos} icon={L.divIcon({
                            className: 'custom-pin',
                            html: `<div style="background: white; border: 3px solid #63b3ed; width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-center shadow-lg">🍱</div>`,
                            iconSize: [30, 30],
                            iconAnchor: [15, 30]
                        })} />

                        {/* NGO Node */}
                        <Marker position={ngoPos} icon={L.divIcon({
                            className: 'custom-pin',
                            html: `<div style="background: white; border: 3px solid #68d391; width: 40px; height: 40px; border-radius: 15px; display: flex; align-items: center; justify-center shadow-lg animate-bounce">🏠</div>`,
                            iconSize: [40, 40],
                            iconAnchor: [20, 40]
                        })} />

                        {/* Animated Bike Marker */}
                        <Marker
                            position={bikePos}
                            icon={L.divIcon({
                                className: 'bike-icon',
                                html: `
                                    <div class="relative">
                                        <div class="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                                        <div style="background-color: #63b3ed; padding: 10px; border-radius: 20px; color: white; border: 3px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.3); transform: rotate(15deg)">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                                        </div>
                                    </div>`,
                                iconSize: [44, 44],
                                iconAnchor: [22, 22]
                            })}
                        />
                    </MapContainer>

                    {/* HUD Overlays */}
                    <div className="absolute top-8 left-8 z-[1000] flex gap-4">
                        <div className={`px-5 py-3 rounded-2xl backdrop-blur-md ${isDark ? 'bg-black/60 border border-white/10' : 'bg-white/80 border border-gray-100 shadow-xl'}`}>
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <div>
                                    <div className="text-[9px] font-black uppercase text-gray-400">Current Velocity</div>
                                    <div className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>24 km/h</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8 z-[1000]">
                        <div className="px-6 py-4 rounded-[2rem] bg-gradient-to-r from-primary to-mint text-white font-black shadow-2xl flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            DEMO SIMULATION ACTIVE
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LiveTracking;