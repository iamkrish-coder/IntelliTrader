import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SoldLineChart from './SoldLineChart';
import LitSoldChart from './LitSoldChart';
import { Dropdown } from 'react-bootstrap';
import { SVGICON } from '../../constant/theme';

const coindata = [
    { value: '1', label: 'BTC' },
    { value: '2', label: 'Ethereum' },
    { value: '3', label: 'Ripple' },
    { value: '4', label: 'Bitcoin' },
    { value: '5', label: 'Cardano' },
    { value: '6', label: 'Litecoin' },
    { value: '7', label: 'NEO' },
    { value: '8', label: 'Stellar' },
    { value: '9', label: 'EOS' },
    { value: '10', label: 'NEM' },
];
const inrdata = [
    { value: '1', label: 'INR' },
    { value: '2', label: 'POUND' },
    { value: '3', label: 'USD' },
    { value: '4', label: 'EURO' },
];

const soldTable = [
    { currency: 'BTC', email: 'samantha@mail.com', name: 'Samanta William', price: '75.00', status: 'Paid', color: 'success' },
    { currency: 'ETH', email: 'tony@mail.com', name: 'Tony Soap', price: '80.50', status: 'Paid', color: 'success' },
    { currency: 'USD', email: 'nela@mail.com', name: 'Nela Vita', price: '60.00', status: 'Penidng', color: 'warning' },
    { currency: 'BCTD', email: 'nadia@mail.com', name: 'Nadia Edja', price: '95.00', status: 'Unpaid', color: 'danger' },
    { currency: 'EURO', email: 'demo@mail.com', name: 'Nadia Edja', price: '73.25', status: 'Unpaid', color: 'danger' },
];


const Exchange = () => {
    const chackboxFun = (type) => {
        setTimeout(() => {
            const chackbox = document.querySelectorAll(".exchange-table input");
            const motherChackBox = document.querySelector(".exchange-head input");
            for (let i = 0; i < chackbox.length; i++) {
                const element = chackbox[i];
                if (type === "all") {
                    if (motherChackBox.checked) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                } else {
                    if (!element.checked) {
                        motherChackBox.checked = false;
                        break;
                    } else {
                        motherChackBox.checked = true;
                    }
                }
            }
        }, 100)
    };
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body pb-2">
                            <h1 className="text-center no-border font-w600 fs-60 mt-2"><span className="text-success">Buy</span> and <span className="text-danger">Sell</span> Coins at the<br /> Jiade with no additional charges</h1>
                            <h4 className="text-center ">Trusted by millions user with over $1 Trillion in crypto transactions.</h4>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="text-center mt-3 row justify-content-center">
                                        <div className="col-xl-5">
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <input type="number" className="form-control mb-3" name="value" placeholder="" defaultValue="18.1548" />
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <Select
                                                        className='custom-react-select exchange-select text-start'
                                                        options={coindata}
                                                        defaultValue={coindata[0]}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-xl-1">
                                            <div className="equalto">
                                                =
                                            </div>
                                        </div>
                                        <div className="col-xl-5">
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <input type="number" className="form-control mb-3" name="value" placeholder="" defaultValue="264.158" />
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <Select
                                                        className='custom-react-select exchange-select text-start'
                                                        options={inrdata}
                                                        defaultValue={inrdata[0]}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 mb-4">
                                        <Link to={"/p2p"} className="btn btn-warning mx-auto btn-sm">EXCHANGE NOW</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-lg-6 col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-body py-0 pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">Bitcoin Sold</h4>
                                        <div className="d-flex align-items-center">
                                            <h2 className="count-num">123k</h2>
                                            <span className="fs-16 font-w500 text-success ps-2"><i className="bi bi-caret-up-fill pe-2" /></span>
                                        </div>
                                    </div>
                                    <div id="totalInvoices">
                                        <SoldLineChart data={[10, 45, 95, 51, 49, 70, 30, 91, 100]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-body py-0 pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">Amount Refund</h4>
                                        <div className="d-flex align-items-center">
                                            <h2 className="count-num">82k</h2>
                                            <span className="fs-16 font-w500 text-danger ps-2"><i className="bi bi-caret-down-fill pe-2" /></span>
                                        </div>
                                    </div>
                                    <div id="paidinvoices">
                                        <SoldLineChart data={[30, 70, 48, 31, 95, 70, 20, 91, 50]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-body py-0 pt-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">Litecoin Sold</h4>
                                        <div className="d-flex align-items-center">
                                            <h2 className="count-num">259k</h2>
                                            <span className="fs-16 font-w500 text-success ps-2"><i className="bi bi-caret-up-fill pe-2" /></span>
                                        </div>
                                    </div>
                                    <div id="barChart">
                                        <LitSoldChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-3 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="card-body py-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="me-3">
                                            <h2 className=" count-num mb-0">3468</h2>
                                            <p className="mb-0">Dash Sold</p>
                                        </div>
                                        <div id="ticketSold"  >
                                            <SoldLineChart data={[0, 70, 48, 95, 20, 91, 100]} chartwidth="150" />
                                        </div>
                                    </div>
                                    <div className="progress mb-2" style={{ height: "10px" }}>
                                        <div className="progress-bar bg-warning progress-animated" style={{ width: "30%", height: "10px" }}></div>
                                    </div>
                                    <p>30% than last month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col-xl-8 col-lg-12">
                            <div className="card">
                                <div className="card-header justify-content-between border-0">
                                    <h2 className="card-title mb-0">Latest Sold Transaction</h2>
                                </div>
                                <div className="card-body px-3 py-0">
                                    <div className="table-responsive">
                                        <table className="table-responsive table shadow-hover tickettable display mb-4 dataTablesCard dataTable no-footer" id="example6">
                                            <thead>
                                                <tr>
                                                    <th className="border-bottom exchange-head" >
                                                        <input type="checkbox" className="form-check-input" id="checkAll" required=""
                                                            onClick={() => chackboxFun("all")}
                                                        />
                                                    </th>
                                                    <th className="border-bottom ps-0">Currency</th>
                                                    <th className="border-bottom">Date</th>
                                                    <th className="border-bottom">Email</th>
                                                    <th className="border-bottom">Price</th>
                                                    <th className="text-end">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {soldTable.map((item, i) => (
                                                    <tr key={i}>
                                                        <td className="exchange-table">
                                                            <div className="checkbox me-0 align-self-center">
                                                                <div className="custom-control custom-checkbox ">
                                                                    <input type="checkbox" className="form-check-input"
                                                                        id={`check8${i}`}
                                                                        required=" "
                                                                        onClick={() => chackboxFun()}
                                                                    />
                                                                    <label className="custom-control-label" htmlFor={`check8${i}`}></label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="ps-0">
                                                            <span className="font-w600 fs-14">#TCK-01-{i + 12340} </span>
                                                            <h5 className="mb-0">{item.currency}</h5>
                                                        </td>
                                                        <td className="fs-14 font-w400">March 12, 2024</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <Link to="/email-inbox">
                                                                    <div className="icon-box icon-box-sm bg-primary">
                                                                        {SVGICON.EmailMeszBox}
                                                                    </div>
                                                                </Link>
                                                                <div className="ms-3">
                                                                    <h5 className="mb-0"><Link to="/app-profile">{item.name}</Link></h5>
                                                                    <span className="fs-14 text-muted">{item.email}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${item.price}</td>
                                                        <td className="text-end">
                                                            <span className={`badge badge-sm badge-${item.color}`}>{item.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-header border-0 pb-0">
                                    <h4 className="card-title mb-0">Buy Coin</h4>
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
                                        <div className="mt-4 d-flex justify-content-between">
                                            <Link to={"#"} className="btn btn-success btn-sm light text-uppercase me-3 btn-block">BUY</Link>
                                            <Link to={"#"} className="btn btn-danger btn-sm light text-uppercase btn-block">Sell</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Exchange;