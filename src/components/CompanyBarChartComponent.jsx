import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const CompanyBarChartComponent = ({ data }) => {
  // Calculate the count of cars produced by each company
  const companyCount = data.reduce((acc, item) => {
    const company = item.Make;
    if (company) {
      acc[company] = (acc[company] || 0) + 1;
    }
    return acc;
  }, {});

  // Format data for the Bar Chart
  const chartData = Object.keys(companyCount).map(company => ({
    name: company,
    count: companyCount[company]
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompanyBarChartComponent;
