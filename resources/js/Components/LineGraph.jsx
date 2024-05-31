import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
  // Extract category names and visits from data object
  const categories = Object.keys(data);
  const visits = Object.values(data);

  // Define chart data
  const chartData = {
    labels: categories, // Use categories array as labels
    datasets: [
      {
        label: 'Nombre de Visites',
        data: visits,
        fill: false,
        borderColor: '#1a2c44',
        borderWidth: 2,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Catégories', // X-axis label
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de Visites', // Y-axis label
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;


