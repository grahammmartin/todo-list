import React from 'react';
import { FILTERS } from '../utils/filters';
import { Filter } from '../types/filter';
import { useTodoContext } from '../context/TodoContext';

const Filters = () => {
  const { filter, setFilter } = useTodoContext();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <div className="flex justify-end my-4">
      <select
        className="mt-8 px-4 py-2 rounded-md text-gray-700"
        value={filter}
        onChange={handleFilterChange}
      >
        {FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
