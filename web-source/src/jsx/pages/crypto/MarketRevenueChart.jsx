import React from 'react';
import ReactApexChart from "react-apexcharts";

const MarketRevenueChart = () => {
    const  series = [
        {
            name: 'Net Profit',
            data: [20, 60, 20, 30, 50, 40, 60,],            
        }, 	
    ]
    const  options = {
        chart: {
            type: 'area',
            width:'100%',
            height: 350,
            toolbar: {
                show: false,
            },                
        },
        plotOptions: {
            bar: {
                horizontal: false,
				columnWidth: '50%',
				endingShape: 'rounded'
            },
            
        },
        colors:['#3AB67A', '#FD5353' ,'#FD5353'],
        dataLabels: {
            formatter: function (val) {
                return val + "$";
            },
            enabled: true,
            offsetY: -10,
            style: {
                fontSize: '12px',
               colors: ["var(--text-dark)"]
            },
            background: {
                enabled: false,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: 'var(--text-dark)',
                    opacity: 0.45
                }
            },
        },       

        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 5,
            curve:'smooth',
            colors:['var(--primary)'],
        },
        
        grid: {
            borderColor: 'var(--border)',
            show: true,
            xaxis: {
                lines: {
                    show: true,
                }
            },  
            yaxis: {
                lines: {
                    show: true,
                }
            }, 			
        },
        markers: {
            size: [8,0],
            strokeWidth: [4,0],
            strokeColors: ['var(--card)'],
            border:4,
            radius: 4,
            colors:['var(--secondary)'],
            hover: {
                size: 10,
            }
        },
        xaxis: {				
            categories: ['Jan', 'Fab', 'Mar', 'April', 'May', 'Jun', 'July'],
            labels: {
                style: {
                    colors: 'var(--text)',
                    fontSize: '13px',
                    fontFamily: 'Poppins',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label',
              } ,
            },
            crosshairs: {
                show: false,
            }
        },
        yaxis: {
            show:true,	
            labels: {
                offsetX: -15,
                style: {
                    colors: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'Poppins',
                    fontWeight: 100,                
              },
                formatter: function (y) {
                    return y.toFixed(0) + "k";
                }
            },
        },
        fill: {
           opacity: 9,
            colors:'#b292ff'
        },
          
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " hundred"
                }
            }
        }
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            type="area"
            height={350}                     
        />
    );
};

export default MarketRevenueChart;