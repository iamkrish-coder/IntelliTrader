import React from 'react';
import { SVGICON } from '../constant/theme';
import { Link } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';

const tableData = [
    {amount:'+$5,553',name:'Topup', icon: SVGICON.TopUpIcon, status:'Completed', color:'success' },
    {amount:'-$1,000',name:'Withdraw', icon: SVGICON.WithDrowicon , status:'Canceled', color:'danger' },
    {amount:'-$4,553',name:'Withdraw', icon: SVGICON.WithDrowicon , status:'Canceled', color:'danger' },
    {amount:'+$6,152',name:'Topup', icon: SVGICON.TopUpIcon, status:'Completed', color:'success' },
    {amount:'-$1,102',name:'Withdraw', icon: SVGICON.WithDrowicon , status:'Canceled', color:'danger' },
    {amount:'+$5,553',name:'Topup', icon: SVGICON.TopUpIcon, status:'Completed', color:'success' },
    {amount:'-$3,100',name:'Withdraw', icon: SVGICON.WithDrowicon , status:'Canceled', color:'danger' },
];

const RecentActivityTab = () => {
    return (
        <div className="card h-auto">
            <Tab.Container defaultActiveKey="Yesterday">
                <div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
                    <div className="mb-3">
                        <h4 className="card-title">Recent Activity</h4>
                        <p className="mb-0 fs-13">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                    <Nav as="ul" className="nav-pills">
                        <Nav.Item as="li">
                            <Nav.Link eventKey={'Yesterday'}>Yesterday</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey={'Today'} >Today</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="card-body tab-content pt-0 pb-sm-0 pb-3">
                    <Tab.Pane eventKey={'Yesterday'}>
                        <div className="table-responsive">
                            <table className="table portfolio-table">
                                <tbody>
                                    {tableData.map((data, i)=>(
                                        <tr key={i}>
                                            <td>	
                                                {data.icon}                                               
                                            </td>
                                            <td>
                                                <span className="font-w600 text-dark">{data.name}</span>
                                            </td>
                                            <td>
                                                <span className="text-dark">06:24:45 AM</span>
                                            </td>
                                            <td>
                                                <span className="font-w600 text-dark">{data.amount}</span>
                                            </td>
                                            <td className="text-end"><Link to={"#"} className={`btn-link text-${data.color}`} >Completed</Link></td>
                                        </tr>
                                    ))}                               
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey={'Today'}>
                        <div className="table-responsive">
                            <table className="table portfolio-table">
                                <tbody>
                                    {tableData.map((data, i)=>(
                                        <tr key={i}>
                                            <td>	
                                                {data.icon}                                               
                                            </td>
                                            <td>
                                                <span className="font-w600 text-dark">{data.name}</span>
                                            </td>
                                            <td>
                                                <span className="text-dark">06:24:45 AM</span>
                                            </td>
                                            <td>
                                                <span className="font-w600 text-dark">{data.amount}</span>
                                            </td>
                                            <td className="text-end"><Link to={"#"} className={`btn-link text-${data.color}`} >Completed</Link></td>
                                        </tr>
                                    ))}                               
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </div>
            </Tab.Container>
        </div>
    );
};

export default RecentActivityTab;