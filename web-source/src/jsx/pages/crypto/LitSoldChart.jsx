import React from 'react';
import ReactApexChart from "react-apexcharts";

const LitSoldChart = () => {
    const  series = [
        {
            name: "New Clients",
            data: [55, 40, 60, 80,100, 60, 40, 20]
        }
    ]
    const  options = {
        chart: {
            height: 110,
			width: 150,
			type: 'bar',
            stacked: true,
			toolbar: {
			  show: false
			},
			sparkline: {
			  //enabled: true
			},
			offsetX:0,          
        },       
        plotOptions: {
			bar: {
			    columnWidth: "28%",
			    endingShape: "rounded",
			    startingShape: "rounded",
			    borderRadius: 4,			  
			    colors: {
				    backgroundBarColors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff','#ffffff','#ffffff'],
				    backgroundBarOpacity: 1,
				    backgroundBarRadius: 5,
			    },
	
			},
			distributed: false
		}, 
        colors:['#F79F19','#ffff','#FF4646','#ffff','#FF4646','#ffff'],
		grid: {
			show: false,
			padding: {
                left: -6,
                right: 0,
                top: -10,
                bottom: 0,
			}
		},
        legend: {
			show: false
		  },
		  fill: {
			opacity: 1
		  },
		  dataLabels: {
			enabled: false,
			colors: ['#000'],
			dropShadow: {
			  enabled: true,
			  top: 1,
			  left: 1,
			  blur: 1,
			  opacity: 1
			}
		  },
		  xaxis: {
		   labels: {
			show: false,
				style: {
				colors: '#666666',
				fontSize: '14px',
				fontFamily: 'poppins',
				fontWeight: 500,
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
				borderType: 'solid',
				color: '#78909C',
				height: 5,
				offsetX: 0,
				offsetY: 0
			},
		},
		stroke:{
		    color:'green',
		    show: true, 
		    curve: 'smooth',
		    lineCap: 'round',
		   width: 0,
		},
		yaxis: {
			show: false
		},
        tooltip: {
			x: {
			  show: true
			}
		}
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            type="bar"
            height={110}			
        />
    );
};

export default LitSoldChart;
