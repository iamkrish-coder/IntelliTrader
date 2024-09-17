import React, { useContext, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

//Import 
import { SVGICON } from '../../constant/theme';
import MainSlider from '../../elements/dashboard/MainSlider';
import StatisticsBlog from '../../elements/dashboard/StatisticsBlog';
import MarketOverViewBlog from '../../elements/dashboard/MarketOverViewBlog';
import RecentTransaction from '../../elements/dashboard/RecentTransaction';
import { ThemeContext } from '../../../context/ThemeContext';

//Charts
// const SurveyChart = loadable(() =>
//  	pMinDelay(import("../../elements/dashboard/SurveyChart"), 500)
// );

export function MainComponent(){
	return(
		<Row>
			<Col xl={12}>			
				<div className="row main-card">
					<MainSlider />
				</div>
				<Row>
					<div className="col-xl-6">
						<div className="card crypto-chart">
							<div className="card-header pb-0 border-0 flex-wrap">
								<div className="mb-0">
									<h4 className="card-title">Crypto Statistics</h4>
									<p>Lorem ipsum dolor sit amet, consectetur</p>
								</div>
								<div className="d-flex mb-2">
									<div className="form-check form-switch toggle-switch me-3">
										<label className="form-check-label" htmlFor="flexSwitchCheckChecked1">Date</label>
										<input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked1" defaultChecked />
									</div>
									<div className="form-check form-switch toggle-switch">
										<label className="form-check-label" htmlFor="flexSwitchCheckChecked2">Value</label>
										<input className="form-check-input custome" type="checkbox" id="flexSwitchCheckChecked2" defaultChecked />
									</div>
								</div>
							</div>
							<StatisticsBlog />
						</div>
					</div>
					<div className="col-xl-6">
						<div className="card market-chart">
							<div className="card-header border-0 pb-0 flex-wrap">
								<div className="mb-0">
									<h4 className="card-title">Market Overview</h4>
									<p>Lorem ipsum dolor sit amet, consectetur</p>
								</div>
								<Link to={"#"} className="btn-link text-primary get-report mb-2">
									{SVGICON.GetReportIcon}
									Get Report
								</Link>
							</div>
							<MarketOverViewBlog />
						</div>
					</div>
				</Row>
				<Col lg={12}>
					<RecentTransaction /> 
				</Col>
			</Col>
		</Row>
	)
}

const Home = () => {	
	// const { changeBackground } = useContext(ThemeContext);
	// useEffect(() => {
	// 	changeBackground({ value: "light", label: "Light" });
	// }, []);	


	const locact = useLocation()
	
	const { changeBackground, 
		changeNavigationHader,
		chnageHaderColor,
		changePrimaryColor,
		changeSideBarStyle,
		changeSideBarLayout,
		chnageSidebarColor
	} = useContext(ThemeContext);
	useEffect(() => {

		switch (locact.search) {
			case "?theme=1" :
				changeBackground({ value: "light", label: "Light" });				
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				changePrimaryColor('color_1')
				break;
			case "?theme=2":
					changeBackground({ value: "light", label: "Light" });
					changeSideBarStyle({ value: "mini", label: "Mini" });
					changeNavigationHader('color_13')
					chnageHaderColor('color_13')
					changePrimaryColor('color_13')
				break;
			case "?theme=4":
				changeBackground({ value: "light", label: "Light" });
				changeSideBarLayout({ value: "horizontal", label: "Horizontal" });
				changeSideBarStyle({ value: "full", label: "Full" });
				changeNavigationHader('color_1')
				chnageHaderColor('color_1')
				chnageSidebarColor('color_7')
				changePrimaryColor('color_7')
				break;

			case "?theme=5" :
				changeBackground({ value: "light", label: "Light" });
				changeSideBarLayout({ value: "horizontal", label: "Horizontal" });
				changeSideBarStyle({ value: "full", label: "Full" });
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				chnageSidebarColor('color_1')
				changePrimaryColor('color_1')
				break;
			case "?theme=6":
				changeBackground({ value: "light", label: "Light" });				
				changeNavigationHader('color_10')
				chnageHaderColor('color_13')
				chnageSidebarColor('color_10')
				changePrimaryColor('color_13')
			break;
			default:
				changeBackground({ value: "light", label: "Light" });				
				changeNavigationHader('color_3')
				chnageHaderColor('color_3')
				changePrimaryColor('color_1')
				break;
		}
			
	}, [locact.pathname]);	
	return(
		<>
			<MainComponent />
		</>
	)
}
 
export default Home ;