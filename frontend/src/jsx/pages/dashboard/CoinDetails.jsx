import React,{useState} from 'react';
import { SVGICON } from '../../constant/theme';
import { Link } from 'react-router-dom';
import { Modal, Tab , Nav} from 'react-bootstrap';
import CoinDetailChartCard from '../../elements/CoinDetailChartCard';
import DigitalCashBit from '../../elements/DigitalCashBit';
import QuickTrade from '../../elements/QuickTrade';
import BuyOrder from '../../elements/BuyOrder';
import SellOrder from '../../elements/SellOrder';

const CoinDetails = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div className="row">
                <Tab.Container defaultActiveKey={'Bitcoin'}>
                    <div className="col-xl-12">  
                        <div className="coin-warpper d-flex align-items-center justify-content-between flex-wrap">
                            <div>
                                <Nav as="ul" className="nav-pills">
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Bitcoin" className="bitcoin ms-0">
                                            {SVGICON.BtcSvgIcon}
                                            Bitcoin
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Ethereum" className="etherum" >  
                                            {SVGICON.EthSvgIcon}
                                            Ethereum
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Dash" className=" dash">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0V0ZM7.04462 11.1428H10.4732C10.9466 11.1428 11.3304 11.5265 11.3304 12C11.3304 12.4735 10.9466 12.8572 10.4732 12.8572H7.04462C6.57116 12.8572 6.18742 12.4735 6.18742 12C6.18742 11.5265 6.57142 11.1428 7.04462 11.1428ZM17.7624 9.92331L16.7315 15.0812C16.4887 16.2784 15.4374 17.1401 14.2158 17.1429H7.04462C6.57116 17.1429 6.18742 16.7592 6.18742 16.2857C6.18742 15.8123 6.57142 15.4285 7.04462 15.4285H14.2158C14.621 15.4275 14.9697 15.1418 15.0503 14.7448L16.0814 9.58692C16.173 9.12654 15.8743 8.67924 15.4141 8.58768C15.3595 8.57696 15.304 8.57147 15.2486 8.57147H8.75902C8.28556 8.57147 7.90182 8.18773 7.90182 7.71427C7.90182 7.24081 8.28556 6.85707 8.75902 6.85707H15.2486C16.6648 6.85759 17.8123 8.00567 17.8121 9.42186C17.8121 9.59006 17.7953 9.75799 17.7624 9.92331V9.92331Z" fill="#3693FF"/>
                                            </svg>
                                            Dash
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Litecoin" className="litcoin">
                                            {SVGICON.LtcSvgIcon}
                                            Litecoin
                                        </Nav.Link>

                                    </Nav.Item>                               
                                    <button type="button" className="nav-link litcoin mt-0" onClick={(()=>setOpenModal(true))}>
                                        {SVGICON.ThreeDotsSvg}    
                                        {" "}
                                        More Crypto
                                    </button>                                
                                </Nav>
                            </div>
                            <div className="input-group search-area w-auto coin-tab-search mt-xl-0 mt-2">
                                <input type="text" className="form-control" placeholder="Search here..." />
                                <span className="input-group-text">
                                    <Link to={"#"}>
                                        {SVGICON.SearchIconSvg}
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <Tab.Content >
                            <Tab.Pane eventKey="Bitcoin">
                                <div className="row">
                                    <div className="col-xl-9">
                                        <CoinDetailChartCard />
                                    </div>
                                    <div className="col-xl-3 col-sm-12">
                                        <DigitalCashBit 
                                            icon = {SVGICON.BitDetailEty}
                                            name="Bitcoin"
                                            amount = "1 BITCOIN = 43,474.50 USD"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <QuickTrade />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <BuyOrder />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <SellOrder /> 
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Ethereum">
                                <div className="row">
                                    <div className="col-xl-9">
                                        <CoinDetailChartCard />
                                    </div>
                                    <div className="col-xl-3 col-sm-12">
                                        <DigitalCashBit 
                                            icon = {SVGICON.EthDetailEty}
                                            name="Eth"
                                            amount = "1 ETH = 32,124.50 USD"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <QuickTrade />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <BuyOrder />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <SellOrder /> 
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Dash">
                                <div className="row">
                                    <div className="col-xl-9">
                                        <CoinDetailChartCard />
                                    </div>
                                    <div className="col-xl-3 col-sm-12">
                                        <DigitalCashBit 
                                            icon = {SVGICON.DashDetailEty}
                                            name="Dash"
                                            amount = "1 DASH = 40,599.50 USD"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <QuickTrade />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <BuyOrder />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <SellOrder /> 
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Litecoin">
                                <div className="row">
                                    <div className="col-xl-9">
                                        <CoinDetailChartCard />
                                    </div>
                                    <div className="col-xl-3 col-sm-12">
                                        <DigitalCashBit 
                                            icon = {SVGICON.LitCoinDetaiEty}
                                            name="Litecoin"
                                            amount = "1 LITECOIN = 42,101.50 USD"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <QuickTrade />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <BuyOrder />
                                    </div>
                                    <div className="col-xl-3 col-sm-6">
                                        <SellOrder /> 
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div>
            <Modal centered show={openModal} onHide={setOpenModal}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Crypto Title</h1>
                    <button type="button" className="btn-close" onClick={(()=>setOpenModal(false))}></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Crypto Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Bitcoin" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={(()=>setOpenModal(false))}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>                
            </Modal>
        </>
    );
};

export default CoinDetails;