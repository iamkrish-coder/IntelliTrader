import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Yoga",
          data: [65, 65, 65, 120, 120, 80, 120, 100, 100, 120, 120, 120],
        },
        {
          name: "Cycling",
          data: [50, 100, 35, 35, 0, 0, 80, 20, 40, 40, 40, 40],
        },
        {
          name: "Running",
          data: [20, 40, 20, 80, 40, 40, 20, 60, 60, 20, 110, 60],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
		grid:{
			 borderColor: '#ffffff1a',
		},
        stroke: {
          width: [4, 4, 4],
          colors: ["#e23428", "var(--primary)", "#FF9432"],
          curve: "straight",
        },
        legend: {
          show: false,
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
        colors: ["#e23428", "var(--primary)", "#FF9432"],

        markers: {
          size: [8, 8, 6],
          strokeWidth: [0, 0, 4],
          strokeColors: ["#e23428", "var(--primary)", "#FF9432"],
          border: 0,
          colors: ["#e23428", "var(--primary)", "#fff"],
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
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default ApexLine4;
