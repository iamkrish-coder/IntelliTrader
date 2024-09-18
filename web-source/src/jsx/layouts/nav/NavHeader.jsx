import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import { navtoggle } from "../../../store/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";

const NavHeader = () => {
  const { openMenuToggle } = useContext(
    ThemeContext
  );
  const dispatch = useDispatch();
  const sideMenu = useSelector(state => state.sideMenu);
  const handleToogle = () => {
    dispatch(navtoggle());
  };
  return (
    <div className="nav-header">
        <Link to="/dashboard" className="brand-logo">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="24.000000pt" height="24.000000pt" viewBox="0 0 180.000000 180.000000"
                 preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)"
                   fill="#ffd500" stroke="none">
                    <path d="M105 1781 c-48 -22 -69 -44 -90 -94 -13 -32 -15 -134 -15 -789 0
-709 2 -755 19 -793 22 -48 44 -69 94 -90 32 -13 134 -15 789 -15 709 0 755 2
793 19 48 22 69 44 90 94 13 32 15 134 15 787 0 653 -2 755 -15 787 -21 50
-42 72 -90 94 -38 18 -84 19 -795 19 -711 0 -757 -1 -795 -19z m366 -294 c19
-13 40 -39 48 -61 13 -33 13 -44 0 -79 -39 -113 -196 -115 -238 -3 -42 111 90
211 190 143z m1059 -122 l0 -65 -80 0 -80 0 0 -438 0 -438 -25 -50 c-42 -84
-57 -88 -293 -92 -223 -4 -228 -2 -198 56 32 62 60 72 205 72 l131 0 0 445 0
445 -165 0 -165 0 0 -120 0 -120 -90 0 -90 0 0 123 c0 108 3 127 23 162 12 22
38 50 56 62 34 23 35 23 402 23 l369 0 0 -65z m-1040 -620 l0 -335 80 0 c89 0
93 -4 60 -57 -31 -52 -64 -67 -141 -67 -73 0 -103 14 -142 65 -32 44 -37 95
-37 417 l0 312 90 0 90 0 0 -335z"/>
                </g>
            </svg>
            <div className="brand-title">
                IntelliTrader
            </div>
        </Link>

        <div
            className="nav-control"
            onClick={() => {
                handleToogle();
                openMenuToggle();
            }}
        >
            <div className={`hamburger ${sideMenu ? "is-active" : ""}`}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </div>
    </div>
  );
};

export default NavHeader;
