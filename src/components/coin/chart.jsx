import formetDate from '@/util/formetDate';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                color: "#fff",
            }
        },
        title: {
            display: false,
            text: '',
            color: "#fff"
        },
    },
    bezierCurve: false,
    scales: {
        x: {
            display: false, // Hide the x-axis labels
            title: {
                display: true,
                text: 'Time'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Price',
                type: "float"
            }
        }
    }
};


export default function Graph({ pair }) {
    const [data, setData] = useState(null)
    useEffect(() => {

        var fetchData = () => {
            return new Promise(resolve => {
                fetch(`https://decrypto-1fz0.onrender.com/api/market_data/candles?pair=${pair}`)
                    .then((data) => {
                        data.json().then(data => {
                            var newData = JSON.parse(data)
                            resolve(newData)
                        })
                    })
            })
        }
        async function read() {
            var rawData = await fetchData()
            const data = rawData.reverse()

            // Extracting relevant data for plotting
            const timestamps = data.map(entry => entry.time);
            const prices = data.map(entry => entry.high);

            // Convert timestamps to readable date format
            const dates = timestamps.map(ts => formetDate(ts));
            var processedData = {
                labels: dates,
                datasets: [
                    {
                        label: 'Price',
                        borderColor: '#f4ac2e',
                        backgroundColor: 'rgba(47, 62, 177, 0.5)',
                        data: prices,
                        color: "#fff",
                        backgroundColor: '#F05941',
                    },
                ],
            }
            setData(processedData)
        }
        read()
    }, [])
    if (data === null) {
        return <h1>Loading</h1>
    }
    else {
        return <Line  options={options} data={data} />;
    }
}