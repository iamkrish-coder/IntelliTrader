import React from 'react';
import { Dropdown, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FutureOrderTable from './FutureOrderTable';
import FutureHistory from './FutureHistory';
import FutureTrade from './FutureTrade';
import FutureChart from './FutureChart';

const orderTable = [
    {color:'text-success', price:'19972.43', size:'0.0488', total:'6.8312'},
    {color:'text-danger', price:'20972.43 ', size:'0.0588', total:'5.8312'},
    {color:'text-success', price:'19972.43', size:'0.0188', total:'7.8310'},
    {color:'text-danger', price:'19850.20', size:'0.0210', total:'1.0310'},
    {color:'text-success', price:'20972.43', size:'0.0654', total:'2.3314'},
    {color:'text-danger', price:'20972.43', size:'0.0123', total:'3.6313'},
    {color:'text-success', price:'19972.43', size:'0.0147', total:'4.5315'},
    {color:'text-danger', price:'19850.20', size:'0.0120', total:'2.4316'},
    {color:'text-danger', price:'20972.43', size:'0.0320', total:'1.3317'},
    {color:'text-success', price:'19850.20', size:'0.0388', total:'2.1319'},
];

const FutureTrading = () => {
    return (
        <>        
            <div className="row">
                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-body">                            
                            <div className="d-flex align-items-end justify-content-between flex-wrap">
                                <div className="price-content">
                                    <span className="d-block mb-2">Price</span>
                                    <h4 className="fs-20 font-w600 mb-0">$9,542.39</h4>
                                </div>
                                <div className="price-content">
                                    <span className="fs-14 d-block mb-2">24h% change</span>
                                    <h4 className="font-w600 text-success mb-0">1.64%<i className="fa-solid fa-caret-up ms-1 text-success"></i></h4>
                                </div>
                                <div className="price-content">
                                    <span className="fs-14 d-block mb-2">Volume (24h)</span>
                                    <h4 className="font-w600 mb-0">$47.22B</h4>
                                </div>
                                <div className="price-content">
                                    <span className="fs-14 d-block mb-2">Market Cap</span>
                                    <h4 className="font-w600 mb-0">$219.24B</h4>
                                </div>
                            </div>
                            <FutureChart />                            
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title mb-0">Future Trade</h4>
                        </div>
                        <div className="card-body pt-2">
                            <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                                <span className="small text-muted">Avbl Balance</span>
                                <span className="text-dark">210.800 USDT</span>
                            </div>
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Price</span>
                                    <input type="text" className="form-control" />
                                    <span className="input-group-text">USDT</span>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Size</span>
                                    <input type="text" className="form-control" />                               
                                    <Dropdown className='drop-future'>
                                        <Dropdown.Toggle className="btn btn-primary btn-outline-primary left-radius">USDT</Dropdown.Toggle>
                                        <Dropdown.Menu as="ul" className="dropdown-menu-end " align="end">
                                            <li><Link to={"#"} className="dropdown-item">USDT</Link></li>
                                            <li><Link to={"#"} className="dropdown-item">BTC</Link></li>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="mb-3 mt-4">
                                    <label className="form-label">TP/SL</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Take Profit" />                                    
                                        <Dropdown className='drop-future'>
                                            <Dropdown.Toggle className="btn btn-primary btn-outline-primary left-radius">Mark</Dropdown.Toggle>
                                            <Dropdown.Menu as="ul" className="dropdown-menu-end" align="end">
                                                <li><Link to={"#"} className="dropdown-item">Last</Link></li>
                                                <li><Link to={"#"} className="dropdown-item">Mark</Link></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="input-group mb-3"><input type="text" className="form-control" placeholder="Stop Loss" />                                    
                                        <Dropdown className='drop-future'>
                                            <Dropdown.Toggle className="btn btn-primary btn-outline-primary left-radius">Mark</Dropdown.Toggle>
                                            <Dropdown.Menu as="ul" className="dropdown-menu-end" align="end">
                                                <li><Link to={"#"} className="dropdown-item">Last</Link></li>
                                                <li><Link to={"#"} className="dropdown-item">Mark</Link></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stop Price</span>
                                    <input type="text" className="form-control" />
                                    <Dropdown className='drop-future'>
                                        <Dropdown.Toggle className="btn btn-primary btn-outline-primary left-radius">Mark</Dropdown.Toggle>
                                        <Dropdown.Menu as="ul" className="dropdown-menu-end" align="end">
                                            <li><Link to={"#"} className="dropdown-item">Limit</Link></li>
                                            <li><Link to={"#"} className="dropdown-item">Mark</Link></li>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="d-flex">
                                        <div className="">Cost</div>
                                        <div className="text-muted px-1"> 0.00 USDT</div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="">Max</div>
                                        <div className="text-muted px-1"> 6.00 USDT </div>
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    <Link to={"#"} className="btn btn-success btn-sm light text-uppercase me-3 btn-block">BUY</Link>
                                    <Link to={"#"} className="btn btn-danger btn-sm light text-uppercase btn-block">Sell</Link>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
            <div className="row">
				<div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title mb-2">Order Book</h4>
                        </div>
                        <div className="card-body pt-2 dlab-scroll height400">
                            <table className="table shadow-hover orderbookTable">
                                <thead>
                                    <tr>
                                        <th>Price(USDT)</th>
                                        <th>Size(USDT)</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderTable.map((item, i)=>(
                                        <tr key={i}>
                                            <td>
                                                <span className={`${item.color}`}>{item.price}</span>
                                            </td>
                                            <td>{item.size}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>                
                </div>
                <div className="col-xl-8">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Order'}>                            
                            <div className="card-header border-0 pb-3 flex-wrap">
                                <h4 className="card-title">Trade Status</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link as="button" eventKey="Order">Order</Nav.Link>
                                        <Nav.Link as="button" eventKey="History">Order History</Nav.Link>
                                        <Nav.Link as="button" eventKey="Trade">Trade Histroy</Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            <div className="card-body pt-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="Order">
                                        <FutureOrderTable />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="History">
                                        <FutureHistory />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Trade">
                                        <FutureTrade />
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>                            
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FutureTrading;