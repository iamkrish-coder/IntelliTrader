import React, { useState, useContext } from "react";
import {Nav,Tab} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Select from "react-select";
import { ThemeContext } from "../../context/ThemeContext";
import demo1 from '../../assets/images/demo/pic1.jpg';
import demo2 from '../../assets/images/demo/pic2.jpg';
import demo3 from '../../assets/images/demo/pic3.jpg';
import demo4 from '../../assets/images/demo/pic4.jpg';
import demo5 from '../../assets/images/demo/pic5.jpg';
import demo6 from '../../assets/images/demo/pic6.jpg';


const Setting = () => {
  const [settingToggle, setSettingToggle] = useState(false);
  const [demoToggle, setDemoToggle] = useState(false);
  const {
    body,
    sideBarOption,
    layoutOption,
    backgroundOption,
    sidebarposition,
    headerPositions,
    containerPosition,
    fontFamily,
    changePrimaryColor,
	changeNavigationHader,
    sideBarStyle,
    changeSideBarStyle,
    changeSideBarPostion,
    sidebarpositions,
    changeHeaderPostion,
    headerposition,
    changeSideBarLayout,
    sidebarLayout,
    colors,
	chnageHaderColor,
    chnageSidebarColor,
    changeBackground,
    background,
    changeContainerPosition,
    containerPosition_,
	setDemoTheme
  } = useContext(ThemeContext);
  return (
	<>
		<div className={`sidebar-right ${settingToggle ? "show" : ""}`}>
			<div className="bg-overlay" onClick={() => setSettingToggle(!settingToggle)}></div>
			<Link to="#" className="sidebar-right-trigger wave-effect wave-effect-x" onClick={() => setSettingToggle(!settingToggle)} >
				<span><i className="fa fa-cog fa-spin" /></span>
			</Link>
			<Link to="#" className="sidebar-close-trigger" onClick={() => setSettingToggle(!settingToggle)} >
				<span><i className="la-times las"></i></span>
			</Link>
			<div className="sidebar-right-inner">
				<h4>Pick your style</h4>
				
				<Tab.Container	 defaultActiveKey="Theme">
					<div className="card-tabs">
						<Nav as="ul" className="nav nav-tabs" role="tablist">
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link c-pointer" eventKey="Theme" role="tab"> Theme </Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link c-pointer" eventKey="Header" role="tab"> Header </Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link as="a" className="nav-link c-pointer"  eventKey="Content"  role="tab">Content</Nav.Link>
							</Nav.Item>
						</Nav>
					</div>
					<Tab.Content className=" tab-content-default tabcontent-border">
						<Tab.Pane className="tab-pane fade " eventKey="Theme">
							<div className="admin-settings">
								<div className="row">
									<div className="col-sm-12">
										<p>Background</p>{" "}
										<Select 
											defaultValue={background} 
											onChange={(e) => changeBackground(e)}
											options={backgroundOption}
											// style={{
											// 	lineHeight: "40px",
											// 	color: "#7e7e7e",
											// 	paddingLeft: " 15px",
											// }}
										/>
									</div>
									<div className="col-sm-6">
										<p>Primary Color</p>
										<div>
											{colors.map((color, i) => (
												<span key={i}>
													<input type="radio" name="primary_color" defaultValue={color}	className="filled-in chk-col-primary"
														id={`primary_${color}`}
														onClick={() => changePrimaryColor(color)}
													/>
													<label htmlFor={`primary_${color}`} />{" "}
												</span>
											))}
										</div>
									</div>
									<div className="col-sm-6">
										<p>Navigation Header</p>
										<div>
										{colors.map((color, i) => (
											<span key={i}>
											<input
												type="radio"
												name="navigation_header"
												defaultValue={color}
												className="filled-in chk-col-primary"
												id={`nav_header_${color}`}
												onClick={() => changeNavigationHader(color)}
											/>
												<label htmlFor={`nav_header_${color}`} />{" "}
											</span>
										))}
										</div>
									</div>
									<div className="col-sm-6">
										<p>Header</p>
										<div>
											{colors.map((color, i) => (
												<span key={i}>
													<input type="radio" name="header_bg" defaultValue={color} className="filled-in chk-col-primary"
														id={`header_${color}`}
														onClick={() => chnageHaderColor(color)}
													/>
													<label htmlFor={`header_${color}`} />{" "}
												</span>
											))}
										</div>
									</div>
									<div className="col-sm-6">
										<p>Sidebar</p>
										<div>
											{colors.map((color, i) => (
												<span key={i}>
													<input type="radio" name="navigation_header" defaultValue={color} className="filled-in chk-col-primary"
														id={`sidebar_${color}`}
														onClick={() => chnageSidebarColor(color)}
													/>
													<label htmlFor={`sidebar_${color}`} />
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</Tab.Pane>
						<Tab.Pane className="tab-pane fade" eventKey="Header">
							<div className="admin-settings">
								<div className="row">
									<div className="col-sm-6">
										<p>Layout</p>{" "}
										<Select
											defaultValue={sidebarLayout}
											onChange={(e) => changeSideBarLayout(e)}
											options={layoutOption}
											style={{
												lineHeight: "40px",
												color: "#7e7e7e",
												paddingLeft: " 15px",
											}}
										/>
									</div>
									<div className="col-sm-6">
										<p>Header position</p>{" "}
										<Select
											defaultValue={headerposition}
											onChange={(e) => changeHeaderPostion(e)}
											options={headerPositions}
											style={{
												lineHeight: "40px",
												color: "#7e7e7e",
												paddingLeft: " 15px",
											}}
										/>
									</div>
									<div className="col-sm-6">
										<p>Sidebar</p>{" "}
										<Select
											defaultValue={sideBarStyle}
											onChange={(e) => changeSideBarStyle(e)}
											options={sideBarOption}
											style={{
												lineHeight: "40px",
												color: "#7e7e7e",
												paddingLeft: " 15px",
											}}
										/>
									</div>
									<div className="col-sm-6">
										<p>Sidebar position</p>{" "}
										<Select
											defaultValue={sidebarposition}
											onChange={(e) => changeSideBarPostion(e)}
											options={sidebarpositions}
											style={{
												lineHeight: "40px",
												color: "#7e7e7e",
												paddingLeft: " 15px",
											}}
										/>
									</div>
								</div>
							</div>
						</Tab.Pane>
						<Tab.Pane className="tab-pane fade" eventKey="Content">
							<div className="admin-settings">
								<div className="row">
									<div className="col-sm-6">
										<p>Container</p>{" "}
										<Select defaultValue={containerPosition_} onChange={(e) => changeContainerPosition(e)} options={containerPosition}
											style={{ lineHeight: "40px",color: "#7e7e7e",paddingLeft: " 15px",}}
										/>
									</div>
									<div className="col-sm-6">
										<p>Body Font</p>{" "}
										<Select defaultValue={fontFamily[0]} onChange={(e) =>
											body.setAttribute("data-typography", e.value)
										}
										options={fontFamily}
											style={{ lineHeight: "40px", color: "#7e7e7e", paddingLeft: " 15px", }}
										/>
									</div>
								</div>	
							</div>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
				<div className="note-text">
					<span className="text-danger">*Note :</span> 
					This theme switcher is not part of product. It is only for demo. you will get all guideline in documentation. please check 
					<Link to={"https://jiade.dexignlab.com/react/doc/"} target="_blank" className="text-primary"> documentation.</Link>
				</div>
			</div>
		</div>
	
		<div className={`dlab-demo-panel ${demoToggle ? "show" : ""}`}>
			<div className="bg-overlay" onClick={() => setDemoToggle(!demoToggle)}></div>
				<div className="bg-close"  onClick={() => setDemoToggle(!demoToggle)} ></div>
				<Link to="#" className="dlab-demo-trigger" onClick={() => setDemoToggle(!demoToggle)}>
					<span><i className="las la-tint"/></span>
				</Link>
				<div className="dlab-demo-inner">
					<div className="btn btn-primary btn-sm px-2 py-1 mb-3">Demo</div>
					<div className="dlab-demo-header">
						<h3 className="text-white">Select Preset Demo</h3> 
						<Link to={"#"} className="dlab-demo-close" onClick={() => setDemoToggle(!demoToggle)}>
							<span><i className="las la-times" /></span>
						</Link>
					</div>
					<div  className="dlab-demo-content">	
						<div className="dlab-wrapper row">
							<div className="col-xl-4 col-md-6 mb-4">
								<div className="overlay-bx dlab-demo-bx demo-active">
									<div className="overlay-wrapper rounded-lg"><img src={demo1} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => { setDemoTheme(1,'ltr'); setDemoToggle(!demoToggle)} } data-theme="1" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 1</h5>
							</div>
							<div className="col-xl-4 col-md-6 mb-4">		
								<div className="overlay-bx dlab-demo-bx ">
									<div className="overlay-wrapper rounded-lg"><img src={demo2} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => {setDemoTheme(2,'ltr'); setDemoToggle(!demoToggle)}} data-theme="2" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 2</h5>
							</div>
							<div className="col-xl-4 col-md-6 mb-4">
								<div className="overlay-bx dlab-demo-bx ">
									<div className="overlay-wrapper rounded-lg"><img src={demo3} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => {setDemoTheme(3,'ltr'); setDemoToggle(!demoToggle)}} data-theme="3" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 3</h5>
							</div>
							<div className="col-xl-4 col-md-6 mb-4">
								<div className="overlay-bx dlab-demo-bx ">
									<div className="overlay-wrapper rounded-lg"><img src={demo4} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => {setDemoTheme(4,'ltr'); setDemoToggle(!demoToggle)}} data-theme="4" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 4</h5>
							</div>
							<div className="col-xl-4 col-md-6 mb-4">
								<div className="overlay-bx dlab-demo-bx ">
									<div className="overlay-wrapper rounded-lg"><img src={demo5} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => {setDemoTheme(5,'ltr'); setDemoToggle(!demoToggle)}} data-theme="5" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 5</h5>
							</div>
							<div className="col-xl-4 col-md-6 mb-4">
								<div className="overlay-bx dlab-demo-bx ">
									<div className="overlay-wrapper rounded-lg"><img src={demo6} alt="" className="w-100" /></div>
									<div className="overlay-layer">
										<Link to={"#"} onClick={() => {setDemoTheme(6,'ltr'); setDemoToggle(!demoToggle)}} data-theme="6" className="btn dlab_theme_demo btn-secondary btn-sm mr-2">Default</Link>
									</div>
								</div>
								<h5 className="text-white">Demo 6</h5>
							</div>								
						</div>
					</div>	
					<div className="fs-12 pt-3">
						<span className="text-danger">*Note :</span>
						This theme switcher is not part of product. It is only for demo. you will get all guideline in documentation. please check 
						<Link to={"https://jiade.dexignlab.com/react/doc/"}  className="text-secondary"> documentation.</Link>
					</div>
				</div>
		</div>
	</>
  );
};

export default Setting;


