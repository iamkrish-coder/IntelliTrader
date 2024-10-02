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
      className={`dlabnav ${path === "dashboard" || path === "dashboard-dark" ? 'follow-info' : ''} ${iconHover} ${sidebarposition.value === "fixed" &&
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

          <div className="copyright">
            <p className="fs-12">Made with
              <span className="heart"
                onClick={(e) => e.target.classList.toggle('heart-blast')}
              ></span>
              by iamkrish-coder
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
