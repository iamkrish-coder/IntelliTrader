import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BackgroundImage from "../common/BackgroundImage";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation} from "react-router-dom";
import "./home-page.css"

const HomePage = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const redirectToLoginPage=()=> {
    navigate("/login");
    }

    return (

        <div className="home-page-container">
            <div className="wrapper">
                <ul className="scene unselectable" data-friction-x="0.1" data-friction-y="0.1" data-scalar-x="25" data-scalar-y="15" id="scene">
                    <li className="layer" data-depth="0.00"></li>

                    <li className="layer" data-depth="0.10">
                        <BackgroundImage src="/vendor-assets/images/background.jpg" className=""/>
                    </li>


                    <li className="layer" data-depth="0.20">
                        <div className="title-text">
                            <h1 className="custom-h1">IntelliTrader</h1>
                        </div>
                    </li>


                    <li className="layer" data-depth="0.25">
                        <div className="sphere">
                            <img alt="sphere" src="/vendor-assets/images/sphere.svg"/>
                        </div>
                    </li>


                    <li className="layer" data-depth="0.30">
                        <div className="hero">
                            <h1 className="custom-h1" id="countdown">
                                Market Opens in ...
                            </h1>

                            <p className="sub-title">
                                A cutting-edge algorithmic trading application, coming soon!
                            </p>
                        </div>
                    </li>

                    <li className="layer" data-depth="0.40">
                        <div className="depth-1 flake1">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth1/flakes1.png"/>
                        </div>

                        <div className="depth-1 flake2">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth1/flakes2.png"/>
                        </div>

                        <div className="depth-1 flake3">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth1/flakes3.png"/>
                        </div>

                        <div className="depth-1 flake4">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth1/flakes4.png"/>
                        </div>
                    </li>

                    <li className="layer" data-depth="0.50">
                        <div className="depth-2 flake1">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth2/flakes1.png"/>
                        </div>

                        <div className="depth-2 flake2">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth2/flakes2.png"/>
                        </div>
                    </li>

                    <li className="layer" data-depth="0.60">
                        <div className="depth-3 flake1">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth3/flakes1.png"/>
                        </div>

                        <div className="depth-3 flake2">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth3/flakes2.png"/>
                        </div>

                        <div className="depth-3 flake3">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth3/flakes3.png"/>
                        </div>

                        <div className="depth-3 flake4">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth3/flakes4.png"/>
                        </div>
                    </li>

                    <li className="layer" data-depth="0.80">
                        <div className="depth-4">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth4/flakes.png"/>
                        </div>
                    </li>

                    <li className="layer" data-depth="1.00">
                        <div className="depth-5">
                            <img alt="flake" src="/vendor-assets/images/flakes/depth5/flakes.png"/>
                        </div>
                    </li>


                    <li className="layer" data-depth="0.20">
                        <div className="btnGetStarted"><Button onClick= { redirectToLoginPage } variant="success"> Get Started </Button></div>

                        <div className="contact">
                            <ul className="icons">
                                <li>
                                    <a className="twitter" href="#"><FontAwesomeIcon icon={faXTwitter}/></a>
                                </li>
                                <li>
                                    <a className="github" href="#"><FontAwesomeIcon icon={faGithub}/></a>
                                </li>
                            </ul>
                            <a className="mail"
                               href="mailto:krishnan.sri92@gmail.com?subject=Feedback!">krishnan.sri92@gmail.com</a>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default HomePage;