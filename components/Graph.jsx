import React from 'react';
import
  {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};


const Graph = ( { sparkline, color } ) =>
{
  const labels = Object.keys( sparkline ).map( ( data ) => `${data} H`);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: '',
        data: sparkline,
        borderColor: `${color}`,
        backgroundColor: `${color}90`,
      },
    ],
  };
  return <Line options={ options } data={ data } className='h-full'/>;
}

export default Graph