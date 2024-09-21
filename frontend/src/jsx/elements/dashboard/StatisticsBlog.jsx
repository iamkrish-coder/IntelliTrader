import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav, Tab } from "react-bootstrap";

const cryptoTab =[
    {title:'Ripple', type:'coin1'},
    {title:'Bitcoin', type:'coin2'},
    {title:'Ethereum', type:'coin3'},
    {title:'Zcash', type:'coin4'},
    {title:'LiteCoin', type:'coin5'},
]

const StatisticsBlog  = () => {  
    const earningRef = useRef();  
    const  series = [
        {
            name: '1 ETH',
            className: 'bg-primary',
            data: [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000]
        }, {
            name: '1 XRP',
            className: 'bg-secondary',
            data: [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000]
        }
    ]
    const  options = {
        chart: {
            height: 300,
            type: 'line',
            toolbar: {
            show: false
            }                   
        },
        colors: ["var(--primary)", "var(--secondary)"],
        dataLabels: {
            enabled: false,
        },

        stroke: {
            curve: 'smooth',
            width: 6
        },
        legend: {
            show: false,

        },
        markers: {
            strokeWidth: 5,
            strokeColors: '#fff',
            hover: {
            size: 10,
            },
        },
        grid: {
            show: true,
            strokeDashArray: 6,
            borderColor: 'var(--border)',
            xaxis: {
            lines: {
                show: true
            },
            },
            yaxis: {
            lines: {
                show: false
            },
            },
        },
        yaxis: {
            show: false,
            labels: {
            style: {
                colors: 'var(--text)',
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 400

            },
            formatter: function (value) {
                return value + "USD";
            }
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
            labels: {
                style: {
                    colors: '#B5B5C3',
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                    fontWeight: 400
                },
            },
            axisBorder: {
            show: false,
            },
            tooltip: {
            enabled: false,
            }
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return '<div className="tooltip_box">' +
                '<div className="tooltip-data">' +
                '<span className="data-point ' + w.config.series[0].className + '">' + w.config.series[0].name + ' </span>' +
                '<span>' + series[0][dataPointIndex] + ' USD</span>' +
                '</div>' +
                '<div className="tooltip-data">' +
                '<span className="data-point ' + w.config.series[1].className + '">' + w.config.series[1].name + ' </span>' +
                '<span>' + series[1][dataPointIndex] + ' USD</span>' +
                '</div>' +
                '</div>'
            }
        },
        fill: {
            type: 'solid',
            opacity: 0
        },
        
    }
	const dataSeries = (seriesType) =>{   
		var columnData = [];	
		var columdata2 = [];	

		switch(seriesType) {
			case "coin1":
				columnData = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000];
                columdata2 = [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000]
				break;
			case "coin2":
				columnData = [25000, 10000, 15000, 10000, 6000, 7000, 6000, 5000, 10000, 4000];
                columdata2 = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000]
				break;
			case "coin3":
				columnData = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000];
                columdata2 = [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000]
				break;
			case "coin4":
				columnData = [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000];
                columdata2 = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000]
				break;
			case "coin5":
				columnData = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000];
                columdata2 = [3000, 10000, 2000, 3000, 4000, 5000, 6000, 100, 8000, 2000]
				break;
			default:
				columnData = [10000, 25000, 15000, 5000, 8000, 7000, 6000, 5000, 10000, 4000];
                columdata2 = [7000, 15000, 8000, 3000, 4000, 5000, 1000, 500, 8000, 2000]
		}
        earningRef.current.chart.ctx.updateSeries([
            {
                name: "1 ETH",
                data: columnData
            },
            {
                name: "1 XRP",
                data: columdata2
            }
        ]);
	}
    return (	
        <>
            <div className="card-body pt-2">
                <Tab.Container defaultActiveKey="Ripple">                
                    <Nav as="ul" className="nav nav-pills">
                        {cryptoTab.map((item, ind)=>(
                            <Nav.Item as="li" className="nav-item" key={ind}>
                                <Nav.Link  eventKey={item.title}
                                    onClick={()=>dataSeries(item.type)}
                                >
                                    {item.title}
                                </Nav.Link>
                            </Nav.Item>
                        ))}                       
                    </Nav>
                    <div id="marketChart">
                        <ReactApexChart
                            options={options}
                            series={series}
                            ref={earningRef}
                            type="line"
                            height={300}                     
                        />	
                    </div>
                </Tab.Container>
            </div>
        </>		
        		
    );

}

export default StatisticsBlog;