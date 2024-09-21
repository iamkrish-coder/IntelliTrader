import React, { useState } from 'react';
import { IMAGES, SVGICON } from '../../constant/theme';
import { Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const contactBlog = [
    { image: IMAGES.smallpic4, name:'Samanta William', postion:'Marketing Manager'},
    { image: IMAGES.smallpic1, name:'Tony Soap', postion:'Marketing Manager'},
    { image: IMAGES.smallpic3, name:'Karen Hope', postion:'Marketing Manager'},
    { image: IMAGES.smallpic2, name:'Jordan Nico', postion:'Marketing Manager'},
    { image: IMAGES.smallpic5, name:'Nadila Adja', postion:'Marketing Manager'},
];

const taskData = [
    {name:'To Do', color:'primary', number:'5', status:'Progress'},
    {name:'In Progress', color:'secondary', number:'2', status:'Progress'},
    {name:'Completed', color:'success', number:'7', status:'Completed'},
];    

const User = () => {
    const [openModal, setOpenModal] = useState(false);
    const [refreshToggle, setRefreshToggle] = useState(false);
    const [refreshIcon, setRefreshIcon] = useState(false);
    const [datas, setDatas] = useState(contactBlog)
    const hendelClick = (name) => {
        if(name==="one"){
            setRefreshToggle(true);
            setTimeout(() => {
                setDatas([
                    ...datas,
                    datas[Math.floor(Math.random() * Math.floor(datas.length - 1))],      
                ]);
                setRefreshToggle(false);
            }, 1000);        
        }
        else if(name==="two"){
            setRefreshIcon(true);
            setTimeout(() => {
                setDatas([
                    ...datas,
                    datas[Math.floor(Math.random() * Math.floor(datas.length - 1))],      
                ]);
                setRefreshIcon(false);
            }, 1000);
        }
    };    
    return (
        <>
            <div className="row">
                <div className="col-xl-8">
                    <div className="row">
                        <div className="col-xl-12 col-md-12">
                            <div className="card justify-content-center">
                                <div className="card-body d-flex">
                                    <div className="d-block">
                                        <img src={IMAGES.ProfilePic} className="avatar avatar-xxl border-primary rounded-circle" alt="" />
                                    </div>
                                    <div className="w-100 ps-4">
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <h4 className="card-title mb-1"> Nadila Adja </h4>
                                                <h5> UI Designer </h5>
                                                <span> London, United Kingdom </span> 
                                            </div>
                                            <div className="d-flex">
                                                <div className="icon-box icon-box-sm bgl-danger me-2 btn-edit">
                                                    <Link to={"#"}>
                                                        {SVGICON.DangerCircle}
                                                    </Link>
                                                </div>
                                                <Dropdown className="ms-auto">
                                                    <Dropdown.Toggle as="div" className="i-false icon-box icon-box-sm bgl-primary">
                                                        {SVGICON.EditPencil}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu as="ul" className="dropdown-menu-end" align="end"> 
                                                        <Dropdown.Item as="li"><Link to={"#"}><i className="fa fa-user-circle text-primary me-2"/> View profile</Link></Dropdown.Item>
                                                        <Dropdown.Item as="li"><Link to={"#"}><i className="fa fa-users text-primary me-2"/> Add to btn-close friends </Link></Dropdown.Item>
                                                        <Dropdown.Item as="li"><Link to={"#"}><i className="fa fa-plus text-primary me-2"/> Add to group </Link></Dropdown.Item>
                                                        <Dropdown.Item as="li"><Link to={"#"}><i className="fa fa-ban text-primary me-2"/> Block </Link></Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            
                                        </div>
                                        <div className="d-flex flex-wrap pt-4">
                                            <div className="d-flex align-items-center pe-md-4 pe-2 mb-2">
                                                <div className="pe-2">
                                                    {SVGICON.MailBoxSvg}
                                                </div>
                                                <h5 className="font-w400 mb-0">demo@gmail.com</h5>
                                            </div>
                                            <div className="d-flex align-items-center pe-md-4 pe-2 mb-2">
                                                <div className="pe-2">
                                                    {SVGICON.CallIconSvg}
                                                </div>
                                                <h5 className="font-w400 mb-0">+012 345 689</h5>
                                            </div>
                                            <div className="d-flex align-items-center pe-md-4 pe-2 mb-2">
                                                <div className="pe-2">
                                                    {SVGICON.UserContact}
                                                </div>
                                                <h5 className="font-w400 mb-0">Jiade Studios</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0 d-block">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="card-title">Contacts</h3>
                                            <span>You have <strong className="text-primary">456</strong> contacts</span>
                                        </div>
                                        <div className="icon-box icon-box-sm bg-primary">
                                            <Link to="#"  onClick={()=>setOpenModal(true)}>                                            
                                                {SVGICON.CirclePlus}						
                                            </Link>									
                                        </div>	
                                    </div>	
                                    <div className="input-group custom-search-area mt-3">
                                        <span className="input-group-text">
                                            <Link to={"#"}>
                                                {SVGICON.SearchBoldIcon}
                                            </Link>
                                        </span>
                                        <input type="text" className="form-control border-start-0" placeholder="Search here..." />
                                    </div>
                                </div>
                                <div className="card-body pt-4 pb-0 height370 dlab-scroll">
                                    <div className="contacts-list" id="RecentActivityContent">
                                        {datas && datas.map((item, i)=>(
                                            <div className="d-flex justify-content-between my-3 border-bottom-dashed pb-3" key={i}>
                                                <div className="d-flex align-items-center">
                                                    <img src={item.image} alt="" className="avatar" />
                                                    <div className="ms-3">
                                                        <h5 className="mb-1"><Link to="/app-profile">{item.name}</Link></h5>
                                                        <span className="fs-14 text-muted">{item.postion}</span>
                                                    </div>
                                                </div>	
                                                <div className="icon-box icon-box-sm bgl-primary">
                                                    <Link to={"#"}>
                                                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18 0.889911C18.0057 0.823365 18.0057 0.756458 18 0.689911L17.91 0.499911C17.91 0.499911 17.91 0.429911 17.86 0.399911L17.81 0.349911L17.65 0.219911C17.6062 0.175413 17.5556 0.138269 17.5 0.109911L17.33 0.0499115H17.13H0.93H0.73L0.56 0.119911C0.504246 0.143681 0.453385 0.177588 0.41 0.219911L0.25 0.349911C0.25 0.349911 0.25 0.349911 0.25 0.399911C0.25 0.449911 0.25 0.469911 0.2 0.499911L0.11 0.689911C0.10434 0.756458 0.10434 0.823365 0.11 0.889911L0 0.999911V12.9999C0 13.2651 0.105357 13.5195 0.292893 13.707C0.48043 13.8946 0.734784 13.9999 1 13.9999H10C10.2652 13.9999 10.5196 13.8946 10.7071 13.707C10.8946 13.5195 11 13.2651 11 12.9999C11 12.7347 10.8946 12.4803 10.7071 12.2928C10.5196 12.1053 10.2652 11.9999 10 11.9999H2V2.99991L8.4 7.79991C8.5731 7.92973 8.78363 7.99991 9 7.99991C9.21637 7.99991 9.4269 7.92973 9.6 7.79991L16 2.99991V11.9999H14C13.7348 11.9999 13.4804 12.1053 13.2929 12.2928C13.1054 12.4803 13 12.7347 13 12.9999C13 13.2651 13.1054 13.5195 13.2929 13.707C13.4804 13.8946 13.7348 13.9999 14 13.9999H17C17.2652 13.9999 17.5196 13.8946 17.7071 13.707C17.8946 13.5195 18 13.2651 18 12.9999V0.999911C18 0.999911 18 0.929911 18 0.889911ZM9 5.74991L4 1.99991H14L9 5.74991Z" fill="var(--primary)"></path>
                                                        </svg>
                                                    </Link>		
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer border-0 pt-0">
                                    <div className="text-center border-0">
                                        <Link to={"#"} className="btn btn-block btn-primary btn-sm dlab-load-more" 
                                            onClick={() => hendelClick('one')}
                                        >
                                            View More{" "}
                                            {refreshToggle && <i className="fa fa-refresh" />}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header d-block border-0 pb-0 ">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3 className="card-title mb-1">Messages</h3>
                                            <span>You have <strong className="text-primary">10 New</strong> Messages</span>
                                        </div>
                                        <Link to={"#"} className="icon-box icon-box-sm bg-primary" onClick={()=>setOpenModal(true)}>
                                            {SVGICON.CirclePlus}									
                                        </Link>
                                    </div>
                                    <div className="input-group custom-search-area mt-3">
                                        <span className="input-group-text">                                        
                                            {SVGICON.SearchBoldIcon}
                                        </span>
                                        <input type="text" className="form-control border-start-0" placeholder="Search here..." />
                                    </div>
                                </div>
                                
                                <div className="card-body height370 dlab-scroll pt-4 pb-0">
                                    <div className="contacts-list" id="RecentMessagesContent">
                                        {datas && datas.map((item, i)=>(
                                            <div className="d-flex justify-content-between mb-3 mt-3 border-bottom-dashed pb-3" key={i}>
                                                <div className="d-flex align-items-center">
                                                    <img src={item.image} alt="" className="avatar" />
                                                    <div className="ms-3">
                                                        <h5 className="mb-1"><Link to="/email-inbox">{item.name}</Link></h5>
                                                        <span className="fs-14 text-muted text-wrap">Lorem ipsum dolor sit amet...</span>
                                                    </div>
                                                </div>	
                                                <div className="text-end">
                                                    <span className="d-block mb-1">12:45 PM</span>
                                                    <span className="badge badge-primary">2</span>	
                                                </div>																				
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer border-0 pt-0">
                                    <div className="text-center border-0 pt-3">
                                        <Link to={"#"} className="btn btn-block btn-primary dlab-load-more btn-sm"
                                            onClick={() => hendelClick('two')}
                                        >
                                            View More{" "}
                                            {refreshIcon && <i className="fa fa-refresh" />}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="row">							
                        <div className="col-xl-12 col-lg-6">
                            <div className="card">
                                <div className="prot-blog">
                                    <div className="d-flex post justify-content-between align-items-center">
                                        <div className="d-flex align-items-center mb-2">
                                            <h5 className="text-white card-title mb-0 me-3">Current Plan</h5>
                                            <span className="badge badge-warning badge-sm">Premium</span>
                                        </div>
                                        
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="i-false">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0012 9.86792C11.6543 9.86792 11.3109 9.93268 10.9904 10.0585C10.67 10.1843 10.3788 10.3687 10.1335 10.6012C9.88829 10.8337 9.69374 11.1097 9.56101 11.4134C9.42828 11.7172 9.35996 12.0427 9.35996 12.3715C9.35996 12.7003 9.42828 13.0258 9.56101 13.3296C9.69374 13.6333 9.88829 13.9093 10.1335 14.1418C10.3788 14.3743 10.67 14.5587 10.9904 14.6845C11.3109 14.8103 11.6543 14.8751 12.0012 14.8751C12.7017 14.8749 13.3734 14.611 13.8686 14.1414C14.3638 13.6718 14.6419 13.0349 14.6418 12.3709C14.6416 11.7069 14.3632 11.0702 13.8677 10.6008C13.3723 10.1314 12.7004 9.86777 12 9.86792H12.0012ZM3.60116 9.86792C3.25431 9.86792 2.91086 9.93268 2.59042 10.0585C2.26997 10.1843 1.97881 10.3687 1.73355 10.6012C1.48829 10.8337 1.29374 11.1097 1.16101 11.4134C1.02828 11.7172 0.959961 12.0427 0.959961 12.3715C0.959961 12.7003 1.02828 13.0258 1.16101 13.3296C1.29374 13.6333 1.48829 13.9093 1.73355 14.1418C1.97881 14.3743 2.26997 14.5587 2.59042 14.6845C2.91086 14.8103 3.25431 14.8751 3.60116 14.8751C4.30165 14.8749 4.97339 14.611 5.4686 14.1414C5.9638 13.6718 6.24192 13.0349 6.24176 12.3709C6.2416 11.7069 5.96318 11.0702 5.46775 10.6008C4.97231 10.1314 4.30045 9.86777 3.59996 9.86792H3.60116ZM20.4012 9.86792C20.0543 9.86792 19.7109 9.93268 19.3904 10.0585C19.07 10.1843 18.7788 10.3687 18.5336 10.6012C18.2883 10.8337 18.0937 11.1097 17.961 11.4134C17.8283 11.7172 17.76 12.0427 17.76 12.3715C17.76 12.7003 17.8283 13.0258 17.961 13.3296C18.0937 13.6333 18.2883 13.9093 18.5336 14.1418C18.7788 14.3743 19.07 14.5587 19.3904 14.6845C19.7109 14.8103 20.0543 14.8751 20.4012 14.8751C21.1017 14.8749 21.7734 14.611 22.2686 14.1414C22.7638 13.6718 23.0419 13.0349 23.0418 12.3709C23.0416 11.7069 22.7632 11.0702 22.2677 10.6008C21.7723 10.1314 21.1005 9.86777 20.4 9.86792H20.4012Z" fill="#FCFCFC"></path>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end" className="dropdown-menu-end" >
                                                <Dropdown.Item>Delete</Dropdown.Item>
                                                <Dropdown.Item>Edit</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="fill">                                        
                                        <p className="mb-1">Expired on December 30th, 2024</p>
                                    </div>
                                    <h4 className="mb-0">
                                        <Link to="/post-details" className="text-bla">
                                            {SVGICON.WhiteDot}
                                            {" "}
                                            250 GB Storage
                                        </Link>
                                    </h4>
                                    <h4 className="mb-3">
                                        <Link to="/post-details" className="text-bla">
                                            {SVGICON.WhiteDot}
                                            {" "}Unlimited Tickets Support
                                        </Link>
                                    </h4>
                                    <Link to="#" className="btn btn-sm btn-secondary btn-sm" >Upgrade Plan</Link>
                                    <div className="shape">
                                        {SVGICON.ShapeUser}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-6 ">
                            <div className="card">
                                <div className="card-header border-0 pb-0 ">
                                    <h3 className="card-title mb-2">Task</h3>
                                </div>
                                <div className="card-body pt-2">
                                    {taskData.map((data, i)=>(
                                        <div className="d-flex align-items-center mb-4" key={i}>
                                            <div className={`icon-box icon-box-sm bg-${data.color}`}>
                                                {SVGICON.FourDots}
                                            </div>
                                            <div className="ms-3">
                                                <h5 className="mb-1"><Link to={"#"} className={`text-${data.color}`}>{data.name}</Link></h5>
                                                <ul className="d-flex">
                                                    <li className="me-3">5 Task Now</li>
                                                    <li>
                                                        <svg width="6" className="me-3" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="3" cy="3.5" r="3" fill="#C4C4C4"></circle>
                                                        </svg>
                                                        {data.number} On {data.status}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-md-12 ">
                            <div className="card">
								<div className="card-header border-0 pb-0">
									<h3 className="card-title mb-0">Lastest Activity</h3>
								</div>
								<div className="card-body pt-0">
									<div className="dz-scroll">
										<ul className="timeline-active">
											<li className="d-flex timeline-list">
												<div className="dz-media">
													<img src={IMAGES.Profile14} alt="" className="avatar" />
												</div>
												<div className="panel">
													<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center mb-0">
														<h4 className="mb-0"><strong>Karen Hope</strong> moved task <strong className="text-primary">Jiade Projects</strong> </h4>
													</Link>
													<span className="time py-0">Monday, June 31 2020</span>	
												</div>
											</li>
											<li className="d-flex timeline-list">
												<div className="dz-media">
													<img src={IMAGES.Profile18} alt="" className="avatar" />
												</div>
												<div className="panel">
													<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center mb-0">
														<h4 className="mb-0" ><strong>Tony Soap </strong> commented at <strong className="text-primary"> Jiade Projects </strong></h4>
													</Link>
													<span className="time py-0">Monday, June 31 2020</span>	
													
												</div>
											</li>
											<li className="d-flex timeline-list pb-0">
												<div className="dz-media">
													<img src={IMAGES.Profile19} alt="" className="avatar" />
												</div>
												<div className="panel">
													<Link to={"#"} className="timeline-panel text-muted d-flex align-items-center mb-0">
														<h4 className="mb-0" ><strong>Samantha William </strong> add 4 files on  Jiade <strong className="text-danger">Projects </strong></h4>
													</Link>
													<span className="time py-0">Monday, June 31 2020</span>	
												</div>
												
											</li>
										</ul>
									</div>	
								</div>
							</div>
                        </div>
                    </div>
                </div>           
            </div>
            <Modal show={openModal} onHide={setOpenModal} centered>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Contact</h5>
                    <button type="button" className="btn-close" onClick={()=>setOpenModal(false)}></button>
                </div>
                <div className="modal-body">                        
                    <label className="form-label d-block">Enter Name</label>
                    <input type="text" className="form-control w-100" placeholder="Name" />                        
                    <label className="form-label d-block mt-3">Enter Position</label>
                    <input type="text" className="form-control w-100" placeholder="position" />                        
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={()=>setOpenModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>            
            </Modal>
        </>
    );
};

export default User;