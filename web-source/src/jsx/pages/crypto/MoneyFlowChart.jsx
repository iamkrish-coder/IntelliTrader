import React from 'react';
import ReactApexChart from "react-apexcharts";

const MoneyFlowChart = () => {
    const  series = [
        {
			name: "Income",
			data: [66, 85, 50, 105, 65, 74, 70, 105, 100, 125, 85, 110],
			type: 'bar',
		},
        {
        name: 'Expenseve',
            data: [65, 20, 40, 55, 80, 90, 59, 86, 120, 165, 115, 120],
            type: 'line',
        },
        {
            name: "Trade",
            data: [20, 65, 85, 38, 55, 25, 25, 165, 75, 64, 70, 75 ],
            type: 'line',
        }
    ]
    const  options = {
        chart: {
            height: 300,
			toolbar: {
				show: false
			},
			dropShadow: {
			  enabled: true,
			  enabledOnSeries: undefined,
			  top: 5,
			  left: 0,
			  blur: 3,
			  color: ['var(--primary)', 'rgba(55 ,54 ,175, 0.2)', "rgba(255,255,255,0)"],
			  opacity: 0.5
			},              
        },
        // plotOptions: {
        //     bar: {
        //         horizontal: false,
		// 		columnWidth: '50%',
		// 		endingShape: 'rounded'
        //     },
            
        // },
        grid: {
            show: true,
            borderColor: 'rgba(55, 54, 175, 0.1)',
            strokeDashArray: 4,
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: [0, 2.5, 2.5],
            curve: "smooth",
        },
        legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'center',
			fontWeight: 600,
			fontSize: '11px',
			  tooltipHoverFormatter: function (val, opts) {
				return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
			},
			labels: {
				colors: 'var(--text)',
			},
			markers: {
                width: 8,
                height: 8,
                strokeWidth: 0,
                radius: 12,
                offsetX: 0,
                offsetY: 0
			},
		},
        colors: ["rgba(55, 54, 175, 0.075)","rgba(55, 54, 175, 0.95)", "var(--secondary)", ],
        fill: {
            type: ['solid', 'gradient', 'gradient'],
            gradient: {
              gradientToColors: ["transparent", 'var(--primary)', 'var(--secondary)']
            },
        },
        yaxis: {
            title: {
                style: {
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'poppins, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0) + "";
                },
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        xaxis: {
            type: 'day',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: true,
                color: 'var(--border)',
                offsetX: 0,
                offsetY: 0,
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: 'rgba(119, 119, 142, 0.05)',
                width: 6,
                offsetX: 0,
                offsetY: 0
            },
            labels: {
              rotate: -90,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        
    }
    return (  
        <ReactApexChart
            options={options}
            series={series}            
            // type="bar"
            height={300}                     
        />
    );
};

export default MoneyFlowChart;