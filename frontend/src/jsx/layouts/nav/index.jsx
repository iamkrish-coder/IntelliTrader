import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHeader from "./NavHeader";
import Header from "./Header";
import ChatBox from "../ChatBox";

import bgimg from '../../../assets/images/bg-1.png';

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]  

  return (
    <Fragment>
        {
          path === "dashboard" || path === "dashboard-dark" ? 
            <div className="header-banner" style={{backgroundImage:`url(${bgimg})`}}></div>
            :
            ""
       }
      <NavHeader />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      <SideBar />
    </Fragment>
  );
};

export default JobieNav;
