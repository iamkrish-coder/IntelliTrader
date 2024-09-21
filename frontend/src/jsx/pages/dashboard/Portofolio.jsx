import React, { useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

import { IMAGES } from '../../constant/theme';

import PortfolioHolding from '../../elements/PortfolioHolding';
import RecentActivityTab from '../../elements/RecentActivityTab';
import WeeklyColumnChart from '../../elements/WeeklyColumnChart';
import DonughtChart from '../../elements/dashboard/DonughtChart';
import CurrentGraphDonut from '../../elements/CurrentGraphDonut';


const DropdownData = () => {
    return (
        <Dropdown className="dropdown custom-dropdown mb-0 ms-3">
            <Dropdown.Toggle as="div" className="btn sharp tp-btn i-false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end" align="end">
                <Dropdown.Item >Details</Dropdown.Item>
                <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const chartItemBlog = [
    { name: 'Food', color: '#3C8AFF' },
    { name: 'Rent', color: '#FF5166' },
    { name: 'Transport', color: '#ED3DD1' },
    { name: 'Installment', color: '#2BC844' },
    { name: 'Investment', color: '#FFEE54' },
];

const Portofolio = () => {
    const [addDetail, setAddDetail] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-xxl-4">
                    <div className="card portofolio">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title">My Profile</h4>
                            <DropdownData />
                        </div>
                        <div className="card-body">
                            <div className="text-center my-profile">
                                <div className="media d-block">
                                    <div className="media-img">
                                        <img src={IMAGES.UserPro} alt="" />
                                        <Link to={"#"}><i className="fas fa-pencil-alt" /></Link>
                                    </div>
                                    <h3 className="mt-3 font-w800 text-dark">jannine</h3>
                                    <span>@jamesupardi</span>
                                </div>
                                <div className="media-content">
                                    <h4 className="mt-3 font-w400 fs-16 text-dark mb-0">Join on 24 March 2020</h4>
                                    <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
                                </div>
                                <ul className="portofolio-social mb-3">
                                    <li><Link to={"#"}><i className="fa fa-phone" /></Link></li>
                                    <li><Link to={"#"}><i className="far fa-envelope" /></Link></li>
                                    <li><Link to={"#"}><i className="fab fa-facebook-f" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-xxl-8">
                    <div className="card">
                        <div className="card-header border-0 flex-wrap">
                            <h4 className="card-title">Coin Holding
                            </h4>
                            <div className="d-flex align-items-center">
                                <button type="button" className="btn btn-secondary btn-sm"
                                    onClick={() => setAddDetail(true)}
                                >
                                    + Add New
                                </button>{" "}
                                <DropdownData />
                            </div>
                        </div>
                        <PortfolioHolding />
                    </div>
                </div>
                <div className="col-xl-6">
                    <RecentActivityTab />
                </div>
                <div className="col-xl-6">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card overflow-hidden h-auto">
                                <div className="card-body pb-4">
                                    <div className="row">
                                        <WeeklyColumnChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-xxl-6 col-md-6">
                            <div className="row">
                                <div className="col-xl-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="align-items-center d-flex justify-content-between">
                                                <div className="c-heading">
                                                    <span className="text-dark font-w600 mb-2 d-block text-nowrap ">345</span>
                                                    <p className="mb-0 font-w500 text-nowrap">Transactions</p>
                                                </div>
                                                <div className="d-inline-block position-relative donut-chart-sale mb-0">
                                                    <DonughtChart backgroundColor="rgba(9, 60, 189, 1)" backgroundColor2="rgba(245, 245, 245, 1)" value="62" />
                                                    <small className="text-dark">62%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12  col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="align-items-center d-flex justify-content-between">
                                                <div className="c-heading">
                                                    <span className="text-dark font-w600 mb-2 d-block">4,563</span>
                                                    <p className="mb-0 font-w500">Income</p>
                                                </div>
                                                <div className="d-inline-block position-relative donut-chart-sale mb-0">
                                                    <DonughtChart backgroundColor="rgba(255, 97, 117, 1)" backgroundColor2="rgba(245, 245, 245, 1)" value="38" />
                                                    <small className="text-dark">38%</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-xxl-6 col-md-6">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="card-title">Current Graph</h4>
                                    <DropdownData />
                                </div>
                                <div className="card-body text-center">
                                    <div id="pieChart" className="d-inline-block">
                                        <CurrentGraphDonut />
                                    </div>
                                    <div className="chart-items">
                                        <div className=" col-xl-12 col-sm-12">
                                            <div className="row text-dark text-start fs-13 mt-4">
                                                {chartItemBlog.map((data, i) => (
                                                    <span className="mb-3 col-6 pe-0" key={i}>
                                                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="14" height="14" rx="4" fill={data.color} />
                                                        </svg>
                                                        {data.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal centered show={addDetail} onHide={setAddDetail}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add New</h1>
                    <button type="button" className="btn-close" onClick={() => setAddDetail(false)}></button>
                </div>
                <div className="modal-body modal-date">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-2">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label mb-2">User Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="username" />
                    </div>
                    <div className="mb-3 ">
                        <label className="form-label mb-2">Joining Date</label>
                        <div className="input-hasicon mb-sm-0 mb-3">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                className="form-control bt-datepicker"
                            />
                            <div className="icon">
                                <i className="far fa-calendar" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={() => setAddDetail(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>
        </>
    );
};

export default Portofolio;
