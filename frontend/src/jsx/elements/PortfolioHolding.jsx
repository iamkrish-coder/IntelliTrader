import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { SVGICON } from '../constant/theme';
import { Link } from 'react-router-dom';

const coinHoldingBlog = [
    { logoicon: SVGICON.MoneroSvg, title: 'Monero', subtitle: 'XMR', status: 'success', color: '#3ab67a' },
    { logoicon: SVGICON.BitCoin, title: 'BitCoin', subtitle: 'BIT', status: 'success', color: '#3ab67a' },
    { logoicon: SVGICON.LiteCoinSvg, title: 'LiteCoin', subtitle: 'LTC', status: 'danger', color: '#EE3232' },
    { logoicon: SVGICON.MoneroSvg, title: 'Monero', subtitle: 'XMR', status: 'success', color: '#3ab67a' },
    { logoicon: SVGICON.EthereumSvg, title: 'Ethereum', subtitle: 'ETH', status: 'success', color: '#3ab67a' }
];

const PortfolioHolding = () => {
    return (
        <div className="card-body pt-0">
            {coinHoldingBlog.map((item, i) => (
                <div className="coin-holding" key={i}>
                    <div className="coin-box-warper">
                        <div className="d-flex align-items-center">
                            <div>
                                {item.logoicon}
                            </div>
                            <div className="ms-3">
                                <h4 className="font-w600 mb-0">{item.title}</h4>
                                <p className="mb-0">{item.subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="coin-box-warper">
                        <div className="d-flex align-items-center">
                            <span>
                                {item.status === "success" ?
                                    <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="#13B440" />
                                        <rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="#13B440" />
                                        <rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="#13B440" />
                                        <rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="#13B440" />
                                    </svg>
                                    :
                                    <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="4.71425" height="34.5712" rx="2.35713" transform="matrix(-1 0 0 1 33 0)" fill="#FD5353" />
                                        <rect width="4.71425" height="25.1427" rx="2.35713" transform="matrix(-1 0 0 1 23.5713 9.42853)" fill="#FD5353" />
                                        <rect width="4.71425" height="10.9999" rx="2.35713" transform="matrix(-1 0 0 1 14.1436 23.5713)" fill="#FD5353" />
                                        <rect width="5.31864" height="21.2746" rx="2.65932" transform="matrix(-1 0 0 1 5.31836 13.2966)" fill="#FD5353" />
                                    </svg>
                                }
                            </span>
                            <div className="ms-4">
                                <h4 className=" font-w600 mb-1">$18,783.33</h4>
                                <div className="d-flex align-items-center">
                                    <svg className="me-2" width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.3291 13C2.24645 11.9157 5.22374 8.72772 6.82538 7L12.8213 10L19.8166 1" stroke="#13B440" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <p className="mb-0"><span className="text-success">45%</span> This week</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="coin-box-warper">
                        {item.status === "success" ?
                            <Sparklines data={[8, 7, 8, 6, 9, 2, 5, 7, 5, 3, 8, 6, 8, 7, 8, 6]} style={{ width: "290px", height: "50px" }}>
                                <SparklinesLine color="#3ab67a" style={{ strokeWidth: 4 }} />
                            </Sparklines>
                            :
                            <Sparklines data={[6, 7, 6, 2, 7, 2, 5, 7, 5, 3, 8, 6, 8, 7, 8, 6]} style={{ width: "290px", height: "50px" }}>
                                <SparklinesLine color="#EE3232" style={{ strokeWidth: 4 }} />
                            </Sparklines>
                        }
                    </div>
                    <div className="coin-box-warper">
                        <div className="justify-content-end d-flex">
                            <Link to={"#"}>
                                {SVGICON.OpenEyes}
                            </Link>
                            <Link to={"#"}>
                                {SVGICON.DocumentSvg}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default PortfolioHolding;