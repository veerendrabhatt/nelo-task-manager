import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

/**
 * SearchBar Component
 * Implements elastic search-style workflow with debouncing
 * 
 * @param {Function} onSearch - Callback function when search value changes
 */
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce search input to avoid excessive re-renders
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Notify parent component when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        placeholder="Search tasks (case-insensitive)..."
      />
    </div>
  );
};

export default SearchBar;

