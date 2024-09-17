import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
	defaultFontFamily: "Poppins",
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
	datasets: [
		{
		  label: "My First dataset",
		  data: [25, 20, 60, 41, 66, 45, 80],
		  borderColor: "rgba(106,115,250,1)",
		  borderWidth: "1",
		  backgroundColor: "rgba(106,115,250,0.5)",
		  pointBackgroundColor: "rgba(106,115,250,1)",
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
        min: 0,	
		    max: 100,
        ticks: {
          beginAtZero: true,
          color: "#fff",
          stepSize: 20,
          padding: 10,
        },
      },
    x: 
      {
        display: false,
        ticks: {
          color: "#fff",
          padding: 5,
        },
      },
    
  },
};
class BasicArea extends Component {
  render() {
    return <Line data={data} options={options} height={150} />;
  }
}

export default BasicArea;
