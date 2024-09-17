import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class TopProducts2 extends Component {
  render() {
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales Stats",
          backgroundColor: "#fe5468",
          borderColor: "#fe5468",
          pointBackgroundColor: "#fe5468",
          pointBorderColor: "#fe5468",
          pointHoverBackgroundColor: "#fe5468",
          pointHoverBorderColor: "#fe5468",
          borderWidth: 0,
		      fill:true,
          data: [20, 10, 18, 10, 32, 15, 15, 22, 18, 6, 12, 13],
        },
      ],
    };

    const options = {
      plugins:{
		  title: {
			display: !1,
		  },
		  tooltips: {
			intersect: !1,
			mode: "nearest",
			xPadding: 10,
			yPadding: 10,
			caretPadding: 10,
		  },
		  legend: {
			display: !1,
		  }
	  },
      responsive: !0,
      maintainAspectRatio: !1,
      hover: {
        mode: "index",
      },
      scales: {
        x: 
          {
            display: !1,
            gridLines: !1,
            scaleLabel: {
              display: !0,
              labelString: "Month",
            },
          },
        
        y: 
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
          tension: 0.7,
        },
        point: {
          radius: 0,
          borderWidth: 0,
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 0,
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

export default TopProducts2;
