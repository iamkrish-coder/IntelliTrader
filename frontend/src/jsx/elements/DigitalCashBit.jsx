import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SVGICON } from '../constant/theme';

const DigitalCashBit = (props) => {
    return (
        <div className="card  digital-cash">
            <div className="card-header border-0">
                <h4 className="card-title">About</h4>
                <Dropdown className="custom-dropdown mb-0 tbl-orders-style">
                    <Dropdown.Toggle as="div" className="btn sharp tp-btn i-false">
                        {SVGICON.DropdownIcon}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item >Details</Dropdown.Item>
                        <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="card-body py-0">
                <div className="text-center">
                    <div className="media d-block">
                        {props.icon}
                        <div className="media-content">
                            <h4 className="mt-0 mt-md-4 fs-20 font-w700 text-dark mb-0">Digital Cash</h4>
                            <span className="font-w600 text-dark">{props.name}</span>
                            <span className="my-4 fs-16 font-w600 d-block">{props.amount}</span>
                            <p className="text-start">Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol. It is also a decentralized autonomous organization (DAO)...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer pt-0 border-0 text-center">
                <Link to={"#"} className="btn btn-primary btn-sm btn-block">Read more</Link>
            </div>
        </div>
    );
};

export default DigitalCashBit;