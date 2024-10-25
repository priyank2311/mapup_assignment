import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FilterComponent from './components/FilterComponent';
import DataTableComponent from './components/DataTableComponent';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import CompanyBarChartComponent from './components/CompanyBarChartComponent';

const App = () => {
  const [evData, setEvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ year: '', type: '', region: '' });

  // Rows per page for pagination
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch and parse CSV
    fetch('/Electric_Vehicle_Population_Data.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            setEvData(results.data);
            setFilteredData(results.data);
          },
        });
      });
  }, []);

  const availableYears = [...new Set(evData.map(item => item['Model Year']))].sort();
  const availableTypes = [...new Set(evData.map(item => item['Electric Vehicle Type']))];
  const availableRegions = [...new Set(evData.map(item => item.City))];

  // Filter the data based on selected filters
  useEffect(() => {
    let filtered = evData;

    if (filters.year) {
      filtered = filtered.filter(item => item['Model Year'] === filters.year);
    }

    if (filters.type) {
      filtered = filtered.filter(item => item['Electric Vehicle Type'] === filters.type);
    }

    if (filters.region) {
      filtered = filtered.filter(item => item.City === filters.region);
    }

    setFilteredData(filtered);
  }, [filters, evData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Electric Vehicle Dashboard</h1>

      {/* Filter Component */}
      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        availableYears={availableYears}
        availableTypes={availableTypes}
        availableRegions={availableRegions}
      />

      {/* Data Table with Pagination */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">EV Data Table</h2>
        <DataTableComponent data={filteredData} rowsPerPage={rowsPerPage} />
      </div>

      {/* Bar Chart - EV Count by Make */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">EV Count by Make</h2>
        <BarChartComponent data={filteredData} />
      </div>

      {/* Pie Chart - Vehicle Types */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Proportion of Vehicle Types</h2>
        <PieChartComponent data={filteredData} />
      </div>
      
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Proportion of Vehicle Companies</h2>
        <CompanyBarChartComponent data={filteredData} />
      </div>
    </div>
  );
};

export default App;
