import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";

import { IMAGES } from '../../constant/theme';

const inputBlog = [
    { label: 'Name', value: 'John' },
    { label: 'Surname', value: 'Brahim' },
    { label: 'Specialty', value: 'Developer' },
    { label: 'Skills', value: 'React,  JavaScript,  PHP' },
];

const options1 = [
    { value: '1', label: 'Gendar' },
    { value: '2', label: 'Male' },
    { value: '3', label: 'Female' },
    { value: '4', label: 'Other' },
]

const options2 = [
    { value: '1', label: 'Russia' },
    { value: '2', label: 'Canada' },
    { value: '3', label: 'China' },
    { value: '4', label: 'India' },
]

const options3 = [
    { value: '1', label: 'Krasnodar' },
    { value: '2', label: 'Tyumen' },
    { value: '3', label: 'Chelyabinsk' },
    { value: '4', label: 'Moscow' },
]

const EditProfile = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>

            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="clearfix">
                        <div className="card card-bx profile-card author-profile mb-3">
                            <div className="card-body">
                                <div className="p-5">
                                    <div className="author-profile">
                                        <div className="author-media">
                                            <img src={IMAGES.tab1} alt="" />
                                            <div className="upload-link" title="" data-toggle="tooltip" data-placement="right" data-original-title="update">
                                                <input type="file" className="update-flie" />
                                                <i className="fa fa-camera"></i>
                                            </div>
                                        </div>
                                        <div className="author-info">
                                            <h6 className="title">Nella Vita</h6>
                                            <span>Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-list">
                                    <ul>
                                        <li><Link to="/app-profile">Models</Link><span>36</span></li>
                                        <li><Link to="/uc-lightgallery">Gallery</Link><span>3</span></li>
                                        <li><Link to="/app-profile">Lessons</Link><span>1</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="input-group mb-3">
                                    <div className="form-control rounded text-center">Portfolio</div>
                                </div>
                                <div className="input-group">
                                    <Link to="https://www.dexignlab.com/" target="_blank" className="form-control text-primary rounded text-center">https://www.dexignlab.com/</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                    <div className="card profile-card card-bx ">
                        <div className="card-header">
                            <h6 className="card-title">Account setup</h6>
                        </div>
                        <form className="profile-form">
                            <div className="card-body">
                                <div className="row">
                                    {inputBlog.map((item, ind) => (
                                        <div className="col-sm-6 mb-3" key={ind}>
                                            <label className="form-label">{item.label}</label>
                                            <input type="text" className="form-control" defaultValue={item.value} />
                                        </div>
                                    ))}

                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Gender</label>
                                        <Select
                                            options={options1}
                                            isSearchable={false}
                                            defaultValue={options1[1]}
                                            className="custom-react-select"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3 modal-date">
                                        <label className="form-label">Birth</label>
                                        <div className="input-hasicon mb-xl-0 mb-3">
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                                className="form-control bt-datepicker"
                                            />
                                            <div className="icon"><i className="far fa-calendar" /></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Phone</label>
                                        <input type="number" className="form-control" defaultValue="+123456789" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Email address</label>
                                        <input type="text" className="form-control" defaultValue="demo@gmail.com" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Country</label>
                                        <Select
                                            options={options2}
                                            isSearchable={false}
                                            defaultValue={options2[1]}
                                            className="custom-react-select"
                                        />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">City</label>
                                        <Select
                                            options={options3}
                                            isSearchable={false}
                                            defaultValue={options3[1]}
                                            className="custom-react-select"
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="card-footer align-items-center d-flex">
                                <Link to={"#"} className="btn btn-primary btn-sm">UPDATE</Link>
                                <Link to={"#"} className="btn-link float-end ms-auto">Forgot your password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProfile;
