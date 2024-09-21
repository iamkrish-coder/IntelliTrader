import React from 'react';

import Bitcoin from './../../../assets/images/svg/bitcoin-1.svg';
import Ethereum from './../../../assets/images/svg/ethereum-1.svg';
import Ripple from './../../../assets/images/svg/ripple-1.svg';
import Litecoin from './../../../assets/images/svg/litecoin-1.svg';
import {DefaultChart} from './CardWidgetChart';
import { SVGICON } from '../../constant/theme';
import MarketListTable from './MarketListTable';
import { Nav, Tab } from 'react-bootstrap';
import SpotTab from './SpotTab';
import FutureTab from './FutureTab';
import NewLisitngTab from './NewLisitngTab';

const sampleData1 = [8, 7, 6, 3, 2, 4, 6, 8, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17];
const sampleData2 = [19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 8, 7, 6, 3, 2, 7, 6, 8];
const sampleData3 = [20, 18, 16, 12, 8, 10, 13, 15, 12, 6, 12, 13, 10, 18, 14, 16, 17, 15, 19, 16, 16, 14, 18, 21, 13, 15, 18, 17, 21, 11, 14, 19, 21, 17];

const cardWidgetBlog = [
    {amount:'65,123', logo:Bitcoin , color:'#ffab2d', chartdata:sampleData1 },
    {amount:'2,551', logo:Ethereum , color:'#DC3CCC', chartdata:sampleData2 },
    {amount:'3,541', logo:Ripple , color:'#2B98D6', chartdata:sampleData1 },
    {amount:'5,329', logo:Litecoin , color:'#5F5F5F', chartdata:sampleData3 },
];

const TradingMarket = () => {
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="row">     
                    {cardWidgetBlog.map((item, i)=>(             
                        <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6" key={i}>
                            <div className="card trad-card overflow-hidden">
                                <div className="card-header border-0 pb-0 card-bx">
                                    <div className="me-auto">
                                        <h2 className="text-dark mb-2 font-w600">${item.amount}</h2>
                                        <p className="mb-1 fs-13">
                                            {SVGICON.SmallChartSvg}{" "}
                                            4%(30 days)
                                        </p>
                                    </div>
                                    <img src={item.logo} alt="" />	
                                </div>
                                <div className="card-body p-0">                                
                                    <DefaultChart  color={item.color} chartdata={item.chartdata}/>                                    
                                </div>
                            </div>
                        </div>        
                    ))}            
                </div>
            </div>
            <div className="col-xl-12">
                <div className="card">
                    <Tab.Container defaultActiveKey="All">
                        <div className="card-header flex-wrap border-0">
                            <h4 className="card-title mb-lg-0 mb-2">Trading Market List</h4>
                            <Nav as="ul" className="nav-pills light">
                                <Nav.Item as="li" className="nav-item my-1">
                                    <Nav.Link eventKey={'All'} >All Cryptos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" className="nav-item my-1">
                                    <Nav.Link eventKey={'Spot'} >Spot Markets</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" className="nav-item my-1">
                                    <Nav.Link eventKey={'Future'}>Future Markets</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li" className="nav-item my-1">
                                    <Nav.Link eventKey={'Listing'} className="me-0">New Listing</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="card-body pt-0">
                            <Tab.Content>
                                <Tab.Pane eventKey={'All'} >
                                    <MarketListTable />
                                </Tab.Pane>
                                <Tab.Pane eventKey={'Spot'}>
                                    <SpotTab />
                                </Tab.Pane> 
                                <Tab.Pane eventKey={'Future'}>
                                    <FutureTab />
                                </Tab.Pane>
                                <Tab.Pane eventKey={'Listing'}>
                                    <NewLisitngTab />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container> 
                </div>
            </div>
        </div>
    );
};

export default TradingMarket;
