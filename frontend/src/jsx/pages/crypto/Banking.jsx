import React from 'react';
import Select from 'react-select';

import DonughtChart from '../../elements/dashboard/DonughtChart';
import BusinessBarChart from './BusinessBarChart';
import { IMAGES, SVGICON } from '../../constant/theme';
import { Link } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import MoneyFlowChart from './MoneyFlowChart';


const option = [
    { value: '1', label: 'Monthly' },
    { value: '2', label: 'Daily' },
    { value: '3', label: 'Weekly' },
];

const tableData = [
    { amount: '-$4,553', name: 'Withdraw', icon: SVGICON.WithDrowicon, status: 'Canceled', color: 'danger' },
    { amount: '+$6,152', name: 'Topup', icon: SVGICON.TopUpIcon, status: 'Completed', color: 'success' },
    { amount: '+$5,553', name: 'Topup', icon: SVGICON.TopUpIcon, status: 'Completed', color: 'success' },
    { amount: '-$1,000', name: 'Withdraw', icon: SVGICON.WithDrowicon, status: 'Canceled', color: 'danger' },
    { amount: '-$1,102', name: 'Withdraw', icon: SVGICON.WithDrowicon, status: 'Canceled', color: 'danger' },
];


const Banking = () => {
    return (
        <div className="row">
            <div className="col-xl-9 col-xxl-8">
                <div className="row">
                    <div className="col-xl-4 col-sm-6">
                        <div className="card banking-card">
                            <div className="card-header border-0 flex-wrap pb-0">
                                <div className="revenue-date">
                                    <span>Business</span>
                                    <h4>$310.435</h4>
                                </div>
                                <div className="setting bgl-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="24px" height="24px"
                                        viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <rect fill="var(--primary)" opacity="0.3" x="11.5" y="2" width="2"
                                                height="4" rx="1" />
                                            <rect fill="var(--primary)" opacity="0.3" x="11.5" y="16" width="2"
                                                height="5" rx="1" />
                                            <path
                                                d="M15.493,8.044 C15.2143319,7.68933156 14.8501689,7.40750104 14.4005,7.1985 C13.9508311,6.98949895 13.5170021,6.885 13.099,6.885 C12.8836656,6.885 12.6651678,6.90399981 12.4435,6.942 C12.2218322,6.98000019 12.0223342,7.05283279 11.845,7.1605 C11.6676658,7.2681672 11.5188339,7.40749914 11.3985,7.5785 C11.2781661,7.74950085 11.218,7.96799867 11.218,8.234 C11.218,8.46200114 11.2654995,8.65199924 11.3605,8.804 C11.4555005,8.95600076 11.5948324,9.08899943 11.7785,9.203 C11.9621676,9.31700057 12.1806654,9.42149952 12.434,9.5165 C12.6873346,9.61150047 12.9723317,9.70966616 13.289,9.811 C13.7450023,9.96300076 14.2199975,10.1308324 14.714,10.3145 C15.2080025,10.4981676 15.6576646,10.7419985 16.063,11.046 C16.4683354,11.3500015 16.8039987,11.7268311 17.07,12.1765 C17.3360013,12.6261689 17.469,13.1866633 17.469,13.858 C17.469,14.6306705 17.3265014,15.2988305 17.0415,15.8625 C16.7564986,16.4261695 16.3733357,16.8916648 15.892,17.259 C15.4106643,17.6263352 14.8596698,17.8986658 14.239,18.076 C13.6183302,18.2533342 12.97867,18.342 12.32,18.342 C11.3573285,18.342 10.4263378,18.1741683 9.527,17.8385 C8.62766217,17.5028317 7.88033631,17.0246698 7.285,16.404 L9.413,14.238 C9.74233498,14.6433354 10.176164,14.9821653 10.7145,15.2545 C11.252836,15.5268347 11.7879973,15.663 12.32,15.663 C12.5606679,15.663 12.7949989,15.6376669 13.023,15.587 C13.2510011,15.5363331 13.4504991,15.4540006 13.6215,15.34 C13.7925009,15.2259994 13.9286662,15.0740009 14.03,14.884 C14.1313338,14.693999 14.182,14.4660013 14.182,14.2 C14.182,13.9466654 14.1186673,13.7313342 13.992,13.554 C13.8653327,13.3766658 13.6848345,13.2151674 13.4505,13.0695 C13.2161655,12.9238326 12.9248351,12.7908339 12.5765,12.6705 C12.2281649,12.5501661 11.8323355,12.420334 11.389,12.281 C10.9583312,12.141666 10.5371687,11.9770009 10.1255,11.787 C9.71383127,11.596999 9.34650161,11.3531682 9.0235,11.0555 C8.70049838,10.7578318 8.44083431,10.3968355 8.2445,9.9725 C8.04816568,9.54816454 7.95,9.03200304 7.95,8.424 C7.95,7.67666293 8.10199848,7.03700266 8.406,6.505 C8.71000152,5.97299734 9.10899753,5.53600171 9.603,5.194 C10.0970025,4.85199829 10.6543302,4.60183412 11.275,4.4435 C11.8956698,4.28516587 12.5226635,4.206 13.156,4.206 C13.9160038,4.206 14.6918294,4.34533194 15.4835,4.624 C16.2751706,4.90266806 16.9686637,5.31433061 17.564,5.859 L15.493,8.044 Z"
                                                fill="var(--primary)" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="card-body pb-0 custome-tooltip d-flex align-items-center">
                                <div id="chartBar" className="chartBar">
                                    <BusinessBarChart color={'var(--primary)'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-6">
                        <div className="card banking-card">
                            <div className="card-header border-0 flex-wrap pb-0">
                                <div className="revenue-date">
                                    <span>Tax Revenue</span>
                                    <h4>$310.435</h4>
                                </div>
                                <div className="setting bgl-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="24px" height="24px"
                                        viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <circle fill="var(--secondary)" opacity="0.3" cx="20.5" cy="12.5"
                                                r="1.5" />
                                            <rect fill="var(--secondary)" opacity="0.3"
                                                transform="translate(12.000000, 6.500000) rotate(-15.000000) translate(-12.000000, -6.500000) "
                                                x="3" y="3" width="18" height="7" rx="1" />
                                            <path
                                                d="M22,9.33681558 C21.5453723,9.12084552 21.0367986,9 20.5,9 C18.5670034,9 17,10.5670034 17,12.5 C17,14.4329966 18.5670034,16 20.5,16 C21.0367986,16 21.5453723,15.8791545 22,15.6631844 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,9.33681558 Z"
                                                fill="var(--secondary)" />
                                        </g>
                                    </svg>
                                </div>


                            </div>
                            <div className="card-body pb-0 custome-tooltip d-flex align-items-center">
                                <div id="chartBar2" className="chartBar">
                                    <BusinessBarChart color={'var(--secondary)'} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-12">
                        <div className="card banking-card">
                            <div className="card-header border-0 flex-wrap pb-0">
                                <div className="revenue-date">
                                    <span>Saving</span>
                                    <h4>$310.435</h4>
                                </div>
                                <div className="setting bgl-success">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="24px" height="24px"
                                        viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <path
                                                d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z"
                                                fill="#57c08d" />
                                            <circle fill="#57c08d" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
                                        </g>
                                    </svg>
                                </div>


                            </div>
                            <div className="card-body pb-0 custome-tooltip d-flex align-items-center">
                                <div id="chartBar3" className="chartBar">
                                    <BusinessBarChart color={'#3ab67a'} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header border-0">
                                <div>
                                    <h4 className="card-title">Money Flow</h4>
                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                                <Select
                                    className='custom-react-select'
                                    options={option}
                                    defaultValue={option[0]}
                                    isSearchable={false}
                                />
                            </div>
                            <div className="card-body px-3 py-0">
                                <div id="chartBar4">
                                    <MoneyFlowChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card h-auto">
                            <Tab.Container defaultActiveKey="Yesterday">
                                <div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
                                    <div className="mb-3">
                                        <h4 className="card-title">Latest Transactions</h4>
                                        <p className="mb-0 fs-13">Lorem ipsum dolor sit amet, consectetur</p>
                                    </div>
                                    <Nav as="ul" className="nav nav-pills">
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey={'Yesterday'}>Yesterday</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey={'Today'}>Today</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <Tab.Content className="card-body  py-0">
                                    <Tab.Pane eventKey={'Yesterday'}>
                                        <div className="table-responsive">
                                            <table className="table portfolio-table">
                                                <tbody>
                                                    {tableData.map((data, i) => (
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
                                                    {tableData.map((data, i) => (
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
                                </Tab.Content>
                            </Tab.Container>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-xxl-4">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card prim-card">
                            <div className="card-body">
                                <h4 className="number">1234 5678 9012 3456</h4>
                                <img src={IMAGES.AtmChip} alt="" />
                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="prim-info">
                                        <p className="mb-0 text-white">Card Holder</p>
                                        <h6 className="mb-0 text-white">Mukund</h6>
                                    </div>
                                    <div className="master-card">
                                        {SVGICON.masterCard}
                                        <p className="text-white mb-0 mt-1">Master Card</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <h6 className="mb-0 m-auto">Income</h6>
                            </div>
                            <div className="card-body text-center pt-3">
                                <div className="icon-box icon-box-sm bg-primary">
                                    {SVGICON.incomeIconSvg}
                                </div>
                                <div className="mt-3">First Month</div>
                                <div className="count-num text-dark mt-1">$26,741.60</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <h6 className="m-auto mb-0">Expense</h6>
                            </div>
                            <div className="card-body text-center pt-3">
                                <div className="icon-box icon-box-sm bg-danger">
                                    {SVGICON.incomeIconSvg}
                                </div>
                                <div className="mt-3">Last Month</div>
                                <div className="count-num text-dark mt-1">- $23,741.60</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-12">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <h2 className="card-title mb-0">Categories</h2>
                            </div>
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="icon-box bg-primary me-2 ">
                                        {SVGICON.DollerSvg}
                                    </div>
                                    <div className="ps-2 w-100 flex-1">
                                        <h6 className="">Working Hard</h6>
                                        <div className="progress mt-2 h-auto">
                                            <div className="progress-bar bg-primary" style={{ width: "50%", height: "6px" }}></div>
                                        </div>
                                        <div className="mt-2"><span>$50</span><span className="text-primary"> / from $1000</span></div>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <div className="icon-box bg-secondary me-2">
                                        {SVGICON.DollerSvg}
                                    </div>
                                    <div className="ps-2 w-100 flex-1">
                                        <h6 className="">Side Project</h6>
                                        <div className="progress mt-2 h-auto">
                                            <div className="progress-bar bg-secondary" style={{ width: "50%", height: "6px" }}></div>
                                        </div>
                                        <div className="mt-2"><span>$50</span><span className="text-secondary"> / from $1000</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-12">
                        <div className="card bg-primary">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="earning">
                                        <h4 className="text-white">Monthly Target</h4>
                                        <h6 className="text-white mt-4">Total Earning</h6>
                                        <div className="count-num text-white">$25,365.25</div>
                                        <p className="text-white mb-0">25% than last month</p>
                                    </div>
                                    <div className="d-inline-block position-relative donut-chart-sale">
                                        <DonughtChart value="75" backgroundColor="rgba(54, 147, 255,1)" backgroundColor2="rgba(239, 239, 239, 1)" />
                                        <small className="fs-18 font-w700 text-white">75%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banking;