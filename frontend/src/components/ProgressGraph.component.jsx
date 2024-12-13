import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressGraph = () => {
    // Generate dates from 1/12/2024 to 15/12/2024
    const generateDates = () => {
        const dates = [];
        for (let i = 1; i <= 15; i++) {
            dates.push(`${i}/12/2024`);
        }
        return dates;
    };

    // Generate random values between 0 and 100
    const generateRandomValues = () => {
        return generateDates().map(() => Math.floor(Math.random() * 101));
    };

    const data = {
        labels: generateDates(),
        datasets: [
            {
                label: 'Number of PullUps',
                data: generateRandomValues(),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'PullUp Progress'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <Line data={data} options={options} />
        </div>
    );
};

export default ProgressGraph;