import React from 'react';
import { Col, Row, Nav, Tab , Dropdown} from 'react-bootstrap';

import { IMAGES } from '../../constant/theme';

import ActivityTab from './ActivityTab';

import TotalStudent from "./WidgetBasic/TotalStudent";
import NewStudent from "./WidgetBasic/NewStudent";
import TotalCourse from "./WidgetBasic/TotalCourse";
import FeeCollection from "./WidgetBasic/FeeCollection";
import VisitorActivity from "./WidgetBasic/VisitorActivity";
import ActiveUser from "./WidgetBasic/ActiveUser";
import BloodPressur from './WidgetBasic/BloodPressure';
import HeartRate from "./WidgetBasic/HeartRate";
import Clolesterol from "./WidgetBasic/Clolesterol";
import GlucoseRate from "./WidgetBasic/GlucoseRate";

import PowerBar from './WidgetBasic/PowerBar';
import PowerLine from './WidgetBasic/PowerLine';
import ViewProject from './WidgetBasic/ViewProject';
import LifeTimeEarning from './WidgetBasic/LifeTimeEarning';
import Widget1 from './WidgetBasic/Widget1';
import Widget2 from './WidgetBasic/Widget2';
import MarketNow from './WidgetBasic/MarketNow';
import SalesAnalysis from './WidgetBasic/SalesAnalysis';
import TopProducts1 from './WidgetBasic/TopProducts1';
import TopProducts2 from './WidgetBasic/TopProducts2';
import WeeklySales1 from './WidgetBasic/WeeklySales1';
import AllSell1 from './WidgetBasic/AllSell1';
import AllSell2 from './WidgetBasic/AllSell2';
import WeeklySales2 from './WidgetBasic/WeeklySales2';





const TtitleCode  = (props) =>{
    return(
        <div className={`card-header border-0 ${props.design}`}>
            <h3 className="card-title text-white">{props.title}</h3>
            <h5 className="text-white mb-0">
                <i className="fa fa-caret-up"/> {props.number}
            </h5>
        </div>
    )
}

const listData = [
    {title:"Top Active Pages", user:"Active Users"},
    {title:"/bootstrap-themes/", user:"3"},
    {title:"/tags/html5/", user:"3"},
    {title:"/100-best-themes...all-time/", user:"1"},
];

const chartBlog = [
    {charts: <BloodPressur />, title:"Blood pressure", number:"120/89" , unit:"mmHG", color:"primary"},
    {charts: <HeartRate />, title:"Heart Rate", number:"107" , unit:"Per Min", color:"danger"},
    {charts: <Clolesterol />, title:"Glucose Rate", number:"97" , unit:"mg/dl", color:"success"},
    {charts: <GlucoseRate />, title:"Clolesterol", number:"124" , unit:"mg/dl", color:"info" }
];

const salesBlog = [
    { percent:"87%", title:"Grow", color:"primary"},
    { percent:"72%", title:"Grow", color:"success"},
    { percent:"50%", title:"Grow", color:"info"},
    { percent:"77%", title:"Grow", color:"warning"},
];

function DropdownBlog() {
    return(
        <Dropdown>
            <Dropdown.Toggle variant="" className=" btn btn-primary light sharp i-false p-0 sharp">
                <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" strokeWidth="1" fill="none"  fillRule="evenodd">
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" cx="5" cy="12" r="2" />
                        <circle fill="#000000" cx="12" cy="12" r="2" />
                        <circle fill="#000000" cx="19" cy="12" r="2" />
                    </g>
                </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item to="/widget-basic">Edit</Dropdown.Item>
                <Dropdown.Item to="/widget-basic">Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
const Notification = ({name, image}) =>{
    return(        
        <div className="timeline-panel">
            <div className="media me-2">
                <img alt="image" width="50" src={image} />
            </div>
            <div className="media-body">
                <h5 className="mb-1">{name}</h5>
                <small className="d-block">29 July 2020 - 02:26 PM</small>
            </div>            
            <DropdownBlog />
        </div>        
    )
}

const notificationBlog = [
    {name:"Dr sultads Send you Photo", image:IMAGES.Avatar4 },
    {name:"Resport created successfully", image:IMAGES.Avatar2 },
    {name:"Reminder : Treatment Time!", image:IMAGES.Avatar3 },
];

const WidgetChart = () => {
    return (
        <>           
            <Row>
                <Col xl={12} lg={12} sm={12} >
                    <div className="row">
                        <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                            <div className="widget-stat card bg-primary">
                                <TtitleCode title="Total Students"  number="422" design="pb-0" />                                
                                <div className="card-body text-center">
                                    <div className="ico-sparkline">                                    
                                        <TotalStudent />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                            <div className="widget-stat card bg-warning overflow-hidden">
                                <TtitleCode title="New Students"  number="357"  />                                
                                <div className="card-body text-center p-0">
                                    <div className="ico-sparkline">
                                        <NewStudent />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                            <div className="widget-stat card bg-secondary overflow-hidden">
                                <TtitleCode title="Total Course"  number="547" design="pb-3 pb-0" />                               
                                <div className="card-body p-0">
                                    <div className="px-4">
                                        <TotalCourse />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                            <div className="widget-stat card bg-danger overflow-hidden">
                                <TtitleCode title="Fees Collection"  number="3280$" design="pb-3 pb-0" />                                
                                <div className="card-body p-0">
                                    <FeeCollection / >
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={8} xxl={8} lg={12} sm={12}>
                    <div id="user-activity" className="card">
                        <Tab.Container defaultActiveKey="day">
                            <div className="card-header border-0 pb-0 d-sm-flex d-block">
                                <h4 className="card-title">Visitor Activity</h4>
                                <div className="card-action mb-sm-0 my-2">
                                    <Nav className="nav nav-tabs">
                                        <Nav.Item className="nav-item">
                                            <Nav.Link className="nav-link " eventKey="day">Day</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="nav-item">
                                            <Nav.Link className="nav-link" eventKey="month">Month</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className="nav-item">
                                            <Nav.Link className="nav-link" eventKey="year">Year</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>

                            <div className="card-body">
                                <Tab.Content className="tab-content" id="myTabContent">
                                    <Tab.Pane eventKey="day">
                                        <VisitorActivity dataActive={0} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="month">
                                        <VisitorActivity dataActive={1} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="year">
                                        <VisitorActivity dataActive={2} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                    </div>
                </Col>
                <Col xl={4} lg={12} sm={12}>
                    <div className="card active_users">
                        <div className="card-header bg-primary border-0 pb-0">
                            <h4 className="card-title text-white">Active Users</h4>
                            <span id="counter"></span>
                        </div>
                        <div className="bg-primary">
                            <ActiveUser />
                        </div>
                        <div className="card-body pt-0">
                            <div className="list-group-flush mt-4">
                                {listData.map((item, ind)=>(
                                    <div className="list-group-item bg-transparent d-flex justify-content-between border-0 px-0 py-1 border-bottom" key={ind}>
                                        <p className="mb-0">{item.title}</p>
                                        <p className="mb-0">{item.user}</p>
                                    </div>
                                ))}                               
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={8} lg={12} xxl={8} sm={12}>
                    <Row>
                        {chartBlog.map((item, index)=>(
                            <Col xl={6} lg={6} xxl={6} md={6} key={index}>
                                <div className="card">
                                    <div className="card-header border-0 pb-0">
                                        <div className="clearfix">
                                            <h3 className="card-title">{item.title}</h3>
                                            <span>In the normal</span>
                                        </div>
                                        <div className="clearfix text-center">
                                            <h3 className={`mb-0 text-${item.color}`}>{item.number}</h3>
                                            <span>{item.unit}</span>
                                        </div>
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="ico-sparkline">                                            
                                            {item.charts}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        
                    </Row>
                </Col>
                <Col xl={4} lg={12} sm={12}>
                    <div className="card bg-info activity_overview">
                        <div className="card-header  border-0 pb-3 ">
                            <h4 className="card-title text-white">Activity</h4>
                        </div>
                        <ActivityTab />
                    </div>
                </Col>
                <Col xl={6} lg={6} xxl={6} sm={6}>
                    <div className="card bg-primary">
                        <div className="card-body pb-0">
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-white">Power</h5>
                                    <span className="text-white">2017.1.20</span>
                                </div>
                                <div className="col text-end">
                                    <h5 className="text-white"><i className="fa fa-caret-up"></i> 260</h5>
                                    <span className="text-white">+12.5(2.8%)</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <PowerBar />
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={6} xxl={6} sm={6}>
                    <div className="card bg-success overflow-hidden">
                        <div className="card-body pb-0">
                            <div className="row">
                                <div className="col">
                                    <h5 className="text-white">Power</h5>
                                    <span className="text-white">2017.1.20</span>
                                </div>
                                <div className="col text-end">
                                    <h5 className="text-white"><i className="fa fa-caret-up"></i> 260</h5>
                                    <span className="text-white">+12.5(2.8%)</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <PowerLine />
                        </div>
                    </div>
                </Col>

                <Col xl={6} lg={6} xxl={4} sm={6}>
                    <div className="card">
                        <div className="card-body pb-0">
                            <div className="row">
                                <div className="col">
                                    <h5>3650</h5>
                                    <span>VIEWS OF YOUR PROJECT</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <ViewProject />
                        </div>
                    </div>
                </Col>
                
                <Col xl={6} lg={12} xxl={4} sm={12}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="text-uppercase">74,206 K</h4>
                                    <span>Lifetime earnings</span>
                                </div>
                                <div className="col-auto">
                                    <div className="chart-wrapper height100">
                                        <LifeTimeEarning />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>


                <Col xl={12}  xxl={12} >
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body pb-0">
                                    <div className="row justify-content-between">
                                        <div className="col-auto">
                                            <h5>Lorem Ipsum</h5>
                                        </div>
                                        <div className="col-auto">
                                            <h5>
                                                <span><i className="fa fa-caret-up"></i></span>
                                                <span>2,250</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-wrapper">
                                    <Widget1 />
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body pb-0">
                                    <div className="row justify-content-between">
                                        <div className="col-auto">
                                            <h5>Lorem Ipsum</h5>
                                        </div>
                                        <div className="col-auto">
                                            <h5>
                                                <span><i className="fa fa-caret-up"></i></span>
                                                <span>2,250</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-wrapper">
                                    <Widget2 />
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                        <div className="col text-center">
                                            <h5 className="fw-normal">1230</h5>
                                            <span>Type A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={6}>
                    <div className="card overflow-hidden">
                        <div className="card-body pb-0">
                            <h4 className="card-title text-uppercase fw-normal">Market Now</h4>
                            <h2 className="fw-normal text-danger">
                                <span><i className="fa fa-caret-up"></i></span>
                                <span>3454664</span>
                            </h2>
                            <div className="row mt-5">                                
                                <div className="col text-center" >
                                    <h5 className="fw-normal">APPL</h5>
                                    <span className="text-success">+ 82.24 %</span>
                                </div>                                
                                <div className="col text-center">
                                    <h5 className="fw-normal">FB</h5>
                                    <span className="text-danger">- 12.24 %</span>
                                </div>
                                <div className="col text-center">
                                    <h5 className="fw-normal">GOOG</h5>
                                    <span className="text-success">+ 42.24 %</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <MarketNow />
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={6}>
                    <div className="card">
                        <div className="card-body pb-0">
                            <h4 className="card-title text-uppercase fw-normal">Sales Analysis</h4>
                            <h2 className="fw-normal text-danger">
                                <span><i className="fa fa-caret-up" /></span>
                                <span>3454664</span>
                            </h2>
                            <div className="row mt-5">
                                <div className="col text-center">
                                    <h5 className="fw-normal">Today</h5>
                                    <span className="text-success">+ 8224</span>
                                </div>
                                <div className="col text-center">
                                    <h5 className="fw-normal">Today</h5>
                                    <span className="text-danger">- 1224</span>
                                </div>
                                <div className="col text-center">
                                    <h5 className="fw-normal">Week</h5>
                                    <span className="text-success">+ 4224</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <SalesAnalysis />
                        </div>
                    </div>    
                </Col>
                <Col xl={6} lg={12}>
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">Top Products</h4> 
                        </div>
                        <div className="card-body pb-0">
                            <div className="widget-media">
                                <ul className="timeline">
                                    <li>
                                        <Notification name="Dr Dixit send you photo" image={IMAGES.Avatar1}/>
                                    </li>
                                    <li>
                                        <div className="timeline-panel">
                                            <div className="media me-2 media-info">
                                                KG
                                            </div>
                                            <div className="media-body">
                                                <h5 className="mb-1">Resport created successfully</h5>
                                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                                            </div>
                                            <DropdownBlog />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="timeline-panel">
                                            <div className="media me-2 media-success">
                                                <i className="fa fa-home"></i>
                                            </div>
                                            <div className="media-body">
                                                <h5 className="mb-1">Reminder : Treatment Time!</h5>
                                                <small className="d-block">29 July 2020 - 02:26 PM</small>
                                            </div>
                                            <DropdownBlog />
                                        </div>
                                    </li>
                                </ul>	
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <TopProducts1 />
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={12}>
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">Top Products</h4>
                        </div>
                        <div className="card-body pb-0">
                            <div className="widget-media">
                                <ul className="timeline">
                                    {notificationBlog.map((data, index)=>(
                                        <li key={index}>
                                           <Notification name={data.name} image={data.image}/>
                                        </li>
                                    ))}                                   
                                </ul>	
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <TopProducts2 />
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={12} xxl={8}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card overflow-hidden">
                                <div className="row no-gutters">
                                    <div className="col-5 p-0">
                                        <div className="card-body">
                                            <h6 className="fw-normal text-uppercase">Weekly sales</h6>
                                            <h4>$ 14000</h4>
                                            <div>
                                                <span className="badge badge-light">60%</span>
                                                <span>Higher</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-7 p-0">
                                        <div className="chart-wrapper">
                                            <WeeklySales1 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5>570</h5>
                                    <p>All Sales</p>
                                </div>
                                <div className="chart-wrapper">
                                    <AllSell1 />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5>570</h5>
                                    <p>All Sales</p>
                                </div>
                                <div className="chart-wrapper">
                                    <AllSell2 />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={6} lg={12} xxl={4}>
                    <div className="card">
                        <div className="chart-wrapper">
                            <WeeklySales2 />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Sales Status</h4>
                            <div className="row">
                                {salesBlog.map((data, ind)=>(
                                    <div className="col-12 mt-3" key={ind}>
                                        <div className="d-flex justify-content-between">
                                            <h6>{data.percent}</h6>
                                            <span>{data.title}</span>
                                        </div>
                                        <div className="progress">
                                            <div className={`progress-bar bg-${data.color}`} style={{width: data.percent}}></div>
                                        </div>
                                    </div>
                                ))}                                
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>
        </>
    );
};

export default WidgetChart;