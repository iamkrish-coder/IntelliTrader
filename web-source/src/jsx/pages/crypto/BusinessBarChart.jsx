import React from 'react';
import ReactApexChart from "react-apexcharts";

const BusinessBarChart = (props) => {
    const  series = [
        {
            name: 'Business',
            data: [50, 90, 90,50,70,60,50,40],
            //radius: 12,	
        }, 	
    ]
    const  options = {
        chart: {
            type: 'bar',
			height: 100,            
            toolbar: {
                show: false,
            },
                            
        },               
        
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "rounded",
                borderRadius: 3,
            },           
        },
        states: {
            hover: {
              filter: 'none',
            }
        },
        colors:[props.color],
        dataLabels: {
            enabled: false,                  
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
                strokeWidth: 8,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,	
            }
        },
        stroke: {
            show: true,
            width:14,
            curve: 'smooth',
            lineCap: 'round',
            colors: ['transparent']
          },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false,
               }
              },
            yaxis: {
                lines: {
                    show: false
                }
            },  				
        },
        xaxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
            labels: {
                show: false,
                style: {
                    colors: '#A5AAB4',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'poppins',
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            crosshairs: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            }, 			
        },
        
        yaxis: {
            labels: {
            show: false,
                offsetX:-16,
               style: {
                  colors: '#000000',
                  fontSize: '13px',
                   fontFamily: 'poppins',
                  fontWeight: 100,
                  cssClass: 'apexcharts-xaxis-label',
              },
          },
        },
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            type="bar"
            height={100}                     
        />
    );
};

export default BusinessBarChart;