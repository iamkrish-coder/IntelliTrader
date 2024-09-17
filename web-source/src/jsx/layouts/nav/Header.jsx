import React,{ useContext, useEffect, useState} from "react";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/// Image
import profile from "../../../assets/images/user.jpg";
import avatar from "../../../assets/images/avatar/1.jpg";

import { ThemeContext } from "../../../context/ThemeContext";
import  Logout  from "../nav/Logout";
import { SVGICON } from "../../constant/theme";

const listBlog = [
  { icon:SVGICON.LtcSvgIcon, name:'LTC in DexignLab'},
  { icon:SVGICON.BtcSvgIcon, name:'BTC/USD in DexignLab'},
  { icon:SVGICON.EthSvgIcon, name:'ETH/USD Dlab '},
  { icon:SVGICON.BtcSvgIcon, name:'BTC/USD in DexignLab'},
  { icon:SVGICON.EthSvgIcon, name:'ETH/USD Dlab '},
  { icon:SVGICON.LtcSvgIcon, name:'LTC in DexignLab'},  
];

const Header = ({ onNote }) => {
  const [headerFix, setheaderFix] = useState(false);
  
  function CommanScroll(){
    setheaderFix(window.scrollY > 50);
  }

  useEffect(() => {
    window.addEventListener("scroll", CommanScroll);
    return()=>{
        window.removeEventListener("scroll", CommanScroll)
    }
  }, [])
  

  const {background, changeBackground, 
    headWallet,setHeadWallet } = useContext(ThemeContext);
    const handleThemeMode = () => {
      if(background.value === 'dark'){
        changeBackground({ value: "light", label: "Light" });
      }else{
        changeBackground({ value: "dark", label: "Dark" });
      }
    }

    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    const pathtitle = window.location.pathname.split("/");
    const name = pathtitle[pathtitle.length - 1].split("-");
    const filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
    const finalName = filterName.includes("app")
      ? filterName.filter((f) => f !== "app")
      : filterName.includes("ui")
      ? filterName.filter((f) => f !== "ui")
      : filterName.includes("uc")
      ? filterName.filter((f) => f !== "uc")
      : filterName.includes("basic")
      ? filterName.filter((f) => f !== "basic")
      : filterName.includes("jquery")
      ? filterName.filter((f) => f !== "jquery")
      : filterName.includes("table")
      ? filterName.filter((f) => f !== "table")
      : filterName.includes("page")
      ? filterName.filter((f) => f !== "page")
      : filterName.includes("email")
      ? filterName.filter((f) => f !== "email")
      : filterName.includes("ecom")
      ? filterName.filter((f) => f !== "ecom")
      : filterName.includes("chart")
      ? filterName.filter((f) => f !== "chart")
      : filterName.includes("editor")
      ? filterName.filter((f) => f !== "editor")
      : filterName;

      function handleActiveWallet(){
        setHeadWallet(!headWallet)        
      }      
      const walletActive = window.matchMedia("(max-width:100rem)").matches
      useEffect(()=>{
        if(walletActive){
          setHeadWallet(true)
        }else{
          setHeadWallet(false)
        }
      },[walletActive])
  
  return (
    <>
      <div className={`header ${path ==="dashboard" || path ==="index-2" ? 'home' : '' } ${headerFix ? 'is-fixed' : '' }`}>
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">                
                <div className="input-group search-area">
                    <input type="text" className="form-control" placeholder="Search here.." />
                    <span className="input-group-text">
                        <Link to={"#"}>
                          {SVGICON.SearchIconSvg}
                        </Link>
                      </span>
                  </div>
              </div>
              <ul className="navbar-nav header-right ">	
                  {/* on mobile size */}
                  <Dropdown as="li" className="nav-item notification_dropdown sm-search">
                      <Dropdown.Toggle to={"#"} className="nav-link i-false" as="div">
                        {SVGICON.SearchIconSvg}
                      </Dropdown.Toggle>
                      <Dropdown.Menu  className="dropdown-menu-end of-visible mt-4">
                        <div className="input-group search-area-2">
                            <input type="text" className="form-control" placeholder="Search Dashboard" autoFocus />
                            <span className="input-group-text">
                              <Link to={"#"}>                              
                                {SVGICON.SearchIconSvg}
                              </Link>
                            </span>
                        </div>
                        <div className="px-3">
                            <h5>Recently Searched:</h5>
                        </div>
                        <div  className="widget-media dlab-scroll p-3" style={{height:"380px"}}>
                          <ul className="timeline">
                            {listBlog.map((data, i)=>(
                                <li key={i}>
                                  <div className="timeline-panel">
                                    <div className="me-2 search-p">
                                      {data.icon}
                                    </div>
                                    <div className="media-body ms-2">
                                      <h6 className="mb-1">{data.name}</h6>
                                      <small className="d-block">#0001</small>
                                    </div>
                                  </div>
                                </li>
                            ))}
                          </ul>
                        </div>
                        <Link to={"#"} className="all-notification">See all notifications <i className="ti-arrow-end" /></Link>
                      </Dropdown.Menu>
                  </Dropdown>
                  {/* end on mobile size */}
                  <li className="nav-item dropdown notification_dropdown">
                      <Link to={"#"} 
                        className={`nav-link bell dz-theme-mode ${background.value === "dark" ? "active" : ""}`}
                        onClick={()=>handleThemeMode()}
                      >
                        {SVGICON.LightSvgIcon}
                        {SVGICON.DarkSvgIcon}
                      </Link>
                  </li>	
                  
                  <li className={`nav-item dropdown notification_dropdown ${path === "dashboard" || path ===  "index-2" ? '' : 'd-none'}`}>
                      <Link to={"#"} className="nav-link  menu-wallet"
                        // onClick={()=>setHeadWallet(!headWallet)}
                        onClick={handleActiveWallet}
                      >
                        {SVGICON.WalletSvgIcon}
                      </Link>
                  </li>		                    
                 
                <Dropdown as="li" className="nav-item notification_dropdown">
                  <Dropdown.Toggle className="nav-link i-false c-pointer icon-bell-effect" variant="" as="a">
                      {SVGICON.HeadBell}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-3">                   
                    <div className="widget-media dz-scroll p-3 height380" style={{height: "380px"}}>
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="images" width={50} src={avatar} />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">KG</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Resport created successfully
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="" width={50} src={avatar} />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-danger">KG</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Resport created successfully
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-primary">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <Link className="all-notification" to="#">
                      See all notifications <i className="ti-arrow-right" />
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="nav-item dropdown notification_dropdown">
                    <Dropdown.Toggle variant="" as="a" className="nav-link bell bell-link i-false c-pointer"
                      onClick={() => onNote()}
                    >
                      {SVGICON.HeadMessage}
                    </Dropdown.Toggle>
                  </Dropdown>	
                <Dropdown as="li" className="nav-item  notification_dropdown">
                    <Dropdown.Toggle variant="" as="a"
                      className="nav-link  ai-icon i-false c-pointer"                      
                    >
                      {SVGICON.HeadNotification}
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-3 dropdown-menu-end">
                    <div className="widget-timeline dlab-scroll style-1 p-3 height370">
                      <ul className="timeline">
                        <li>
                          <div className="timeline-badge primary" />
                          <Link
                            className="timeline-panel c-pointer text-muted"
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
                            className="timeline-panel c-pointer text-muted"
                            to="#"
                          >
                            <span>20 minutes ago</span>
                            <h6 className="mb-0">
                              New order placed{" "}
                              <strong className="text-info">#XF-2356.</strong>
                            </h6>
                            <p className="mb-0">
                              Quisque a consequat ante Sit amet magna at
                              volutapt...
                            </p>
                          </Link>
                        </li>
                        <li>
                          <div className="timeline-badge danger"></div>
                          <Link
                            className="timeline-panel c-pointer text-muted"
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
                            className="timeline-panel c-pointer text-muted"
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
                            className="timeline-panel c-pointer text-muted"
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
                            className="timeline-panel c-pointer text-muted"
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
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="nav-item header-profile2">              
                  <Dropdown.Toggle to={"#"} className="nav-link i-false" as="div">
                    <div className="header-info2 d-flex align-items-center">
											<div className="d-flex align-items-center sidebar-info">
												<div>
													<h5 className="mb-0 text-white">James Supardi</h5>
													<span className="d-block text-end">@ilhamsupardi</span>
												</div>
											</div>
											<img src={profile} alt="profile" />
										</div>                    
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-3 dropdown-menu dropdown-menu-right ">
                      <Link to={"/app-profile"} className="dropdown-item ai-icon icon-bell-effect">
                          {SVGICON.ProfileSvgIcon}
                          <span className="ms-2">Profile </span>
                      </Link>
                      <Link to={"/app-profile"} className="dropdown-item ai-icon ">
                          {SVGICON.MessageSvgIcon}
                        <span className="ms-2">Message </span>
                      </Link>
                      <Link to={"/email-inbox"} className="dropdown-item ai-icon">
                        {SVGICON.NotificationIcon}
                        <span className="ms-2">Notification </span>
                      </Link>      
                      <Link to={"#"} className="dropdown-item ai-icon ">
                        {SVGICON.SettingSvgIcon}
                        <span className="ms-2">Settings </span>
                      </Link>               
                      <Logout />
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </div>
         {path === "dashboard" || path=== "index-2" ? 
            <div className="page-titles">
              <div className="sub-dz-head">
                  <div className="d-flex align-items-center dz-head-title">
                    <h2 className="text-white m-0">Dashboard</h2>
                    <p className="ms-2 text-warning">Welcome Back Yatin Sharma!</p>
                  </div>                      
              </div>	
            </div>          
           :               
            <div className="page-titles">
                <div className="d-flex align-items-center">
                    <h2 className="text-white"
                      style={{ textTransform: "capitalize" }}
                    >
                      {finalName.join(" ").length === 0
                      ? "Dashboard"
                      : finalName.join(" ") === "dashboard dark"
                      ? "Dashboard"
                      : finalName.join(" ")}
                    </h2>
                    <p className="text-warning ms-2">Welcome Back Yatin Sharma !</p>
                </div>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active ms-auto">
                    <Link to={"/"} className="d-flex align-self-center">
                        {SVGICON.HeaderHome}
                        Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item"><Link to={"#"} style={{ textTransform: "capitalize" }}>{finalName.join(" ")}</Link></li>
                </ol>
            </div>
          }
      </div>
     
    </>    
  );
};

export default Header;
