import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class LifeTimeEarning extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40, 88, 45, 95, 54, 76],
          borderColor: "#ffa132",
          borderWidth: "0",
          backgroundColor: "#ffa132",
		      barThickness:12,
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
        y:
          {
            display: false,
            ticks: {
              beginAtZero: true,
              display: false,
              max: 100,
              min: 0,
              stepSize: 10,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
        x: 
          {
            display: false,
            barPercentage: 0.6,
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
      <>
        <Bar
          data={data}
          height={this.props.height ? this.props.height : 100}
          options={options}
          // width="100%"
        />
      </>
    );
  }
}

export default LifeTimeEarning;
