import React from 'react';
import ReactApexChart from "react-apexcharts";

const RippleRadialChart = () => {
    const  series = [76]
    const  options = {        
        chart: {
            type: 'radialBar',
            offsetY: -20,
            height:250,
            sparkline: {
                enabled: true
            }              
        },
        
        plotOptions: {
            radialBar: {
                width: '80%',
                // color: "#9568ff",
                background: "var(--primary)",
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "var(--secondary)",                    
                    strokeWidth: '97%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#fff',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                       offsetY: -2,
                        fontSize: '22px',
                        color : "var(--text)"
                    }
                }            
            },
            
        },
        // colors: ['#9568ff'],        
        grid: {
            padding: {
              top: 0
            }
        },
        fill: {
            opacity:1.5,
            type: 'gradient',
            // color:['#9568ff'],
            gradient: {
                gradientToColors: ['#9568ff'],
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 2,
                stops: [0,0, 100],
                inverseColors: false
            },
        },   
             
        labels: [' '],
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            type="radialBar"
            height={250}                     
        />
    );
};

export default RippleRadialChart;