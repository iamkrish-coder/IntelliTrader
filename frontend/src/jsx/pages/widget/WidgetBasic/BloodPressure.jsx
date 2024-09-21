import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BloodPressur extends Component {
  render() {
    const data = {
      labels: [33, 22, 68, 54, 8, 30, 74, 7, 36, 5, 41, 19, 43, 29, 38],
      datasets: [
        {
          label: "My First dataset",
          data: [33, 22, 68, 54, 8, 30, 74, 7, 36, 5, 41, 19, 43, 29, 38],
          borderColor: "#10ca93",
          borderWidth: "0",
          backgroundColor: "#10ca93",
          barPercentage: 0.5,
        },
      ],
    };

    const options = {
      plugins:{
        legend: false,
      },
      responsive: true,  
      maintainAspectRatio: false,
      scales: {
        y: 
          {
            max: 100,
            min: 0,
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
      <div style={{ height: 120, width:200 }} className="d-inline-block">
        <Bar data={data} height={120} width={200} options={options} />
      </div>
    );
  }
}

export default BloodPressur;
