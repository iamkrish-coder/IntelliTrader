import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  defaultFontFamily: "Poppins",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First dataset",
      data: [25, 20, 60, 41, 66, 45, 80],
      borderColor: "rgba(255,97,117, 1)",
      borderWidth: "1",
      backgroundColor: "rgba(255,97,117, 0.1)",
	  tension:0.4,
	  fill:true
    },
    {
      label: "My First dataset",
      data: [5, 25, 20, 41, 36, 75, 70],
      borderColor: "rgba(106,115,250,1)",
      borderWidth: "1",
      backgroundColor: "rgba(106,115,250,0.2)",
	  tension:0.4,
	  fill:true
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
		      max: 100,
          min: 0,
        ticks: {
          beginAtZero: true,
		      color :"#fff",
          stepSize: 20,
          padding: 10,
        },
      },
    
    x: 
      {
        display: false,
        ticks: {
		    color :"#fff",
          padding: 5,
        },
      },
    
  },
};
class DualArea extends Component {
  render() {
    return (
      <div >
        <Line data={data} options={options} height={150} />
      </div>
    );
  }
}

export default DualArea;
