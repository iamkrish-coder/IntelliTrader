import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { SVGICON } from '../../constant/theme';
import { Link } from 'react-router-dom';
import MarketOverViewChart2 from '../../elements/dashboard/MarketOverViewChart2';
import MarketBarChart from '../../elements/MarketBarChart';


const marketBlog = [
    {icon : SVGICON.LtcUsdIcon, name:'LTC/USD', chartcolor:'#3ab67a', month:'March', amount:'120.45', percent:'1.24%', color:'success'},
    {icon : SVGICON.BtcUsdIcon, name:'BTC/USD', chartcolor:'#EE3232', month:'January', amount:'149.50', percent:'1.24%', color:'danger'},
    {icon : SVGICON.EthUsdIcon, name:'ETH/USD', chartcolor:'#EE3232', month:'February', amount:'102.10', percent:'1.24%', color:'danger'},
    {icon : SVGICON.XrpUsdIcon, name:'XRP/USD', chartcolor:'#3ab67a', month:'January', amount:'115.20', percent:'1.24%', color:'success'},
    {icon : SVGICON.EthUsdIcon, name:'ETH/USD', chartcolor:'#EE3232', month:'February', amount:'102.10', percent:'1.24%', color:'danger'},
    {icon : SVGICON.LtcUsdIcon, name:'LTC/USD', chartcolor:'#3ab67a', month:'March', amount:'120.45', percent:'1.24%', color:'success'},
    {icon : SVGICON.BtcUsdIcon, name:'BTC/USD', chartcolor:'#EE3232', month:'January', amount:'149.50', percent:'1.24%', color:'danger'},
    {icon : SVGICON.XrpUsdIcon, name:'XRP/USD', chartcolor:'#3ab67a', month:'January', amount:'115.20', percent:'1.24%', color:'success'},
];

const historyTable = [
    {price:'146.70', size:'10', side:'BUY', time:'21:25:02'},
    {price:'154.50', size:'10', side:'SELL', time:'21:30:10'},
    {price:'147.75', size:'10', side:'BUY', time:'21:47:06'},
    {price:'155.60', size:'10', side:'SELL', time:'21:55:10'},
    {price:'143.20', size:'10', side:'BUY', time:'22:15:05'},
    {price:'150.50', size:'10', side:'SELL', time:'22:30:10'},
];

const Market = () => {
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-xxl-4 col-sm-6 my-order-ile">
                    <div className="card">
                        <div className="card-header border-0 pb-3">
                            <h4 className="card-title">Market Previews</h4>	
                        </div>
                        <div className="card-body px-0 pt-0 dlab-scroll height370">
                            {marketBlog.map((item,i)=>(
                                <div className="d-flex justify-content-between align-items-center market-preview" key={i}>
                                    <div className="d-flex align-items-center">
                                        <span>
                                            {item.icon}
                                        </span>
                                        <div className="ms-3">
                                            <Link to={"#"}><h5 className="fs-14 font-w600 mb-0">{item.name}</h5></Link>
                                            <span className="fs-12 font-w400">{item.month}</span>
                                        </div>
                                    </div>	
                                    <div className="d-flex align-items-center">                                        
                                        <Sparklines data={[8,4,5,9,5,3,5,7,5]} style={{ width: "50px", height: "25px" }}>
                                            <SparklinesLine color={item.chartcolor}  style={{ strokeWidth: 6, fill: "none" }} />                                            
                                        </Sparklines>
                                        <div className="ms-3">
                                            <h5 className="fs-14 font-w600 mb-0">{item.amount}</h5>
                                            <span className="text-success">{item.percent}</span>
                                        </div>
                                    </div>	
                                </div>
                            ))}                            
                        </div>
                        <div className="card-footer border-0 pt-0">
                            <Link to="/trading-market" className="btn btn-primary d-block btn-sm">Show more <i className="fa-solid fa-caret-right ms-2"/></Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-xxl-8">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="market-coin flex-wrap">
                                        <div className="d-flex align-items-center coin-box">
                                            <span>
                                                <svg width="46" height="46" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M37.3334 22.167C37.3318 20.2347 35.7654 18.6688 33.8336 18.6667H23.3334V25.6667H33.8336C35.7654 25.6651 37.3318 24.0987 37.3334 22.167Z" fill="#FFAB2D"/>
                                                    <path d="M23.3334 37.3333H33.8336C35.7664 37.3333 37.3334 35.7664 37.3334 33.8336C37.3334 31.9003 35.7664 30.3333 33.8336 30.3333H23.3334V37.3333Z" fill="#FFAB2D"/>
                                                    <path d="M28 0C12.5361 0 0 12.5361 0 28C0 43.4639 12.5361 56 28 56C43.4639 56 56 43.4639 56 28C55.9823 12.5434 43.4566 0.0177002 28 0ZM42.0003 33.9998C41.9948 38.4163 38.4163 41.9948 34.0004 41.9997V43.9998C34.0004 45.1046 33.1044 46 32.0003 46C30.8955 46 30.0001 45.1046 30.0001 43.9998V41.9997H26.0005V43.9998C26.0005 45.1046 25.1045 46 24.0003 46C22.8956 46 22.0002 45.1046 22.0002 43.9998V41.9997H16.0004C14.8957 41.9997 14.0003 41.1043 14.0003 40.0002C14.0003 38.8954 14.8957 38 16.0004 38H18V18H16.0004C14.8957 18 14.0003 17.1046 14.0003 15.9998C14.0003 14.8951 14.8957 13.9997 16.0004 13.9997H22.0002V12.0002C22.0002 10.8954 22.8956 10 24.0003 10C25.1051 10 26.0005 10.8954 26.0005 12.0002V13.9997H30.0001V12.0002C30.0001 10.8954 30.8955 10 32.0003 10C33.105 10 34.0004 10.8954 34.0004 12.0002V13.9997C38.3998 13.9814 41.9814 17.5324 42.0003 21.9319C42.0101 24.2616 40.9999 26.479 39.2354 28C40.9835 29.5039 41.9924 31.6933 42.0003 33.9998Z" fill="#FFAB2D"/>
                                                </svg>
                                            </span>
                                            <div className="ms-3">
                                                <span className="fs-14 font-w400">Bitcoin</span>	
                                                <Link to={"#"}><h4 className="font-w600 mb-0">BTC / USD</h4></Link>
                                            </div>
                                        </div>
                                        <div className="coin-box">
                                            <span className="mb-1 d-block">Mark Price</span>
                                            <div className="d-flex align-items-center">
                                                <h5 className="font-w600 m-0 ">148.42</h5>
                                                <span className="text-danger ms-2">-3.28%</span>
                                            </div>
                                        </div>	
                                        <div className="coin-box">
                                            <span className="mb-1 d-block">Funding Rate</span>
                                            <h5 className="font-w600 m-0 ">-0,0252%/hr</h5>
                                        </div>	
                                        <div className="coin-box">
                                            <span className="mb-1 d-block">Volume</span>
                                            <h5 className="font-w600 m-0 ">104k</h5>
                                        </div>	
                                        <div className="input-group coin-search-area coin-box">
                                            <input type="text" className="form-control" placeholder="Search here" />
                                            <span className="input-group-text">                                               
                                                {SVGICON.SearchIconSvg}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                       
                        </div>
                        <div className="col-xl-12">
                            <div className="card market-overview">
                                <div className="card-header border-0 flex-wrap pb-0">
                                    <div className="d-flex align-items-center flex-wrap mb-3 mb-sm-0">
                                        <h4 className="card-title mb-0">Market Overview</h4>
                                        <h4 className="fs-16 font-w500 m-0">Depth Chart</h4>
                                        <h4 className="fs-16 font-w500 m-0">Market Details</h4>
                                        <span>
                                           {SVGICON.CardPlus}
                                        </span>
                                    </div>
                                    <div className="setting">
                                        {SVGICON.CardSettingSvg}
                                    </div>
                                </div>
                                <MarketOverViewChart2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-4 col-sm-6 my-order-ile-2">
                    <div className="card trade-history">
                        <div className="card-header border-0 pb-3">
                            <h4 className="card-title">Trade History</h4>
                        </div>
                        <div className="card-body pt-0 dlab-scroll height370">
                            <div className="table-responsive">
                                <table className="table text-center tr-rounded order-tbl">
                                    <thead>
                                        <tr>
                                            <th className="text-start">Price</th>
                                            <th className="text-center">Size</th>
                                            <th className="text-right">Side</th>
                                            <th className="text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyTable.map((item, i)=>(
                                            <tr key={i}>
                                                <td className="text-start">{item.price}</td>
                                                <td>{item.size}</td>
                                                <td className={`text-${item.side==="BUY" ? 'success' : 'danger'}`}>{item.side}</td>
                                                <td>{item.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>           
                        </div>           
                        <div className="card-footer border-0 pt-0">
                            <Link to="/history" className="btn btn-primary d-block btn-sm">Show more <i className="fa-solid fa-caret-right ms-2" /></Link>
                        </div>
                    </div>                               
                </div>
                <div className="col-xl-9 col-xxl-8">
                    <div className="card">
                        <div className="card-header border-0 ">
                            <h4 className="heading">Bar Chart</h4>
                            <span className="setting">
                                {SVGICON.CardSettingSvg}
                            </span>
                        </div>
                        <div className="card-body pt-0">
                            <MarketBarChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Market;