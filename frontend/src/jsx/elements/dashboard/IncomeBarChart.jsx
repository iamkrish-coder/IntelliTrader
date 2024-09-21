import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class IncomeBarChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(106, 115, 250, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(106, 115, 250, 1)",		      
          barPercentage: 0.5
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
            ticks: {
              beginAtZero: true,
            },
          },
        
        x: 
          {            
            // barPercentage: 0.5,
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

export default IncomeBarChart;
