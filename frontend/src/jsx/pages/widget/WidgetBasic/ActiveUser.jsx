import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend : {
        display: false
    },
    title: {
        display: false,
        text: 'Bar Chart',
    },
  },
  responsive: true,
  interaction: {
    //mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      display: !1,
      gridLines: {
        display: !1
      },
      barPercentage: 1,
      categoryPercentage: 0.5
    },
    y: {
      display: !1,
      ticks: {
        padding: 10,
        stepSize: 20,
        max: 100,
        min: 0
      },
      gridLines: {
        display: !0,
        drawBorder: !1,
        lineWidth: 1,
        zeroLineColor: "#48f3c0"
      }
    }
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "0", "1", "2", "3", "4", "5", "6"],
    datasets: [
        {        
          label: "My First dataset",
					backgroundColor: "rgba(255,255,255,0.8)",
					//backgroundcolor:'rgba(255,255,255,0.8)',
					strokeColor: "rgba(58,223,174,1)",
					pointColor: "rgba(0,0,0,0)",
					pointStrokeColor: "rgba(58,223,174,1)",
					pointHighlightFill: "rgba(58,223,174,1)",
					pointHighlightStroke: "rgba(58,223,174,1)",
					data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]    
        },
    ],
};

export default function RestActiveUser() {
    return (
        <div id="activeUser">
            <Bar data={data} options={options} height={120}  />
        </div>
    );
}
