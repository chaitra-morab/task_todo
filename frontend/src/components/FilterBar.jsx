
import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="mb-4 flex gap-4 justify-center">
      {['all', 'active', 'completed'].map(f => (
        <button
          key={f}
          className={`px-4 py-2 rounded ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;


