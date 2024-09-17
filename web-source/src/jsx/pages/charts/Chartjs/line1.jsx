import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

import 'chart.js/auto'


class LineChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [25, 20, 50, 41, 55, 45, 70],
          borderColor: "rgba(106,115,250,1)",
          borderWidth: this.props.borderWidth ? this.props.borderWidth : "2",
          //pointBackgroundColor: "rgba(64, 24, 157, 1)",
          backgroundColor: "rgba(106,115,250, 0)",
		      tension:0.4
        },
      ],
    };

    const options = {
      plugins:{		  
		  legend: {
			 display:false
		  }
	  },
      scales: {
        y:         
          {
            display: false,
            min: 0,	
			      max: 100,
            ticks: {
              beginAtZero: true,    
              padding: 0,
			        color: "#fff",
            },
          },
        
        x: 
          {
            display: false,
            ticks: {
              padding: 0,
			        color: "#fff",
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };
    return (
      <>
        <Line
          data={data}
          options={options}
          height={this.props.height ? this.props.height : 150}
        />
      </>
    );
  }

}

export default LineChart1;
