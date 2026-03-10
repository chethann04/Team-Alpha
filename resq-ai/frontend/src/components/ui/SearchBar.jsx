import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-3 rounded-2xl text-sm font-medium ${
          isDark
            ? 'bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:border-primary/50'
            : 'bg-white shadow-clay text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary/30'
        } focus:outline-none transition-all`}
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={14} />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;