import React from "react";
import ReactApexChart from "react-apexcharts";

class CurrentGraphDonut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [10, 15, 30, 25, 25 ],
			options: {
				chart: {
					type: 'donut',
					height: 150,                    
				},
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 0,
                },
                colors:['#ED3DD1', '#FFEE54', '#FF5166', '#2BC844', '#3C8AFF'],
                legend: {
                    position: 'bottom',
                    show:false
                },
				// plotOptions: {
				// 	pie: {
				// 	  donut: {
				// 		labels: {
				// 		  show: true,
				// 		  total: {
				// 			showAlways: true,
				// 			show: true
				// 		  }
				// 		}
				// 	  }
				// 	}
				// },
				
				responsive: [					
					{
						breakpoint: 768,
                            options: {
                            chart: {
                                width:200
                                },
                            }
					}
				]
			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={150} 
				/>
			</div>
		);
	}
}

export default CurrentGraphDonut;