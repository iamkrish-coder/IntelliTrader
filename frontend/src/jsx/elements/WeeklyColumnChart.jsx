import React from 'react';
import ReactApexChart from "react-apexcharts";

const WeeklyColumnChart = () => {
    const  series = [
        {
            name: 'Aplication Sent',
            data: [40, 55, 15, 50, 70, 20, 55]
        }, {
            name: 'Appllication Answered',
            data: [55, 55, 35, 15,  35, 55, 20]
        }, {
            name: 'Hired',
            data: [20, 17, 55, 45, 30, 65, 50]
        }
    ]
    const  options = {
        chart: {
            type: 'bar',
            height: 170,
            stacked: true,
            toolbar: {
                show: false,
            }                  
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                
                endingShape: "rounded",
                startingShape: "rounded",
                backgroundRadius: 10,
                colors: {
                    backgroundBarColors: ['#ECECEC', '#ECECEC', '#ECECEC', '#ECECEC', '#ECECEC', '#ECECEC', '#ECECEC'],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 10,
                },
            },
            
        },
        colors:['#3AB67A', '#FD5353' ,'#FD5353'],
        xaxis: {
            show: true,
            axisBorder: {
                show: false,
            },
            
            labels: {
                style: {
                    colors: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'Poppins',
                    fontWeight: 'light',
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            crosshairs: {
                show: false,
            },
            
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false,
        },
        toolbar: {
            enabled: false,
        },
        dataLabels: {
          enabled: false
        },
        legend: {
            show:false
        },
        fill: {
            opacity: 1
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        
    }
    return (
        <>        
            <div className="col-xl-5 col-md-5">
                <h4 className="card-title mb-0">Weekly Summary</h4>
                <p>Lorem ipsum dolor sit amet</p>
                <div className="d-flex mb-3 align-items-center">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="-3.05176e-05" width="22.2609" height="16" rx="8" fill="#2BC155"/>
                    </svg>
                    <span className="fs-16 text-dark mx-2 font-w600">30%</span>
                    <span className="fs-14">Succesfull Market</span>
                </div>
                <div className="d-flex mb-3 align-items-center">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="-3.05176e-05" width="22.2609" height="16" rx="8" fill="#FD5353"/>
                    </svg>
                    <span className="fs-16 text-dark mx-2 font-w600">46%</span>
                    <span className="fs-14">Appllication Answered</span>
                </div>
                <div className="d-flex align-items-center">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="-3.05176e-05" width="22.2609" height="16" rx="8" fill="#D7D7D7"/>
                    </svg>
                    <span className="fs-16 text-dark mx-2 font-w600">10%</span>
                    <span className="fs-14">Pending</span>
                </div>
            </div>
            <div className="col-xl-7 col-md-7 align-self-center" style={{position: 'relative'}}>
                <div id="columnChart">
                <ReactApexChart
                    options={options}
                    series={series}            
                    type="bar"
                    height={170}                     
                />
                </div>
            </div>
        </>
    );
};

export default WeeklyColumnChart;