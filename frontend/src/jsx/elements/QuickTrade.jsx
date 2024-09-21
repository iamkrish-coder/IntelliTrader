import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import dash from "../../assets/images/svg/dash.svg"
import btc from "../../assets/images/svg/btc.svg"
import eth from "../../assets/images/svg/eth.svg"
import { SVGICON } from '../constant/theme';
import { Link } from 'react-router-dom';

const QuickTrade = () => {
    const [selectImage, setSelectImage] = useState([eth, '789,123 Eth']);
    return (
        <div className="card quick-trade">
            <div className="card-header pb-0 border-0 flex-wrap">
                <div>
                    <h4 className="card-title">Quick Trade</h4>
                    <p className="mb-xl-0 mb-3 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <Dropdown className="header-drop-2 form-control custom-image-select-1 image-select mt-3 mt-sm-0 bitcoin-border">
                    <Dropdown.Toggle as="div" className="header-drop-toggle i-false">
                        <img src={selectImage[0]} alt="" /> {selectImage[1]}
                        <i className="fa-solid fa-chevron-down ms-3" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="mt-2">
                        <Dropdown.Item onClick={() => setSelectImage([dash, '45,662.05 Dash'])}><img src={dash} alt="" /> 45,662.05 Dash</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectImage([btc, '345,455 Btc'])}><img src={btc} alt="" /> 345,455 Btc</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectImage([eth, '789,123 Eth'])}><img src={eth} alt="" /> 789,123 Eth</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="card-body pb-0">
                <div className="basic-form">
                    <form className="form-wrapper trade-form">
                        <div className="input-group mb-3 ">
                            <span className="input-group-text">Amount BTC</span>
                            <input className="form-control form-control text-end" type="text" placeholder="0,000000" />
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text">Price BPL</span>
                            <input className="form-control form-control text-end" type="text" placeholder="0,000000" />
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text">Fee (1%)</span>
                            <input className="form-control form-control text-end" type="text" placeholder="0,000000" />
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text">Total BPL</span>
                            <input className="form-control form-control text-end" type="text" placeholder="0,000000" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-footer border-0">
                <div className="row">
                    <div className="col-6 px-sm-3 px-2">
                        <Link to={"#"} className="btn d-flex  btn-success justify-content-between align-items-center w-100">
                            BUY
                            {SVGICON.BuyArrow}
                        </Link>
                    </div>
                    <div className="col-6 px-sm-3 px-2">
                        <Link to={"#"} className="btn d-flex  btn-danger align-items-center justify-content-between w-100">
                            SELL
                            {SVGICON.SellArrow}
                        </Link>
                    </div>
                </div>
                <div className="d-flex mt-3 align-items-center">
                    <div className="form-check custom-checkbox">
                        <input type="checkbox" className="form-check-input" id="customCheckBox1" required />
                        <label className="form-check-label fs-14 font-w400 mt-1" htmlFor="customCheckBox1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</label>
                    </div>
                    <p className="mb-0"></p>
                </div>
            </div>
        </div>

    );
};

export default QuickTrade;