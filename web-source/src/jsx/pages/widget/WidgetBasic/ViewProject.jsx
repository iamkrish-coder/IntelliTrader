import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ViewProject extends Component {
  render() {
    const data = {
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
          borderColor: this.props.color ? this.props.color : "#f44c60",
          borderWidth: "0",
          backgroundColor: this.props.color ? this.props.color : "#f44c60",
		      barThickness : 6
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
            max: 100,
            min: 0,
            display: false,
            ticks: {
              beginAtZero: true,
              display: false,
             
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
        <Bar data={data} height={100} options={options} />
      </>
    );
  }
}

export default ViewProject;
