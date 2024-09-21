import React from 'react';
import {Link} from 'react-router-dom';

import {Row, Card, Col , Dropdown} from 'react-bootstrap';
import { IMAGES } from '../../constant/theme';


const todoList = [
    {title:"Get up", color:"success"},
    {title:"Stand up", color:"warning"},
    {title:"Don't give up the fight.", color:"info"},
    {title:"Do something else", color:"danger"},
    {title:"Get up", color:"success"},
    {title:"Stand up", color:"warning"},
];

const DropDownBlog = ({color}) =>{
  return(
    <Dropdown>
      <Dropdown.Toggle variant="" className={`btn light sharp i-false p-0 sharp btn-${color}`}>
        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <rect x="0" y="0" width="24" height="24" />
              <circle fill="#000000" cx="5" cy="12" r="2" />
              <circle fill="#000000" cx="12" cy="12" r="2" />
              <circle fill="#000000" cx="19" cy="12" r="2" />
            </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item className="dropdown-item" to="#">
          Edit
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item" to="#">
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
  </Dropdown>
  )
}

const MediaProfile = ({name}) =>{
  return(
    <div className="media-body">
        <h5 className="mb-1">{name}</h5>
        <small className="d-block">
          29 Dec 2023 - 02:26 PM
        </small>
    </div>
  )
}


const paymentTable = [
    { ward:'12', name:"Mr. Bobby", drname:'Dr. Jackson', date:'01 Nov 2023', status:'Pending', color:'primary', bills:'$120'},
    { ward:'10', name:"Mr. Dexter", drname:'Dr. Charles', date:'08 Dec 2023', status:'Pending', color:'warning', bills:'$450'},
    { ward:'03', name:"Mr. Nathan", drname:'Dr. Frederick', date:'12 Dec 2023', status:'Canceled', color:'danger', bills:'$301'},
    { ward:'05', name:"Mr. Aurora", drname:'Dr. Roman', date:'15 Dec 2023', status:'Received', color:'success', bills:'$199'},
    { ward:'06', name:"Mr. Matthew", drname:'Dr. Samantha', date:'18 Dec 2023', status:'Received', color:'success', bills:'$320'},
];

const dataListBlog = [
  {title:'Allergies', subtitle:'Penicilin, peanuts ', title2:'Dr Theodore Handle', subtitle2:'Dentist', title3:'Registartion', subtitle3:'1'}, 
  {title:'Pressure', subtitle:'120/100 mmHG', title2:'Dr Valentino Morose', subtitle2:'Surgeon', title3:'Lab', subtitle3:'3'}, 
  {title:'Diseases', subtitle:'Diabetes', title2:'Dr Fleece Marigold', subtitle2:'Clinical', title3:'Xray', subtitle3:'4'}, 
  {title:'Temperture', subtitle:'34 Degree', title2:'Dr Eric Widget', subtitle2:'Cardiology', title3:'Mri', subtitle3:'2'}, 
];

const WidgetList = () => {
    return (
        <>
             
            <Row>
                <Col xl={4} lg={12}>
                    <Card>
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">Timeline</h4>
                        </div>
                        <div className='card-body p-0'>
                            <div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll my-4 px-4" style={{height:"370px"}}>
                                <ul className="timeline">
                                    <li>
                                        <div className="timeline-badge primary"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>10 minutes ago</span>
                                            <h6 className="mb-0">
                                                Youtube, a video-sharing website, goes live{" "}
                                                <strong className="text-primary">$500</strong>.
                                            </h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge info"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">
                                                New order placed{" "}
                                                <strong className="text-info">#XF-2356.</strong>
                                            </h6>
                                            <p className="mb-0">
                                                Quisque a consequat ante Sit amet magna at volutapt...
                                            </p>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge danger"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>30 minutes ago</span>
                                            <h6 className="mb-0">
                                                john just buy your product{" "}
                                                <strong className="text-warning">Sell $250</strong>
                                            </h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge success"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>15 minutes ago</span>
                                            <h6 className="mb-0">
                                                StumbleUpon is acquired by eBay.{" "}
                                            </h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge warning"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">
                                                Mashable, a news website and blog, goes live.
                                            </h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge dark"></div>
                                        <Link
                                            className="timeline-panel text-muted"
                                            to="#"
                                        >
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">
                                                Mashable, a news website and blog, goes live.
                                            </h6>
                                        </Link>
                                    </li>
                                    </ul>
                            </div>        
                        </div>        
                        
                    </Card>    
                </Col>
                <Col xl={4} lg={12}>
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">Timeline 2</h4>
                        </div>
                        <div className="card-body p-0">
                            <div
                                style={{ height: "370px" }}
                                id="DZ_W_TimeLine1"
                                className="widget-timeline dlab-scroll style-1 height370 my-4 px-4"
                            >
                            <ul className="timeline">
                                <li>
                                <div className="timeline-badge primary"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>10 minutes ago</span>
                                    <h6 className="mb-0">
                                    Youtube, a video-sharing website, goes live{" "}
                                    <strong className="text-primary">$500</strong>.
                                    </h6>
                                </Link>
                                </li>
                                <li>
                                <div className="timeline-badge info"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>20 minutes ago</span>
                                    <h6 className="mb-0">
                                    New order placed{" "}
                                    <strong className="text-info">#XF-2356.</strong>
                                    </h6>
                                    <p className="mb-0">
                                    Quisque a consequat ante Sit amet magna at volutapt...
                                    </p>
                                </Link>
                                </li>
                                <li>
                                <div className="timeline-badge danger"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>30 minutes ago</span>
                                    <h6 className="mb-0">
                                    john just buy your product{" "}
                                    <strong className="text-warning">Sell $250</strong>
                                    </h6>
                                </Link>
                                </li>
                                <li>
                                <div className="timeline-badge success"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>15 minutes ago</span>
                                    <h6 className="mb-0">
                                    StumbleUpon is acquired by eBay.{" "}
                                    </h6>
                                </Link>
                                </li>
                                <li>
                                <div className="timeline-badge warning"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>20 minutes ago</span>
                                    <h6 className="mb-0">
                                    Mashable, a news website and blog, goes live.
                                    </h6>
                                </Link>
                                </li>
                                <li>
                                <div className="timeline-badge dark"></div>
                                <Link
                                    className="timeline-panel text-muted"
                                    to="#"
                                >
                                    <span>20 minutes ago</span>
                                    <h6 className="mb-0">
                                    Mashable, a news website and blog, goes live.
                                    </h6>
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4} lg={12}>
                    <div className="card">
                        <div className="card-header  border-0 pb-0">
                          <h4 className="card-title">Notifications</h4>
                        </div>
                        <div className="card-body p-0">
                          <div
                              style={{ height: "370px" }}
                              id="DZ_W_Todo1"
                              className="widget-media my-4 px-4 dlab-scroll height370"
                          >
                              <ul className="timeline">
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2">
                                          <img  alt="" width="50" src={IMAGES.Avatar1} />
                                      </div>                                 
                                      <MediaProfile name="Dr Sultads send you photo" />
                                      <DropDownBlog  color={'primary'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-info">KG</div>                                  
                                      <MediaProfile name="Report created successfully" />
                                      <DropDownBlog  color={'info'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-success">
                                          <i className="fa fa-home"></i>
                                      </div>                                  
                                      <MediaProfile name="Reminder : Treatment Time!" />
                                      <DropDownBlog  color={'success'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2">
                                          <img  alt="" width="50" src={IMAGES.Avatar1} />
                                      </div>                                  
                                      <MediaProfile name="Dr Sultads send you photo" />
                                      <DropDownBlog  color={'info'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                    <div className="media me-2 media-danger">KG</div>
                                      <MediaProfile name="Report created successfully" />
                                      <DropDownBlog  color={'danger'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-primary">
                                          <i className="fa fa-home"></i>
                                      </div>
                                      <MediaProfile name="Reminder : Treatment Time!" />
                                      <DropDownBlog  color={'primary'}/>
                                    </div>
                                </li>
                              </ul>
                          </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4} lg={12}>
                <div className="card border-0 pb-0">
                  <div className="card-header border-0 pb-0">
                    <h4 className="card-title">Notifications 2</h4>
                  </div>
                  <div className="card-body p-0">
                    <div
                      style={{ height: "370px" }}
                      id="DZ_W_Todo2"
                      className="widget-media my-4 px-4 dlab-scroll height370"
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img  alt="" width="50" src={IMAGES.Avatar1} />
                            </div>
                            <MediaProfile name="Dr Sultads send you photo" />                            
                            <DropDownBlog color="primary" />
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">KG</div>
                              <div className="media-body">
                                <h5 className="mb-1">
                                  Report created successfully{" "}
                                  <span className="badge badge-warning">Warning</span>
                                </h5>
                                <small className="d-block">
                                  29 July 2023 - 02:26 PM
                                </small>
                              </div>
                              <DropDownBlog  color={'info'}/>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">
                              <i className="fa fa-home"></i>
                            </div>                            
                            <MediaProfile name="Reminder : Treatment Time!" />   
                            <DropDownBlog  color={'success'}/>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img  alt="" width="50" src={IMAGES.Avatar1} />
                            </div>
                            <div className="media-body">
                              <h5 className="mb-1">
                                Dr Sultads send you photo{" "}
                                <span className="badge light badge-danger">
                                    Danger
                                </span>
                              </h5>
                              <small className="d-block">
                                29 July 2023 - 02:26 PM
                              </small>
                            </div>
                              <DropDownBlog  color={'primary'}/>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-danger">KG</div>
                            <div className="media-body">
                              <h5 className="mb-1">
                                Report created successfully{" "}
                                <span className="badge light badge-success">
                                  Success
                                </span>
                              </h5>
                              <small className="d-block">
                                29 July 2023 - 02:26 PM
                              </small>
                            </div>
                            <DropDownBlog  color={'danger'}/>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-primary">
                              <i className="fa fa-home"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mb-1">
                                Reminder : Treatment Time!{" "}
                                <span className="badge light badge-success">
                                  Success
                                </span>
                              </h5>
                              <small className="d-block">
                                29 July 2023 - 02:26 PM
                              </small>
                            </div>
                            <DropDownBlog  color={'primary'}/>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                </Col>
                <Col xl={4} lg={12}>
                  <div className="card border-0 pb-0">
                      <div className="card-header border-0 pb-0">
                          <h4 className="card-title">Message</h4>
                      </div>
                      <div className="card-body p-0">
                          <div
                              style={{ height: "370px" }}
                              id="DZ_W_Todo3"
                              className="widget-media my-4 px-4 dlab-scroll height370"
                          >
                              <ul className="timeline">
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2">
                                          <img  alt="" width="50" src={IMAGES.Avatar1} />
                                      </div>
                                      <div className="media-body">
                                          <h5 className="mb-1">Alfie Mason{" "}
                                            <small className="text-muted">29 July 2023</small>
                                          </h5>
                                          <p className="mb-1">I shared this on my fb wall a few months back..</p>
                                          <Link to="#" className="btn btn-primary btn-xxs shadow">
                                            Reply
                                          </Link>
                                          <Link to="#" className="btn btn-outline-danger btn-xxs ms-1">
                                            Delete
                                          </Link>
                                      </div>
                                      <DropDownBlog  color={'primary'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-info">KG</div>
                                        <div className="media-body">
                                            <h5 className="mb-1">Jacob Tucker{" "}
                                              <small className="text-muted">29 July 2023</small>
                                            </h5>
                                            <p className="mb-1">
                                              I shared this on my fb wall a few months back..
                                            </p>
                                            <Link to="#" className="btn btn-primary btn-xxs shadow">Reply</Link>
                                            <Link to="#" className="btn btn-outline-danger btn-xxs ms-1">Delete</Link>
                                        </div>
                                        <DropDownBlog  color={'info'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-success">
                                          <img  alt="" width="50" src={IMAGES.Avatar2} />
                                      </div>
                                      <div className="media-body">
                                          <h5 className="mb-1">Jack Ronan{" "}
                                            <small className="text-muted">29 July 2023</small>
                                          </h5>
                                          <p className="mb-1">
                                            I shared this on my fb wall a few months back..
                                          </p>
                                          <Link to="#" className="btn btn-primary btn-xxs shadow">Reply</Link>
                                          <Link to="#" className="btn btn-outline-danger btn-xxs ms-1">Delete</Link>
                                      </div>
                                      <DropDownBlog  color={'success'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                    <div className="media me-2">
                                        <img  alt="" width="50" src={IMAGES.Avatar1} />
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mb-1">
                                          Noah Baldon{" "}
                                          <small className="text-muted">29 July 2023</small>
                                        </h5>
                                        <p className="mb-1">
                                          I shared this on my fb wall a few months back..
                                        </p>
                                        <Link
                                        to="#"
                                        className="btn btn-primary btn-xxs shadow"
                                        >
                                        Reply
                                        </Link>
                                        <Link
                                        to="#"
                                        className="btn btn-outline-danger btn-xxs ms-1"
                                        >
                                        Delete
                                        </Link>
                                    </div>
                                    <DropDownBlog  color={'primary'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-danger">PU</div>
                                      <div className="media-body">
                                          <h5 className="mb-1">
                                          Thomas Grady{" "}
                                          <small className="text-muted">02:26 PM</small>
                                          </h5>
                                          <p className="mb-1">
                                          I shared this on my fb wall a few months back..
                                          </p>
                                          <Link
                                          to="#"
                                          className="btn btn-primary btn-xxs shadow"
                                          >
                                          Reply
                                          </Link>
                                          <Link
                                          to="#"
                                          className="btn btn-outline-danger btn-xxs ms-1"
                                          >
                                          Delete
                                          </Link>
                                      </div>
                                      <DropDownBlog  color={'danger'}/>
                                    </div>
                                </li>
                                <li>
                                    <div className="timeline-panel">
                                      <div className="media me-2 media-primary">
                                          <img  alt="" width="50" src={IMAGES.Avatar3} />
                                      </div>
                                      <div className="media-body">
                                          <h5 className="mb-1">
                                            Oscar Weston{" "}
                                            <small className="text-muted">29 July 2023</small>
                                          </h5>
                                          <p className="mb-1">
                                            I shared this on my fb wall a few months back..
                                          </p>
                                          <Link
                                            to="#"
                                            className="btn btn-primary btn-xxs shadow"
                                          >
                                            Reply
                                          </Link>
                                          <Link to="#" className="btn btn-outline-danger btn-xxs ms-1">
                                            Delete
                                          </Link>
                                      </div>
                                      <DropDownBlog  color={'info'}/>
                                    </div>
                                </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                </Col>
                <Col xl={4} lg={12}>
                    <div className="card border-0 pb-0">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">To Do List</h4>
                        </div>
                        <div className="card-body p-0">
                            <div style={{ height: "370px" }} className="widget-media my-4 px-4 dlab-scroll height370">
                                <ul className="timeline">
                                    {todoList.map((item, ind)=>(                                
                                        <li key={ind}>
                                            <div className="timeline-panel">
                                                <div className={`form-check custom-checkbox check-lg me-3 checkbox-${item.color}`}>
                                                    <input type="checkbox" className="form-check-input" id={`customCheckBox${ind+20}`} required=""/>
                                                    <label className="form-check-label" htmlFor={`customCheckBox${ind+20}`} />
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                    <small className="text-muted">29 December 2023 - 02:26 PM</small>
                                                </div>
                                                <Dropdown className="dropdown">
                                                    <Dropdown.Toggle variant="" className={`btn light sharp i-false p-0 sharp btn-${item.color}`}>
                                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <circle fill="#000000" cx="5" cy="12" r="2" />
                                                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                                                <circle fill="#000000" cx="19" cy="12" r="2" />
                                                            </g>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item> Edit</Dropdown.Item>
                                                        <Dropdown.Item>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </li>
                                    ))}                               
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4} lg={12} xxl={4} sm={12}>
                  <div className="card  bg-primary">
                      <ul className="list-group list-group-flush style-4">
                        <li className="list-group-item d-flex justify-content-between text-white"><span className="mb-0">Blood type :</span><strong>O+</strong></li>
                        {dataListBlog.map((data, index)=>(
                            <li className="list-group-item text-white d-flex justify-content-between" key={index}>
                              <span className="mb-0">{data.title} :</span><strong>{data.subtitle}</strong>
                            </li>
                        ))}                        
                      </ul>
                  </div>
                </Col>
                <Col xl={4} lg={6} xxl={4} sm={6}>
                  <div className="card text-white bg-warning text-black">
                    <ul className="list-group list-group-flush style-4">
                        <li className="list-group-item d-flex justify-content-between text-white"><span className="mb-0">Regular Checkups</span></li>
                        {dataListBlog.map((data, index)=>(
                          <li className="list-group-item d-flex justify-content-between text-white" key={index}>
                            <span className="mb-0">{data.title2} :</span><strong>{data.subtitle2}</strong>
                          </li>
                        ))}                      
                    </ul>
                  </div>
                </Col>
                <Col xl={4} lg={6} xxl={4} sm={6}>
                  <div className="card text-white bg-success text-black">
                    <ul className="list-group list-group-flush style-4">
                      <li className="list-group-item d-flex justify-content-between text-white"><span className="mb-0">Stations</span><strong>Capacity</strong></li>
                      {dataListBlog.map((data, index)=>(
                        <li className="list-group-item d-flex justify-content-between text-white" key={index}>
                          <span className="mb-0">{data.title3} :</span><strong>{data.subtitle3}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col xl={12} lg={21} xxl={12} sm={12}>                
                    <div className="card">
                      <div className="card-header">
                          <h4 className="card-title">Recent Payments Queue</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive recentOrderTable">
                          <table className="table verticle-middle table-responsive-md">
                              <thead>
                                  <tr>
                                      <th scope="col">Ward No.</th>
                                      <th scope="col">Patient</th>
                                      <th scope="col">Dr Name</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Bills</th>
                                      <th scope="col" className="text-end">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                {paymentTable.map((item, ind)=>(
                                    <tr key={ind}>
                                        <td>{item.ward}</td>
                                        <td>{item.name}</td>
                                        <td>{item.drname}</td>
                                        <td>{item.date}</td>
                                        <td><span className={`badge badge-rounded badge-${item.color}`}>{item.status}</span></td>
                                        <td>{item.bills}</td>
                                        <td className="text-end">
                                            <Dropdown className="custom-dropdown mb-0">
                                                <Dropdown.Toggle className="btn sharp btn-primary tp-btn i-false">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align={'end'}>
                                                    <Dropdown.Item>Details</Dropdown.Item>
                                                    <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                              </tbody>
                          </table>  
                        </div>  
                      </div>  
                    </div>              
                </Col>
            </Row>
        </>
    );
};

export default WidgetList;