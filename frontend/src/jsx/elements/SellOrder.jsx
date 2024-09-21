import React, { useState } from 'react';

import dash from "../../assets/images/svg/dash.svg"
import btc from "../../assets/images/svg/btc.svg"
import eth from "../../assets/images/svg/eth.svg"

import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderTableData = [
    { price: '82.3', amount: '0.15', total: '134.12' },
    { price: '83.6', amount: '0.18', total: '237.31' },
    { price: '83.2', amount: '0.25', total: '252.58' },
    { price: '83.9', amount: '0.35', total: '126.26' },
    { price: '84.4', amount: '0.75', total: '46.92' },
    { price: '84.8', amount: '0.21', total: '123.27' },
];

const SellOrder = () => {
    const [selectImage, setSelectImage] = useState([btc, 'Bitcoin']);
    return (

        <div className="card price-list">
            <div className="card-header border-0 p-3">
                <div>
                    <h4 className="card-title text-danger">Sell Order</h4>
                </div>
                <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle as="div" className="btn sharp btn-danger tp-btn i-false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#fd5353" cx="12" cy="5" r="2"></circle><circle fill="#fd5353" cx="12" cy="12" r="2"></circle><circle fill="#fd5353" cx="12" cy="19" r="2"></circle></g>
                        </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="dropdown-menu-end">
                        <Dropdown.Item>Option 1</Dropdown.Item>
                        <Dropdown.Item>Option 2</Dropdown.Item>
                        <Dropdown.Item>Option 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="card-body p-3 py-0">
                <Dropdown className="header-drop form-control custom-image-select-2 image-select mt-3 mt-sm-0 bit style-1">
                    <Dropdown.Toggle as="div" className="header-drop-toggle p-0"><img src={selectImage[0]} alt="" /> {selectImage[1]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="mt-2 menu-blog">
                        <Dropdown.Item onClick={() => setSelectImage([dash, 'Albania'])}><img src={dash} alt="" /> Albania</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectImage([btc, 'Bitcoin'])}><img src={btc} alt="" /> Bitcoin</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectImage([eth, 'Ripple'])}><img src={eth} alt="" /> Ripple</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="table-responsive">
                    <table className="table text-center bg-warning-hover tr-rounded order-tbl mt-2">
                        <thead>
                            <tr>
                                <th className="text-start">Price</th>
                                <th className="text-center">Amount</th>
                                <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderTableData.map((item, i) => (
                                <tr key={i}>
                                    <td className="text-start">{item.price}</td>
                                    <td>{item.amount}</td>
                                    <td className="text-end">${item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer text-center py-3 border-0">
                <Link to={"#"} className="btn-link text-danger">Show more <i className="fa fa-caret-right text-danger" /></Link>
            </div>
        </div>

    );
};

export default SellOrder;