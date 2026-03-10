import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTheme } from '../../context/ThemeContext';
import { demoDonations, demoNGOs } from '../../utils/demoData';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ImpactMap = () => {
    const { isDark } = useTheme();

    const center = [12.9716, 77.5946]; // Bangalore center

    return (
        <section className={`py-10 px-6 ${isDark ? 'bg-darkbg' : 'bg-lightbg'}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Real-Time{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint">
                        Impact Map
                    </span>
                </h2>
                <p className={`mt-3 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    See where the rescues are happening right now.
                </p>
            </motion.div>

            <div className={`max-w-6xl mx-auto h-[500px] rounded-3xl overflow-hidden shadow-2xl border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url={isDark
                            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Donation Markers */}
                    {demoDonations.map((d) => (
                        <Marker key={d._id} position={[d.location.lat, d.location.lng]}>
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-primary">{d.donorName}</h3>
                                    <p className="text-xs mb-1">📦 {d.kgFood}kg food rescued</p>
                                    <p className="text-[10px] text-gray-500 capitalize">Status: {d.status.replace('_', ' ')}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* NGO Markers */}
                    {demoNGOs.map((n) => (
                        <Marker key={n._id} position={[n.location.lat, n.location.lng]}>
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-mint">{n.name}</h3>
                                    <p className="text-xs mb-1">🏠 NGO Partner</p>
                                    <p className="text-xs text-red-500 font-bold uppercase">Urgency: {n.urgency}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="max-w-6xl mx-auto mt-6 flex justify-center gap-8 text-sm font-bold flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(99,179,237,0.5)]"></div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Food Surplus</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-mint shadow-[0_0_10px_rgba(104,211,145,0.5)]"></div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>NGO Partners</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg">🚴‍♂️</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Riders in Action</span>
                </div>
            </div>
        </section>
    );
};

export default ImpactMap;
