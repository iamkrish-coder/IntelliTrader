import React from "react";
import ReactApexChart from "react-apexcharts";

class SwiperLineChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [
                {
                  name: 'Net Profit',
                  data: [200, 310, 50, 250, 50, 300, 100, 200, 100, 400],                  
                },
            ],
			options: {
				chart: {
					type: 'line',
                    height: 70,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    },
                    sparkline: {
                        enabled: true
                    }                    
				},
                dataLabels: {
                    enabled: false,
                },
          
                legend: {
                    show: false,
                },
                stroke: {
                    show: true,
                    width: 6,
                    curve: 'smooth',
                    colors: [this.props.chartcolor],
                },
                grid: {
                    show: false,
                    borderColor: '#eee',
                    padding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: -1
          
                    }
                },
                states: {
                    normal: {
                      filter: {
                        type: 'none',
                        value: 0
                      }
                    },
                    hover: {
                      filter: {
                        type: 'none',
                        value: 0
                      }
                    },
                    active: {
                      allowMultipleDataPointsSelection: false,
                      filter: {
                        type: 'none',
                        value: 0
                      }
                    }
                },
                xaxis: {
                    categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sept', 'Oct'],
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: false,
                        style: {
                            fontSize: '12px',
                        }
                    },
                    crosshairs: {
                        show: false,
                        position: 'front',
                        stroke: {
                            width: 1,
                            dashArray: 3
                        }
                    },
                    tooltip: {
                        enabled: true,
                        formatter: undefined,
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                        }
                    }
                },
                yaxis: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                    style: {
                      fontSize: '12px',
                    },
                    y: {
                      formatter: function (val) {
                        return "$" + val + " thousands"
                      }
                    }
                },				
			},
		};
	}

	render() {
		return (			
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height={70} 
                width={500} 
            />			
		);
	}
}

export default SwiperLineChart;