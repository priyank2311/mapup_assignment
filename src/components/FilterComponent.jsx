import React from 'react';

const FilterComponent = ({ filters, setFilters, availableYears, availableTypes, availableRegions }) => {

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col ss:flex-row ss:space-x-4 space-y-4 ss:space-y-0 my-4 justify-between">
      {/* Year Filter */}
      <div className="w-full ss:w-1/3">
        <label className="block mb-2 text-sm font-medium">Year</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Years</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Vehicle Type Filter */}
      <div className="w-full ss:w-1/3">
        <label className="block mb-2 text-sm font-medium">Vehicle Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Types</option>
          {availableTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="w-full ss:w-1/3">
        <label className="block mb-2 text-sm font-medium">Region</label>
        <select
          name="region"
          value={filters.region}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Regions</option>
          {availableRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
