import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ChartwidgetCanvas4 extends Component {
	render() {
	 
    const data = {
		defaultFontFamily: 'Poppins',
		 labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets: [{
            label: 'Expense',
            backgroundColor: '#fff',
            hoverBackgroundColor: '#eee', 
            barPercentage: 0.2, 
            data: [
                '20',
                '14',
                '18',
                '25',
                '27',
                '22',
                '12', 
                '24', 
                '20', 
                '14', 
                '18', 
                '16'
            ]
        }, {
            label: 'Earning',
            backgroundColor: 'rgba(255,255,255,0.1)',
            hoverBackgroundColor: 'rgba(255,255,255,0.15)', 
            barPercentage: 0.2, 
            data: [
                '12',
                '18',
                '14',
                '7',
                '5',
                '10',
                '20', 
                '8', 
                '12', 
                '18', 
                '14', 
                '16'
            ]
        }]
    };

    const options = {
      plugins: {        
        legend: {
          display: false
        }, 
      },
		title: {
			display: false
		},
		tooltips: {
			mode: 'index',
			intersect: false
		},
		responsive: true,
		maintainAspectRatio: false, 
		scales: {
			x: {
				display: false, 
				stacked: true,
				
				ticks: {
					display: false
				}, 
				grid: {
					display: false, 
					drawBorder: false
				}
			},
			y: {
				display: false, 
				stacked: true, 
				grid: {
					display: false, 
					drawBorder: false
				}, 
				ticks: {
					display: false
				}
			}
		}
      
    };

    return (
      <div >
        <Bar
          data={data}
         // width={this.props.width ? this.props.width : 433}
          height={this.props.height ? this.props.height : 270}
          options={options}
        />
      </div>
    );
  }
}

export default ChartwidgetCanvas4;
