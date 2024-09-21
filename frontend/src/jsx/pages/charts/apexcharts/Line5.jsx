import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Recovered Patient",
          data: [500, 230, 600, 360, 700, 890, 750, 420, 600, 300, 420, 220],
        },
        {
          name: "New Patient",
          data: [250, 380, 200, 300, 200, 520, 380, 770, 250, 520, 300, 900],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
		  
        },
        stroke: {
          width: [2, 2],
          colors: ["var(--primary)", "#709fba"],
          curve: "straight",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
			labels: {
				colors: "#787878",
			},          
        },
        markers: {
          size: 6,
          border: 0,
		   //strokeColor: "#fff",
          colors: ["var(--primary)", "#709fba"],
          hover: {
            size: 6,
          },
        },
		
        xaxis: {
			axisBorder: {
			   show: false,
			},
		    axisTicks: {
				show: false,
			},
			categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul",
				"Aug","Sep","Oct","Nov","Dec","10 Jan","11 Jan","12 Jan",
			],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#3e4954",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        fill: {
          colors: ["#1c9ef9", "#709fba"],
          type: "solid",
          opacity: 0.07,
        },
        grid:{
			borderColor: '#ffffff1a',
		},
      },
    };
  }

  render() {
    return (
      <div id="chart" className="line-chart-style bar-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

export default ApexLine5;
