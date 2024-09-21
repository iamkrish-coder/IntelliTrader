import React from 'react';
import {Link} from 'react-router-dom';
import { Row,Col,Card } from 'react-bootstrap';

import DefaultCard, { BgCard, SocialCard } from './DefaultCard';
import { IMAGES, SVGICON } from '../../constant/theme';
import ActivityTab from './ActivityTab';

const cardBlog = [
    {title:"Patient", number:'3280', icon:SVGICON.PatientUser, percent:'+3.5%', color:"primary"},
    {title:"Bills", number:'2570', icon:SVGICON.BillsSvg, percent:'+1.5%', color:"warning"},
    {title:"Revenue", number:'364.50K', icon:SVGICON.DollerIconSvg, percent:'-8.5%', color:"danger"},
    {title:"Employe", number:'850', icon:SVGICON.GroupCoin, percent:'+7.5%', color:"success"},
];
const bgCarddBlog = [
    {title:"Total Students", number:'3180', icon: <i className="la la-users" />, percent:'80%', color:"primary"},
    {title:"Total Teacher", number:'360', icon:<i className="la la-user" />, percent:'50%', color:"warning"},
    {title:"Total Course", number:'28', icon:<i className="la la-graduation-cap" />, percent:'60%', color:"secondary"},
    {title:"Fees Collect", number:'390$', icon:<i className="la la-dollar" />, percent:'35%', color:"danger"},
];
const lightCard = [
    {title:"Total Students", number:'2980',  percent:'75%', color:"primary"},
    {title:"New Students", number:'240',  percent:'50%', color:"warning"},
    {title:"Total Course", number:'25',  percent:'60%', color:"danger"},
    {title:"Fees Collect", number:'950$', percent:'40%', color:"success"},
];

const infoList = [
    {title:"Gender", subtitle:"Male"},
    {title:"Education", subtitle:"PHD"},
    {title:"Designation", subtitle:"Sen. Professor"},
    {title:"Operation Done", subtitle:"120"},
];

const Smallheading = ({name, number, color})=>{
    return(
        <div className="col-4 pt-3 pb-3 border-end">
            <h3 className={`mb-1 text-${color}`}>{number}</h3>
            <span>{name}</span>
        </div>
    )
}

const socialData = [
    { icon:"fab fa-facebook-f", color:"facebook", friends:'90', followers:"119"},
    { icon:"fab fa-linkedin-in", color:"linkedin", friends:'85', followers:"125"},
    { icon:"fab fa-google-plus-g", color:"googleplus", friends:'97', followers:"130"},
    { icon:"fab fa-twitter", color:"twitter", friends:'99', followers:"148"},
];

const WidgetCard = () => {
    return (
        <>
           
            <Row>   
                {cardBlog.map((item, index)=>(
                    <Col xl={3} xxl={6} lg={6} sm={6} key={index}>
                        <div className="widget-stat card">
                            <div className="card-body p-4">
                                <DefaultCard  title={item.title} number={item.number} percent={item.percent} icon={item.icon} color={item.color}/>
                            </div>
                        </div>
                    </Col>
                ))}             
                {bgCarddBlog.map((item, index)=>(
                    <Col xl={3} xxl={6} lg={6} sm={6} key={index}>
                        <div className={`widget-stat card bg-${item.color}`}>
                            <div className="card-body  p-4">
                               <BgCard title={item.title} number={item.number} percent={item.percent} color={item.color} icon={item.icon}/>
                            </div>
                        </div>
                    </Col>
                ))}
                {lightCard.map((item, index)=>(
                    <Col xl={3} xxl={6} lg={6} sm={6} key={index}>
                        <div className="widget-stat card">
                            <div className="card-body p-4">
                                <h4 className="card-title">{item.title}</h4>
                                <h3>{item.number}</h3>
                                <div className="progress mb-2">
                                    <div className={`progress-bar progress-animated bg-${item.color}`} style={{width: item.percent}}></div>
                                </div>
                                <small>{item.percent} Increase in 20 Days</small>
                            </div>
                        </div>
                    </Col>
                ))}
                                
                <Col xl={4}  lg={12} sm={12}>
                    <Card>
                        <div className="card-header border-0 pb-0">
                            <h2 className="card-title">about me</h2>
                        </div>
                        <div className="card-body pb-0">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <ul className="list-group list-group-flush">
                                {infoList.map((item, ind)=>(                                    
                                    <li className="list-group-item d-flex px-0 justify-content-between" key={ind}>
                                        <strong>{item.title}</strong>
                                        <span className="mb-0">{item.subtitle}</span>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                        <div className="card-footer pt-0 pb-0 text-center">
                            <div className="row">                                
                                <Smallheading name="Projects" number="150" color="primary"/>
                                <Smallheading name="Uploads" number="140" color="primary"/>
                                <Smallheading name="Tasks" number="45" color="primary"/>                                
                            </div>
                        </div>
                    </Card>
                </Col>   
                <Col xl={4}  lg={12} sm={12}>
                    <Card className="overflow-hidden">
                        <div className="card-body">
                            <div className="text-center">
                                <div className="profile-photo">
                                    <img src={IMAGES.Profile} width="100" className="img-fluid rounded-circle" alt="" />
                                </div>
                                <h3 className="mt-4 mb-1">Deangelo Sena</h3>
                                <p className="text-muted">Senior Manager</p>
                                <Link to={"#"} className="btn btn-outline-primary btn-rounded mt-3 px-5" >Folllow</Link>
                            </div>
                        </div>                        
                        <div className="card-footer pt-0 pb-0 text-center">
                            <div className="row">
                                <Smallheading name="Follower" number="270"/>
                                <Smallheading name="Place Stay" number="120"/>
                                <Smallheading name="Reviews" number="980"/>                                  
                            </div>
                        </div>
                    </Card>
                </Col>   
                <Col xl={4}  lg={12} sm={12}>
                    <div className="card overflow-hidden">
                        <div className="text-center p-3 overlay-box " style={{backgroundImage: `url(${IMAGES.BigImg})`}}>
                            <div className="profile-photo">
                                <img src={IMAGES.Profile} width="100" className="img-fluid rounded-circle" alt="" />
                            </div>
                            <h3 className="mt-3 mb-1 text-white">Deangelo Sena</h3>
                            <p className="text-white mb-0">Senior Manager</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Gender</span> <strong className="text-muted">Female	</strong></li>
                            <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Years Old</span> 		<strong className="text-muted">Age: 24	</strong></li>
                        </ul>
                        <div className="card-footer border-0 mt-0">								
                            <button className="btn btn-primary btn-lg btn-block">
                                <i className="fa fa-bell-o"></i> Reminder Alarm							
                            </button>		
                        </div>
                    </div>
                </Col>   

                <Col xl={4}  xxl={4} lg={12} sm={12}>
                    <div className="card">
                        <div className="card-body text-center ai-icon  text-primary">
                            <svg id="rocket-icon" className="my-2" viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <h4 className="my-2">You don’t have badges yet</h4>
                            <Link to={"#"} className="btn my-2 btn-primary btn-lg px-4"><i className="fa fa-usd"></i> Earn Budges</Link>
                        </div>
                    </div>
                </Col>   
                <Col xl={4}  lg={12} sm={12}>
                    <div className="card overflow-hidden">
                        <div className="text-center p-5 overlay-box" style={{backgroundImage: `url(${IMAGES.BigImg5})`}}>
                            <img src={IMAGES.Profile} width="100" className="img-fluid rounded-circle" alt="" />
                            <h3 className="mt-3 mb-0 text-white">Deangelo Sena</h3>
                        </div>
                        <div className="card-body">
                            <div className="row text-center">
                                <div className="col-6">
                                    <div className="bgl-primary rounded p-3">
                                        <h4 className="mb-0">Female</h4>
                                        <small>Patient Gender</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="bgl-primary rounded p-3">
                                        <h4 className="mb-0">Age: 24</h4>
                                        <small>Years Old</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer mt-0">								
                            <button className="btn btn-primary btn-lg btn-block">View Profile</button>		
                        </div>
                    </div>
                </Col>   
                <Col xl={4}  lg={12} sm={12}>
                    <div className="card bg-info activity_overview">
                        <div className="card-header  border-0 pb-3 ">
                            <h4 className="card-title text-white">Activity</h4>
                        </div>
                        <ActivityTab />
                    </div>    
                </Col>   
                {socialData.map((data, ind)=>(
                    <Col xl={3}  xxl={3} sm={6} key={ind}>
                        <SocialCard icon={data.icon} color={data.color} friends={data.friends} followers={data.followers}/>
                    </Col>   
                ))}                               
            </Row>
        </>
    );
};

export default WidgetCard;