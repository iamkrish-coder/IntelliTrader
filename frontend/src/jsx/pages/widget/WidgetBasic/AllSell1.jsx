import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class AllSell1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [55, 30, 90, 41, 86, 45, 80],
          borderColor: "#ffa132",
          borderWidth: "2",
          backgroundColor: "transparent",
          pointBackgroundColor: "#ffa132",
          pointRadius: 0,
		      tension : 0.4
        },
      ],
    };

    const options = {
      plugins:{
			legend: false,
			responsive: true
	  },
      maintainAspectRatio: false,
      scales: {
        y:
          {
			display: false,
             min: 0,
			max: 100,
            ticks: {
              beginAtZero: true,
              
              stepSize: 20,
              padding: 0,
              display: false,
            },
            grid: {
              drawBorder: false,
              display: false,
            },
          },
        
        x: 
          {
            display: false,
            ticks: {
              padding: 0,
              display: false,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };
    return (
      <div style={{ height: 150 }}>
        <Line data={data} options={options} height={150} />
      </div>
    );
  }
}

export default AllSell1;
