import React from 'react';
import Chart from 'react-apexcharts';

const HorizontalBarChart = () => {
  const data = {
    series: [
      {
        name: 'Values',
        data: [2000, -1500, 3000, -2500], // Example amounts for each symbol
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Set to false for a vertical chart
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}`, // Show the amount as a data label
      },
      xaxis: {
        categories: ['XAU/USD', 'EUR/USD', 'US30', 'JPY/USD'], // Financial symbols
      },
      title: {
        text: 'Financial Instruments',
        align: 'left',
        style: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
    },
  };

  // Function to determine bar color based on value
  const getBarColors = () => {
    return data.series[0].data.map(value => '#87A2FF'); // Use Nervi Blue for all bars
  };

  return (
    <div>
      <Chart 
        options={{ ...data.options, colors: getBarColors() }} 
        series={data.series} 
        type="bar" 
        height={350} 
      />
    </div>
  );
};

export default HorizontalBarChart;
