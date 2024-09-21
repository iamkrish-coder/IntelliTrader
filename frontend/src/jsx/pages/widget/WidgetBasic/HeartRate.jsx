import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class HeartRate extends Component {
  render() {
    const data = {
      labels: [ 73, 53, 50,67,3,56,19,59,37,32,40,26,71,19,4,53,55,31,37,],
      datasets: [
        {
          label: "My First dataset",
          data: [73,53,50,67,3,56,19,59,37,32,40,26,71,19,4,53,55,31],
          borderColor: "#3a7afe",
          borderWidth: "0",
          backgroundColor: "#3a7afe",
          barPercentage: 1.1,
        },
      ],
    };

    const options = {
      plugins:{
		  legend: false,
			responsive: true,
	  },
      maintainAspectRatio: false,
      scales: {
        y :
          {
            display: false,
            ticks: {
              beginAtZero: true,
              display: false,
              
              stepSize: 7,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
        x: 
          {
            display: false,
            
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        
      },
    };

    return (
      <div style={{ height: 120 ,  width:220}} className="d-inline-block">
        <Bar data={data} height={120} options={options} />
      </div>
    );
  }
}

export default HeartRate;
