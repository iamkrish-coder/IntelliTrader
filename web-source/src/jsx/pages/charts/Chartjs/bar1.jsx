import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
//import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class BarChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(106,115,250, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(106,115,250, 1)",
		      barThickness: 40
		   
        },
      ],
    };

    const options = {
      plugins:{
        legend: false,	
      },
      scales: {
        y:
          {
            display: false,
            ticks: {
              beginAtZero: true,
			        color: "#fff",
            },
          },
        
        x: 
          {
            display: false,
            // Change here
            barPercentage: 0.5,
            ticks:{
              color: "#fff",
            } 
          },
        
      },
    };

    return (
      <>
        <Bar data={data} height={150} options={options} />
      </>
    );
  }
}

export default BarChart1;
