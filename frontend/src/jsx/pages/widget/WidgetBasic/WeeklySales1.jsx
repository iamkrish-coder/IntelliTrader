import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class WeeklySales1 extends Component {
  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales Stats",
          backgroundColor: "#7fe5cb",
          borderColor: "#00cd97",
          pointBackgroundColor: "#00cd97",
          pointBorderColor: "#00cd97",
          pointHoverBackgroundColor: "#00cd97",
          pointHoverBorderColor: "#00cd97",
		      fill:true,
          data: [0, 18, 14, 20, 16, 26],
        },
      ],
    };

    const options = {
      plugins:{
		  title: {
			display: !1,
		  },
		  tooltip: {
			intersect: !1,
			mode: "nearest",
			xPadding: 5,
			yPadding: 5,
			caretPadding: 5,
		  },
		  legend: {
			display: !1,
		  },
		  responsive: !0,
		  hover: {
			mode: "index",
		  },
	  },
      maintainAspectRatio: !1,
      
      scales: {
        x: 
          {
            display: !1,
            gridLines: !1,
            scaleLabel: {
              display: !0,
              labelString: "Month",
            },
            ticks: {
              max: 30,
              min: 0,
            },
          },
        
        y :
          {
            display: !1,
            gridLines: !1,
            scaleLabel: {
              display: !0,
              labelString: "Value",
            },
            ticks: {
              beginAtZero: !0,
            },
          },
        
      },
      elements: {
        line: {
          tension: 0.15,
        },
        point: {
          radius: 2,
          borderWidth: 1,
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    };

    return (
		<div style={{ height: 290 }}>
			<Line data={data} options={options} height={290} />
		</div>
    );
  }
}

export default WeeklySales1;
