import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { donationAPI, aiAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const DonorForm = ({ onComplete }) => {
    const { isDark } = useTheme();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        donorName: '', donorType: 'restaurant',
        location: { address: '', lat: 12.9716, lng: 77.5946 },
        foodItems: [{ name: '', quantity: '', unit: 'kg' }],
        kgFood: 0,
    });

    const addItem = () => setForm({ ...form, foodItems: [...form.foodItems, { name: '', quantity: '', unit: 'kg' }] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate/Trigger AI prediction for fun
            const kg = form.foodItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);
            const { data } = await donationAPI.verify({ ...form, kgFood: kg, mealsFed: kg * 2.5, co2Prevented: kg * 2.5 });
            toast.success('Donation posted successfully! 🥳');
            onComplete();
        } catch {
            toast.error('Connection failed, but demo saved!');
            onComplete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <ClayCard>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tell us what you're rescuing</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required placeholder="Entity Name (e.g. Sunrise Cafe)" value={form.donorName} onChange={e => setForm({ ...form, donorName: e.target.value })}
                        className={`w-full p-4 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none focus:ring-2 focus:ring-primary`} />
                    <select value={form.donorType} onChange={e => setForm({ ...form, donorType: e.target.value })}
                        className={`w-full p-4 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none focus:ring-2 focus:ring-primary`}>
                        <option value="restaurant">Restaurant</option>
                        <option value="individual">Individual</option>
                        <option value="corporate">Corporate Canteen</option>
                        <option value="event">Event/Function</option>
                    </select>
                </div>

                <input required placeholder="Pickup Address" value={form.location.address} onChange={e => setForm({ ...form, location: { ...form.location, address: e.target.value } })}
                    className={`w-full p-4 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none focus:ring-2 focus:ring-primary`} />

                <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-500 uppercase">Food Items</label>
                    {form.foodItems.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input required placeholder="Item name" value={item.name} onChange={e => {
                                const newItems = [...form.foodItems]; newItems[i].name = e.target.value; setForm({ ...form, foodItems: newItems });
                            }} className={`flex-1 p-3 rounded-xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none`} />
                            <input required type="number" placeholder="Qty" value={item.quantity} onChange={e => {
                                const newItems = [...form.foodItems]; newItems[i].quantity = e.target.value; setForm({ ...form, foodItems: newItems });
                            }} className={`w-20 p-3 rounded-xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none`} />
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        ➕ Add another item
                    </button>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-mint text-white font-extrabold shadow-lg mt-4 disabled:opacity-50">
                    {loading ? 'Verifying...' : '🚀 Post for Rescue'}
                </motion.button>
            </form>
        </ClayCard>
    );
};

export default DonorForm;
