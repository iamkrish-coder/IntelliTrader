import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

const cryptoTab =[
    {title:'Week', type:'week'},
    {title:'Month', type:'month'},
    {title:'Year', type:'yaer'},
]

const MarketBarChart = () => {
    const marketRef = useRef();  
    const  series = [
        {
            name: "New Clients",
            data: [180, 150, 200, 100, 150, 180, 150,170,115,190,140,80,70,90,120,50]
        }
    ]
    const  options = {
        chart: {
            type: "bar",
            height: 300,
            stacked: true,
            toolbar: {
                show: false
            }                   
        },
        plotOptions: {
            bar: {
                columnWidth: "20%",
                endingShape: "rounded",
                startingShape: "rounded",
                borderRadius: 5,              
                colors: {
                    backgroundBarColors: ['#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8','#F8F8F8'],
                    backgroundBarOpacity: 1,
                    backgroundBarRadius: 5,
                },    
            },
            distributed: true
        },
        colors:['#4D4BE0'],
        grid: {
            show:false,
            borderColor:'#F8F8F8'
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
        categories: ['06', '07', '08', '09', '10', '11', '12','13','14','15','16','17','18','19','20','21'],
            labels: {
                style: {
                    colors: 'var(--text)',
                    fontSize: '13px',
                    fontFamily: 'poppins',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            crosshairs: {
                show: false,
            },
            axisBorder: {
            show: false,
            },
        },
        stroke:{
            show: true, 
            curve: 'smooth',
            lineCap: 'round',
            width: 0,
        },
        yaxis: {
            show: true,
            labels: {
                style:{
                    colors: 'var(--text)',
                    fontSize: '13px',
                    fontFamily: 'poppins',
                    fontWeight: 100,
                },
            },
        },
        
        tooltip: {
            x: {
                show: true
            }
        }
        
    }
	const dataSeries = (seriesType) =>{   
		var columnData = [];			

		switch(seriesType) {
			case "week":
				columnData = [40, 150, 250, 150, 150, 170, 180,170,115,190,140,80,70,90,120,50];                
				break;
			case "month":
				columnData = [150,170,115,190,140,80,70,90,120,50,180, 150, 200, 100, 150, 180];                
				break;
			case "year":
				columnData = [50, 150, 250, 150, 150, 170, 180,170,115,190,140,80,70,90,120,50];                
				break;
			
			default:
				columnData = [180, 150, 200, 100, 150, 180, 150,170,115,190,140,80,70,90,120,50];                
		}
        marketRef.current.chart.ctx.updateSeries([
            {
                name: "New Clients",
                data: columnData
            },           
        ]);
	}
    return (
        <>
            <Tab.Container defaultActiveKey="Week">
                <div className="bar-chart d-flex justify-content-between flex-wrap align-items-baseline">
                    <div>
                        <div className="d-flex align-items-center">
                            <h3 className="font-w600">$22,562.14</h3>
                            <span className="fs-22 font-w400 d-block ms-2 text-success">7%<i className="fa-solid fa-caret-up"></i></span>
                        </div>
                        <p className="fs-14 text-dark">Last Week <span className="text-success">$563,443</span></p>
                    </div>	
                    <div className="d-flex justify-content-between align-items-center">
                        <Nav as="ul" className="nav nav-pills me-4" >
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
                        <Link to={"#"} className="btn btn-primary btn-sm">
                            <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 22.5C24 23.3284 23.3284 24 22.5 24H1.5C0.671578 24 0 23.3284 0 22.5C0 21.6716 0.671578 21 1.5 21H22.5C23.3284 21 24 21.6716 24 22.5ZM10.9394 17.7482C11.2323 18.0411 11.6161 18.1875 12 18.1875C12.3838 18.1875 12.7678 18.0411 13.0606 17.7482L18.3752 12.4336C18.961 11.8478 18.961 10.8981 18.3752 10.3123C17.7894 9.72652 16.8397 9.72652 16.2539 10.3123L13.5 13.0662V1.5C13.5 0.671578 12.8284 0 12 0C11.1716 0 10.5 0.671578 10.5 1.5V13.0662L7.74609 10.3123C7.1603 9.72652 6.21056 9.72652 5.62477 10.3123C5.03897 10.8981 5.03897 11.8478 5.62477 12.4336L10.9394 17.7482Z" fill="#ffff"/>
                            </svg>
                            Get Report
                        </Link>
                    </div>	
                </div>
                <div id="barChart">
                    <ReactApexChart
                        options={options}
                        series={series}
                        ref={marketRef}
                        type="bar"
                        height={300}                     
                    />
                </div>
            </Tab.Container>
        </>
    );
};

export default MarketBarChart;