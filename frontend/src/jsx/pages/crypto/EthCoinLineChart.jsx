import React from 'react';
import ReactApexChart from "react-apexcharts";

const EthCoinLineChart = () => {
    const  series = [
        {
            name: "Desktops",
            data: [10, 45, 95, 51, 49, 100]
        }
    ]
    const  options = {
        chart: {
            height: 110,
			type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }              
        },        
        legend: {
            show: false
        },
        dataLabels: {
          enabled: false
        },
        colors:['var(--primary)'],
        stroke: {
          curve: 'smooth',
          width:'3'
        },
        fill: {
          opacity: 9,
          colors:'#b292ff'
        },
        grid: {
            show:false,
            borderColor: '#eee',
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        yaxis: {
            show: false
        },
        xaxis: {
            labels: {
                  show: false,
              },
              axisBorder: {
                  show: false,
              },
              axisTicks: {
                  show: false
              },
              crosshairs: {
                  show: false,
                  position: 'front',
                  stroke: {
                      width: 1,
                      dashArray: 3
                  }
              },
          },
        tooltip: {
            show:false,
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function(val) {
                    return "$" + val + " thousands"
                }
            }
        }	
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            type="line"
            height={110}                     
        />
    );
};

export default EthCoinLineChart;