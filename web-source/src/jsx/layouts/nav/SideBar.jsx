import React, { useReducer, useContext, useEffect, useState } from "react";
import { Collapse } from 'react-bootstrap';
/// Link
import { Link } from "react-router-dom";
import { MenuList } from './Menu';

import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import SidebarExtraContent from "./SidebarExtraContent";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {
  let Latest = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )


  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title })
        }
        item.content?.forEach(ele => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title })
          }
        })
      })
    })
  }, [path]);

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${path === "dashboard" || path === "index-2" ? 'follow-info' : ''} ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >

      <SidebarExtraContent />
      <span className="main-menu">Main Menu</span>
      <div className="menu-scroll">
        <div className="dlabnav-scroll">
          <ul className="metismenu" id="menu">
            {MenuList.map((data, index) => {
              let menuClass = data.classsChange;
              if (menuClass === "menu-title") {
                return (
                  <li className={`nav-label ${menuClass}`} key={index} >{data.title}</li>
                )
              } else {
                return (
                  <li className={` ${state.active === data.title ? 'mm-active' : ''}${data.to === path ? 'mm-active' : ''}`}
                    key={index}
                  >
                    {data.content && data.content.length > 0 ?
                      <>
                        <Link to={"#"}
                          className="has-arrow"
                          onClick={() => { handleMenuActive(data.title) }}
                        >
                          {data.iconStyle}
                          <span className="nav-text">{data.title}</span>
                          <span className="badge badge-xs style-1 badge-danger">{data.update}</span>
                        </Link>
                        <Collapse in={state.active === data.title ? true : false}>
                          <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                            {data.content && data.content.map((data, index) => {
                              return (
                                <li key={index}
                                  className={`${state.activeSubmenu === data.title ? "mm-active" : ""}${data.to === path ? 'mm-active' : ''}`}
                                >
                                  {data.content && data.content.length > 0 ?
                                    <>
                                      <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                        onClick={() => { handleSubmenuActive(data.title) }}
                                      >
                                        {data.title}
                                      </Link>
                                      <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                          {data.content && data.content.map((data, index) => {
                                            return (
                                              <li key={index}>
                                                <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                              </li>
                                            )
                                          })}
                                        </ul>
                                      </Collapse>
                                    </>
                                    :
                                    <Link to={data.to}
                                      className={`${data.to === path ? 'mm-active' : ''}`}
                                    >
                                      {data.title}
                                    </Link>
                                  }
                                </li>
                              )
                            })}
                          </ul>
                        </Collapse>
                      </>
                      :
                      <Link to={data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                      </Link>
                    }
                  </li>
                )
              }
            })}
          </ul>
          <div className="support-box">
            <div className="media">
              <span>
                <svg width="40" height="46" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#fff"
                    d="M14 8.3v-2.3c0-3.3-2.7-6-6-6s-6 2.7-6 6v2.3c-1.2 0.5-2 1.7-2 3.1v1.2c0 1.8 1.3 3.2 3 3.4h2v-8h-1v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2h-1v8h2c1.7-0.2 3-1.7 3-3.4v-1.2c0-1.4-0.8-2.6-2-3.1zM4 15h-1v-6h1v6zM13 15h-1v-6h1v6z"
                  />
                </svg>
              </span>
            </div>
            <div className="info">
              <p>IntelliTrader - A cutting-edge algorithmic trading application</p>
              <Link to={"#"} className="btn bg-white text-black w-75 btn-sm">Supports</Link>
            </div>
          </div>
          <div className="copyright">
            <p><strong>IntelliTrader - A cutting-edge algorithmic trading application</strong> © <span className="current-year">{Latest.getFullYear()}</span> All Rights Reserved</p>
            <p className="fs-12">Made with
              <span className="heart"
                onClick={(e) => e.target.classList.toggle('heart-blast')}
              ></span>
              by DexignLab
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SideBar;
