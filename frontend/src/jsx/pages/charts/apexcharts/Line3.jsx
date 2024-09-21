import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Running",
          data: [20, 40, 20, 80, 40, 40, 20, 60, 60, 20, 110, 60],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },

        stroke: {
          width: [4],
          colors: ["var(--primary)"],
          curve: "straight",
        },
		grid:{
			 borderColor: '#ffffff1a',
		},
        xaxis: {
			axisBorder: {
			   show: false,
			},
		    axisTicks: {
				show: false,
			},
          type: "text",
          categories: [
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
        },
        colors: ["#4D44B5"],
        markers: {
          size: [6],
          strokeWidth: [4],
          strokeColors: ["var(--primary)"],
          border: 0,
          colors: ["#fff"],
          hover: {
            size: 10,
          },
        },
        yaxis: {
          title: {
            text: "",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="bar-chart">
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

export default ApexLine3;
