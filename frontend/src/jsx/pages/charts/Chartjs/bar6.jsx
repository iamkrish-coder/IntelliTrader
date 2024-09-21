import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart6 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Blue",
          backgroundColor: "rgba(77,68,181,1)",
          hoverBackgroundColor: "rgba(77,68,181, 0.5)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Glacier",
          backgroundColor: "rgba(106,115,250, 1)",
          hoverBackgroundColor: "rgba(106,115,250, 1)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Pink",
          backgroundColor: "rgba(235, 98, 208, 1)",
          hoverBackgroundColor: "rgba(235, 98, 208, 1)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
      ],
    };
    const options = {
      plugins:{
		  legend: {
			  display: false,
		  },
		  title: {
			  display: false,
		  },
		  tooltips: {
			  mode: "index",
			  intersect: false,
		  },
		  responsive: true,
	  },
      scales: {
        x:
          {
            display: false,
            stacked: true,
            ticks:{
              color: "#fff",
            },
          },
        y:
          {
            display: false,
            stacked: true,
            ticks:{
              color: "#fff",
            },
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

export default BarChart6;
