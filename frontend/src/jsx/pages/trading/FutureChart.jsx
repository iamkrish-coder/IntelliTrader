import React from "react";
import ReactApexChart from "react-apexcharts";

class FutureChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
        series: [{
            name: 'Buy',
            data: [{
              x: '2:00PM',
              y: [9200.00, 9600.00]
            }, {
              x: '2:30PM',
              y: [9300.00, 9600.00]
            }, {
              x: '3:00PM',
              y: [9150.00, 9450.00]
            }, {
              x: '3:30PM',
              y: [9300.00, 9700.00]
            }, {
              x: '4:00PM',
              y: [9200.00, 9600.00]
            }, {
              x: '4:30PM',
              y: [9400.00, 9700.00]
            }, {
              x: '5:00PM',
              y: [9400.00, 9600.00]
            }, {
              x: '5:30PM',
              y: [9300.00, 9600.00]
            }, {
              x: '6:00PM',
              y: [9300.00, 9500.00]
            }, {
              x: '6:30PM',
              y: [9200.00, 9500.00]
            }, {
              x: '7:00PM',
              y: [9450.00, 9650.00]
            }, {
              x: '7:30PM',
              y: [9400.00, 9700.00]
            }, {
              x: '8:00PM',
              y: [9300.00, 9700.00]
            }, {
              x: '8:30PM',
              y: [9400.00, 9600.00]
            }, {
              x: '9:00PM',
              y: [9300.00, 9600.00]
            }, {
              x: '9:30PM',
              y: [9300.00, 9500.00]
            }, {
              x: '10:00PM',
              y: [9200.00, 9500.00]
            }, {
              x: '10:30PM',
              y: [9450.00, 9650.00]
            }, {
              x: '11:00PM',
              y: [9400.00, 9700.00]
            }, {
              x: '11:30PM',
              y: [9300.00, 9700.00]
            }, {
              x: '12:00PM',
              y: [9200.00, 9500.00]
            }, {
              x: '12:30PM',
              y: [9300.00, 9700.00]
            }, {
              x: '1:00AM',
              y: [9400.00, 9600.00]
            }]
        }, {
            name: 'Sell',
            data: [{
              x: '2:00PM',
              y: [9370.00, 9550.00]
            }, {
              x: '2:30PM',
              y: [9350.00, 9700.50]
            }, {
              x: '3:00PM',
              y: [9275.00, 9482.00]
            }, {
              x: '3:30PM',
              y: [9200.00, 9600.00]
            }, {
              x: '4:00PM',
              y: [9250.00, 9500.00]
            }, {
              x: '4:30PM',
              y: [9445.00, 9523.00]
            }, {
              x: '5:00PM',
              y: [9440.00, 9667.00]
            }, {
              x: '5:30PM',
              y: [9300.00, 9600.00]
            }, {
              x: '6:00PM',
              y: [9445.00, 9648.00]
            }, {
              x: '6:30PM',
              y: [9240.00, 9700.00]
            }, {
              x: '7:00PM',
              y: [9130.00, 9550.00]
            }, {
              x: '7:30PM',
              y: [9340.00, 9440.00]
            }, {
              x: '8:00PM',
              y: [9560.00, 9740.00]
            }, {
              x: '8:30PM',
              y: [9440.00, 9667.00]
            }, {
              x: '9:00PM',
              y: [9300.00, 9600.00]
            }, {
              x: '9:30PM',
              y: [9445.00, 9648.00]
            }, {
              x: '10:00PM',
              y: [9240.00, 9700.00]
            }, {
              x: '10:30PM',
              y: [9130.00, 9550.00]
            }, {
              x: '11:00PM',
              y: [9340.00, 9440.00]
            }, {
              x: '11:30PM',
              y: [9560.00, 9740.00]
            }, {
                x: '12:00PM',
                y: [9440.00, 9667.00]
              }, {
                x: '12:30PM',
                y: [9340.00, 9440.00]
              }, {
                x: '1:00AM',
                y: [9240.00, 9700.00]
              }]
        }],
        options: {
            chart: {
                height: 450,
                type: "rangeBar",
                toolbar: {
                    show: false,
                },
            },        
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: "rounded",
                    startingShape: "rounded",                
                },
            },

            colors:['#61C277', '#FF3E3E'],
            dataLabels: {
                enabled: false,
            },
            markers: {
                shape: "circle",
            },
            legend: {
                show: false,
                fontSize: '12px',
                labels: {
                    colors: '#000000',
                },
                markers: {
                    width: 18,
                    height: 18,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,	
                }
            },
            stroke: {
                show: true,
                width: 4,
                colors: ['transparent']
            },
            grid: {
                borderColor: '#eee',
            },
            xaxis: {                
                labels: {
                  offsetY:30,
                    style: {
                        colors: '#787878',
                        fontSize: '12px',
                        fontFamily: 'poppins',
                        fontWeight: 100,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                crosshairs: {
                    show: false,
                }
            
            },
            yaxis: {
                opposite: true,
                labels: {
                    offsetX:0,
                    style: {
                        colors: '#787878',
                        fontSize: '12px',
                        fontFamily: 'poppins',
                        fontWeight: 100,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
            },
            fill: {
                opacity: 1,
                colors:['#61C277', '#FF3E3E'],
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            },
            responsive: [{
                breakpoint: 575,
                options: {
                    plotOptions: {
                        bar: {
                        columnWidth: '40%',
                        
                        },
                    },
                    chart:{
                        height:250,
                    },
                    xaxis: {
                
                        labels: {
                            style: {
                                fontSize: '10px',
                            },
                        },
                    },
                }
            }]
        },
    };
  }

  render() {
    return (
      <div id="chartBarRunning" className="bar-chart">
        <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="rangeBar"
            height={450}
        />
      </div>
    );
  }
}

export default FutureChart;
