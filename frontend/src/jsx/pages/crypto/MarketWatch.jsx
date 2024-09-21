import React from 'react';
import MarketRevenueChart from './MarketRevenueChart';
import ChartSlider from './ChartSlider';
import Select from 'react-select';
import { SVGICON } from '../../constant/theme';

const data = [
    {label:'This Month', value:'1'},
    {label:'Weeks', value:'2'},
    {label:'Today', value:'3'},
];

const previewData = [
    {color:'success', icon : SVGICON.MarketLtc, name:'LTC/Year', month:'March', amount:'120.45'},
    {color:'warning', icon : SVGICON.MarketBtc, name:'BTC/Year', month:'January', amount:'120.45'},
    {color:'primary', icon : SVGICON.MarketEth, name:'ETH/Year', month:'February', amount:'100.50'},
    {color:'pink', icon : SVGICON.MarketRipp, name:'RIPP/Year', month:'May', amount:'120.45'},
    {color:'primary', icon : SVGICON.MarketLtc, name:'LTC/Year', month:'April', amount:'1050.00'},
];

const sellTable = [
    {price:'33', amount:'0.32', total:'33,560'},
    {price:'74', amount:'0.12', total:'31,460'},
    {price:'41', amount:'0.25', total:'22,315'},
    {price:'55', amount:'0.37', total:'15,168'},    
]

const MarketWatch = () => {
    return (
        <div className="row">
            <div className="col-xl-9 col-lg-12">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header border-0 d-block pb-0">
                                <h2 className="card-title mb-3">Market Chart</h2>
                                <div className="d-flex justify-content-between">
                                    <div className="market-data">
                                        <div className="income data">
                                            <span>This Month</span>
                                            <h4>$29.999.00</h4>
                                        </div>
                                        <div className="price data">
                                            <span>Price</span>
                                            <h4 className="d-flex align-items-center">480 <span
                                                    className="ms-2 text-danger">- 0,5%</span></h4>
                                        </div>
                                        <div className="rate data">
                                            <span>Rate</span>
                                            <h4>-0.0662%/hr</h4>
                                        </div>
                                        <div className="volume data">
                                            <span>volume</span>
                                            <h4>175k</h4>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="dropdown bootstrap-select">                                            
                                            <Select
                                                className='custom-react-select  w-100'
                                                options={data}
                                                defaultValue={data[0]}
                                                isSearchable = {false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0 custome-tooltip pe-3">
                                <div id="revenueMap" className="revenueMap">
                                    <MarketRevenueChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <ChartSlider />
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-12">
                <div className="row">
					<div className="col-xl-12 col-lg-6">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <h2 className="card-title mb-2">Market Previews</h2>
                            </div>
                            <div className="card-body pt-0 px-0">
                                {previewData.map((data, i)=>(
                                    <div className="previews-info-list" key={i}>
                                        <div className="pre-icon">
                                            <span className={`icon-box icon-box-sm bg-${data.color}`}>                                                
                                                {data.icon}
                                            </span>
                                            <div className="ms-2">
                                                <h6 className="mb-0">{data.name}</h6>
                                                <span>{data.month}</span>
                                            </div>
                                        </div>
                                        <div className="count">
                                            <h6 className="mb-0">{data.amount}</h6>
                                            <span className={`${data.amount==="120.45" ? 'text-success' : '' }`}>1,24%</span>
                                        </div>
                                    </div>
                                ))}
                                    
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6">
                        <div className="card bg-primary trade-history">
                            <div className="card-header border-0 pb-0">
                                <div>
                                    <h2 className="card-title mb-2 text-white">Sell Order</h2>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="table-responsive">
                                    <table className="table table-sell verticle-middle mb-0">
                                        <thead>
                                            <tr className="text-white">
                                                <th className="text-start" scope="col">Price</th>
                                                <th className="text-center" scope="col">Amount</th>
                                                <th className="text-end" scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sellTable.map((item, i)=>(
                                                <tr className="text-white" key={i}>
                                                    <td>{item.price}</td>
                                                    <td className="text-center">{item.amount}</td>
                                                    <td className="text-end text-nowrap">${item.total}</td>
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

export default MarketWatch;