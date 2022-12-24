import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: {
         display: true,
         position: 'bottom'
      },
      title: {
         display: false,
         text: 'Chart.js Horizontal Bar Chart'
      }
   }
};

export default function RoundChart({ data }) {
   return <Pie options={options} data={data} width={400} height={300} />;
}

RoundChart.propTypes = {
   data: PropTypes.object.isRequired
};
