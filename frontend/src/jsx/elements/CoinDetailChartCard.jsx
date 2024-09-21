import React from 'react';
import Select from 'react-select';


import BitCoinChart from './BitCoinChart';
import { Link } from 'react-router-dom';
import DateRangeCalendar from './DateRangeCalendar';
import { SVGICON } from '../constant/theme';

const options = [
    { value: '1', label: 'USD ($ US Dollar)' },
    { value: '2', label: 'BTC ($ US Dollar)' },
    { value: '3', label: 'USD ($ US Dollar)' },
]


const CoinDetailChartCard = () => {
    return (
        <>
            <div className="card coin-content">
                <div className="card-header border-0 flex-wrap pb-0">
                    <div className="mb-xl-0 mb-2">
                        <h4 className="card-title">Coin Chart</h4>
                        <span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
                    </div>
                    <div className="guest-calendar d-flex align-items-center mb-2 mb-sm-0">
                        {SVGICON.CalendarSvg}
                        <DateRangeCalendar />
                    </div>
                    <Select
                        options={options}
                        isSearchable={false}
                        defaultValue={options[1]}
                        className="custom-react-select"
                    />

                    <Link to={"#"} className="btn btn-primary btn-sm">
                        {SVGICON.DownloadArrow}
                        Get Report
                    </Link>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-end justify-content-between flex-wrap">
                            <div className="price-content">
                                <span className="d-block mb-2">Price</span>
                                <h4 className="fs-20 font-w600 mb-0">$9,542.39</h4>
                            </div>
                            <div className="price-content">
                                <span className="fs-14 d-block mb-2">24h% change</span>
                                <h4 className="font-w600 text-success mb-0">1.64%<i className="fa-solid fa-caret-up ms-1 text-success"></i></h4>
                            </div>
                            <div className="price-content">
                                <span className="fs-14 d-block mb-2">Volume (24h)</span>
                                <h4 className="font-w600 mb-0">$47.22B</h4>
                            </div>
                            <div className="price-content">
                                <span className="fs-14 d-block mb-2">Market Cap</span>
                                <h4 className="font-w600 mb-0">$219.24B</h4>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <h4 className="me-4 font-w600 mb-0"><span className="text-success me-2">BUY</span> $5,673</h4>
                            <h4 className="font-w600 mb-0"><span className="text-danger me-2">SELL</span> $5,982</h4>
                        </div>
                    </div>
                    <div id="bitcoinhChart">
                        <BitCoinChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoinDetailChartCard;