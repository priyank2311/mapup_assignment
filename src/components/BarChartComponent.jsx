import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  // Prepare data for the chart (count of EVs per make)
  const makeCount = data.reduce((acc, item) => {
    const make = item.Make;
    if (make) {
      acc[make] = (acc[make] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(makeCount).map(make => ({
    name: make,
    count: makeCount[make]
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
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

export default BarChartComponent;
