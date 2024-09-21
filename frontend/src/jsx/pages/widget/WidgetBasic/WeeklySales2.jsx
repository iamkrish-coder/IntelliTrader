import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class WeeklySales2 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [25, 60, 30, 71, 26, 85, 50],
          borderColor: "rgba(58,122,254, 1)",
          borderWidth: "2",
          backgroundColor: "rgba(58,122,254, 1)",
          pointBackgroundColor: "rgba(58,122,254, 1)",
          pointRadius: 0,
		      tension:0.4,
		      fill:true
        },
      ],
    };

    const options = {
     plugins:{
		  legend: false,
	  	responsive: true,
		  tooltips: {
        intersect: !1,
        mode: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
		  },
	 },
      maintainAspectRatio: false,
      
      scales: {
        y: 
          {
            display: false,
            max: 100,
            min: 0,
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              padding: 0,
              display: false,
            },
            gridLines: {
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
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };

    return (
      <div style={{ height: 300 }}>
        <Line data={data} options={options} height={300} />
      </div>
    );
  }
}

export default WeeklySales2;
