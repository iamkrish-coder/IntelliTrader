import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

class DonughtChart extends Component {
  render() {
    const data = {
      weight: 0,
      defaultFontFamily: "Poppins",
      datasets: [
        {
          data: [this.props.value, 100 - this.props.value],
          borderWidth: 0,
          backgroundColor: [
            this.props.backgroundColor,
            this.props.backgroundColor2,
          ],
        },
      ],
    };

    const options = {
		plugins:{		  
		  responsive: false,
		   tooltips: { enabled: false },
		},
		cutout: '80%',
      	maintainAspectRatio: true,
     
      hover: { mode: null },
    };
    return (
      <div className="donught-chart" style={{ marginTop: "-10px" }}>
        <Doughnut data={data} options={options} height={110} width={110} />
      </div>
    );
  }
}

export default DonughtChart;