/**
 * FilterBar Component
 * Provides filtering options: All, Completed, Pending, Priority
 * 
 * @param {string} activeFilter - Currently active filter
 * @param {Function} onFilterChange - Callback when filter changes
 */
const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'high', label: 'High Priority' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

