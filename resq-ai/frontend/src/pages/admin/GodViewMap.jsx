import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import { useTheme } from '../../context/ThemeContext';
import { donationAPI } from '../../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';

const getStatusIcon = (status, isDark) => {
    const colors = {
        verified: '#ef4444', // Red - Waiting
        in_transit: '#f59e0b', // Yellow - Transit
        delivered: '#10b981', // Green - Delivered
    };
    const color = colors[status] || '#63b3ed';

    return L.divIcon({
        className: 'custom-status-icon',
        html: `
            <div class="relative">
                <div class="absolute -inset-2 rounded-full opacity-20 animate-ping" style="background-color: ${color}"></div>
                <div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}"></div>
            </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

const GodViewMap = () => {
    const { isDark } = useTheme();
    const center = [12.9716, 77.5946];
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        donationAPI.getAll()
            .then(({ data }) => setDonations(data.donations || data.data || []))
            .catch(() => setDonations([]));
    }, []);

    return (
        <div className="relative h-full flex flex-col gap-6">
            <div className={`h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 ${isDark ? 'border-white/5' : 'border-white'} relative group`}>
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer
                        url={isDark
                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                    />

                    {/* Simulation Heatmap Blur */}
                    <Circle center={center} radius={3000} pathOptions={{ color: isDark ? '#3b82f6' : '#63b3ed', fillColor: isDark ? '#3b82f6' : '#63b3ed', fillOpacity: 0.05, weight: 0 }} />

                    {/* Missions (Real Donations) */}
                    {donations.filter(d => d.location?.lat && d.location?.lng).map(d => (
                        <Marker
                            key={d._id}
                            position={[d.location.lat, d.location.lng]}
                            icon={getStatusIcon(d.status, isDark)}
                        >
                            <Popup className="custom-popup">
                                <div className="p-2 min-w-[150px]">
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Mission Active</div>
                                    <div className="text-sm font-black text-gray-900">{d.donorName}</div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${d.status === 'verified' ? 'bg-red-100 text-red-600' :
                                            d.status === 'in_transit' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                            }`}>{d.status}</span>
                                        <span className="text-[10px] font-bold text-gray-500">{d.kgFood}kg</span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* NASA HUD Overlays */}
                <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
                    <div className={`p-4 rounded-2xl backdrop-blur-md ${isDark ? 'bg-black/60 border border-white/10' : 'bg-white/80 shadow-xl border border-gray-100'}`}>
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">System Metrics</div>
                        <div className="space-y-3">
                            {[
                                { label: 'Satellite Link', val: 'Active', color: 'text-mint' },
                                { label: 'Node Count', val: '142 Active', color: isDark ? 'text-white' : 'text-gray-900' },
                                { label: 'Waste Pressure', val: 'Nominal', color: 'text-primary' },
                            ].map(m => (
                                <div key={m.label} className="flex justify-between gap-10 items-center">
                                    <span className="text-[9px] font-bold text-gray-500 uppercase">{m.label}</span>
                                    <span className={`text-[9px] font-black uppercase ${m.color}`}>{m.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 z-[1000] pointer-events-none">
                    <div className={`p-4 rounded-2xl backdrop-blur-md ${isDark ? 'bg-black/60 border border-white/10' : 'bg-white/80 shadow-xl border border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col text-right">
                                <span className="text-[8px] font-black text-gray-500 uppercase">Coordination Delta</span>
                                <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>12.9716° N, 77.5946° E</span>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-6 left-6 z-[1000]">
                    <div className={`flex gap-4 p-3 rounded-2xl backdrop-blur-md ${isDark ? 'bg-black/40' : 'bg-white/60 shadow-lg'}`}>
                        {[
                            { label: 'Waiting', color: 'bg-red-500' },
                            { label: 'Transit', color: 'bg-yellow-500' },
                            { label: 'Delivered', color: 'bg-green-500' },
                        ].map(l => (
                            <div key={l.label} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                                <span className="text-[8px] font-black uppercase text-gray-400">{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GodViewMap;