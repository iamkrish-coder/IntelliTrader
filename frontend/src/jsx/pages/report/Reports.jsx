import React from 'react';
import { Link } from 'react-router-dom';

const dailyReportTable = [
    {name:'ERC20', price:'0.12', up:'0.14', down:'0.10', market:'20,151,416', change:'263.50', color:'success'},
    {name:'CTIC2', price:'0.15', up:'0.18', down:'0.12', market:'222,244', change:'56.00', color:'success'},
    {name:'CALC', price:'0.17', up:'0.14', down:'0.10', market:'44,597', change:'208.78', color:'danger'},
    {name:'EOT', price:'0.14', up:'0.15', down:'0.12', market:'91,117,925', change:'156.04', color:'danger'},
    {name:'XSH', price:'0.16', up:'0.15', down:'0.12', market:'96,859,631', change:'141.97', color:'success'},
    {name:'XCT', price:'0.16', up:'0.22', down:'0.15', market:'10,592,274', change:'130.70', color:'danger'},
    {name:'FLASH', price:'0.19', up:'0.25', down:'0.15', market:'77,308,540', change:'133.81', color:'success'},
    {name:'ADST', price:'1.50', up:'2.18', down:'1.18', market:'34,959,392', change:'150.80', color:'success'},
];

const topGainer = [
    {name:'ERC20', price:'0.12', market:'20,151,416', change:'263.50'},
    {name:'CTIC2', price:'0.15', market:'222,244', change:'56.00'},
    {name:'CALC', price:'0.17', market:'44,597', change:'208.78'},
    {name:'EOT', price:'0.14',  market:'91,117,925', change:'156.04'},
    {name:'XSH', price:'0.16', market:'96,859,631', change:'141.97'},
    {name:'XCT', price:'0.16', market:'10,592,274', change:'130.70'},
    {name:'FLASH', price:'0.19', market:'77,308,540', change:'133.81'},
    {name:'ADST', price:'1.50', market:'34,959,392', change:'150.80'},
];
const topLoosers = [
    {name:'EOT', price:'0.14',  market:'91,117,925', change:'156.04'},
    {name:'XSH', price:'0.16', market:'96,859,631', change:'141.97'},
    {name:'ERC20', price:'0.12', market:'20,151,416', change:'263.50'},
    {name:'FLASH', price:'0.19', market:'77,308,540', change:'133.81'},
    {name:'ADST', price:'1.50', market:'34,959,392', change:'150.80'},
    {name:'XCT', price:'0.16', market:'10,592,274', change:'130.70'},
    {name:'CALC', price:'0.17', market:'44,597', change:'208.78'},
    {name:'CTIC2', price:'0.15', market:'222,244', change:'56.00'},
];

const Reports = () => {
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Daily Report</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table shadow-hover table-bordered tbl-report">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Name</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-end">Up Price</th>
                                        <th className="text-end">Down Price</th>
                                        <th className="text-end">Mkt. Cap</th>
                                        <th className="text-end">Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dailyReportTable.map((data, i)=>(
                                        <tr key={i}>
                                            <td className="text-center">{i+1}</td>
                                            <td><Link to={"#"} className="hover-primary">{data.name}</Link></td>
                                            <td className="text-end"><span>$</span> {data.price}</td>
                                            <td className="text-end"><span>$</span> {data.up}</td>
                                            <td className="text-end"><span>$</span> {data.down}</td>
                                            <td className="text-end"><span>$</span> {data.market}</td>
                                            <td className="text-end"><span className={`badge badeg-sm badge-${data.color}`}>{data.change}%</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title mb-0">Top Gainers</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table shadow-hover table-bordered tbl-report">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Name</th>
                                                <th className="text-end">Price</th>
                                                <th className="text-end">Mkt. Cap</th>
                                                <th className="text-end">Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topGainer.map((item, i)=>(
                                                <tr key={i}>
                                                    <td className="text-center">{i+1}</td>
                                                    <td><Link to={"#"} className="hover-primary">{item.name}</Link></td>
                                                    <td className="text-end"><span>$</span> {item.price}</td>
                                                    <td className="text-end"><span>$</span> {item.market}</td>
                                                    <td className="text-end"><span className={`badge badeg-sm badge-success`}>{item.change}%</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title mb-0">Top Loosers</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table shadow-hover table-bordered tbl-report">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Name</th>
                                                <th className="text-end">Price</th>
                                                <th className="text-end">Mkt. Cap</th>
                                                <th className="text-end">Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topLoosers.map((item, i)=>(
                                                <tr key={i}>
                                                    <td className="text-center">{i+1}</td>
                                                    <td><Link to={"#"} className="hover-primary">ERC20</Link></td>
                                                    <td className="text-end"><span>$</span> {item.price}</td>
                                                    <td className="text-end"><span>$</span> {item.market}</td>
                                                    <td className="text-end"><span className="badge badge-sm badge-danger">{item.change} %</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                
    );
};

export default Reports;