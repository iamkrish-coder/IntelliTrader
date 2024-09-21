import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class VisitorActivity extends Component {
  render() {
    var activityData = [
      [35, 18, 25, 35, 40, 20, 30, 25, 22, 20, 45, 35],

      [50, 35, 25, 45, 40, 50, 60, 80, 25, 50, 34, 35],

      [25, 35, 60, 45, 40, 70, 30, 80, 65, 70, 60, 25],

      [25, 88, 25, 50, 70, 70, 60, 70, 50, 60, 50, 70],
    ];
    const data = {
      labels: [ "01", "02", "03", "04","05", "06","07", "08","09","10","11","12",],
      datasets: [
        {
          label: "My First dataset",
          data: activityData[this.props.dataActive],
          borderColor: "rgba(58,122,254, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(58,122,254,1)",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,

      plugins:{
			tooltip: {
				mode: "index",
				intersect: false,
				titleColor: "#888",
				bodyColor: "#555",
				titleFontSize: 12,
				bodyFontSize: 15,
				backgroundColor: "rgba(256,256,256,0.95)",
				displayColors: true,
				xPadding: 10,
				yPadding: 7,
				borderColor: "rgba(220, 220, 220, 0.9)",
				borderWidth: 2,
				caretSize: 6,
				caretPadding: 10,
			},
			legend: {
				display: false,
			}
	  },
      scales: {
        y:
          {
            grid: {
              color: "rgba(89, 59, 219,0.1)",
              drawBorder: true,
            },
            ticks: {
              fontColor: "#999",
            },
          },
        
        x:
          {
            grid: {
              display: false,
              zeroLineColor: "transparent",
            },
            ticks: {
              stepSize: 5,
              fontColor: "#999",
              fontFamily: "Nunito, sans-serif",
            },
          },
        
      },
      
    };

    return (
      <div style={{ minHeight: "290px" }}>
        <Bar
          data={data}
          width={this.props.width ? this.props.width : 433}
          height={this.props.height ? this.props.height : 251}
          options={options}
        />
      </div>
    );
  }
}

export default VisitorActivity;
