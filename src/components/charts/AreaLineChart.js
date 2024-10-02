// src/AreaLineChart.js

import React from 'react';
import Chart from 'react-apexcharts';

const AreaLineChart = () => {
    const data = {
        series: [{
            name: 'Price',
            data: [100, 50, 150, -50, 200, -100, 50, 300, -150]
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: ['#000'] // Set line color to black
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#00E396', '#FF4560'], // Green and Red
                    inverseColors: false,
                    opacityFrom: 0.8,
                    opacityTo: 0.2,
                    stops: [0, 100]
                }
            },
            colors: ['#000'], // Black line
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

    return (
        <div>
            <Chart options={data.options} series={data.series} type="area" height={350} />
        </div>
    );
};

export default AreaLineChart;
