// src/ColumnChart.js

import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = () => {
    const data = {
        series: [{
            name: 'Amount',
            data: [100, -50, 150, -100, 200, -75, 300, -150, 50]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                    distributed: true,
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                title: {
                    text: 'Months'
                }
            },
            yaxis: {
                title: {
                    text: 'Amount ($)'
                },
                labels: {
                    formatter: (value) => `$${value}`,
                },
            },
            tooltip: {
                y: {
                    formatter: (val) => `$${val}`,
                },
            },
            grid: {
                borderColor: '#f1f1f1',
            },
        }
    };

    // Function to get colors based on values
    const getBarColors = () => {
        return data.series[0].data.map(value => (value >= 0 ? '#00E396' : '#FF4560'));
    };

    return (
        <div>
            <Chart
                options={{ ...data.options, colors: getBarColors() }} // Set dynamic colors based on values
                series={data.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default ColumnChart;
