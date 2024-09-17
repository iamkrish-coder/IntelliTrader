import React from 'react';
import ReactApexChart from "react-apexcharts";

const SoldLineChart = (props) => {
    const  series = [
        {
            name: "Desktops",
            data: props.data
        }
    ]
    const  options = {
        chart: {
            height: 110,         
            width : props.chartwidth,   
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
            curve: 'smooth'
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
            enabled:false,
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
            width = {props.chartwidth}

        />
    );
};

export default SoldLineChart;
