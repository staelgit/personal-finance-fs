import React from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const options = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: {
         display: false,
         position: 'chartArea' /* as const */
      },
      title: {
         display: false,
         text: 'Какой то заголовок'
      }
   }
};

export default function BarChart({ data }) {
   return <Bar options={options} data={data} width={400} height={300} />;
}

BarChart.propTypes = {
   data: PropTypes.object.isRequired
};
