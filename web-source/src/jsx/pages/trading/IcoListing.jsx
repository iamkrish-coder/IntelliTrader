import React from 'react';

import btc1 from './../../../assets/images/svg/btc1.svg';
import eth1 from './../../../assets/images/svg/ethereum-1.svg';
import lit3 from './../../../assets/images/svg/lit3.svg';
import monero1 from './../../../assets/images/svg/monero.svg';
import ripple1 from './../../../assets/images/svg/ripple-1.svg';
import eth2 from './../../../assets/images/svg/eth2.svg';
import litcoin11 from './../../../assets/images/svg/litecoin-1.svg';
import ltc1 from './../../../assets/images/svg/ltc.svg';
import { Link } from 'react-router-dom';

const listingData = [
    { svgicon : btc1, name:'Bitcoin', subtitle:'Finance', },
    { svgicon : eth1, name:'Litecoin', subtitle:'Infrastructure', },
    { svgicon : lit3, name:'Etherium', subtitle:'Construction', },
    { svgicon : monero1, name:'Monero', subtitle:'Infrastructure', },
    { svgicon : ripple1, name:'Cardano', subtitle:'Future', },
    { svgicon : eth2, name:'Ardor', subtitle:'Technology', },
    { svgicon : litcoin11, name:'OmiGO', subtitle:'Trading', },
    { svgicon : ltc1, name:'Tether', subtitle:'Curruncy', },
    { svgicon : monero1, name:'Monero', subtitle:'Infrastructure', },
    { svgicon : ripple1, name:'Cardano', subtitle:'Future', },
    { svgicon : eth2, name:'Ardor', subtitle:'Technology', },
    { svgicon : litcoin11, name:'OmiGO', subtitle:'Trading', },
    { svgicon : eth1, name:'Litecoin', subtitle:'Infrastructure', },
    { svgicon : lit3, name:'Etherium', subtitle:'Construction', },
    { svgicon : monero1, name:'Monero', subtitle:'Infrastructure', },
    { svgicon : btc1, name:'Bitcoin', subtitle:'Finance', },
];

const IcoListing = () => {
    return (
        <div className="row">
            <div className="col-xl-12">                   
                <div className="row">
                    {listingData.map((data, index)=>(
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={index}>
                            <div className="card pull-up">
                                <div className="card-body align-items-center flex-wrap">
                                    <div className="d-flex align-items-center mb-4">
                                        <Link to={"#"} className="ico-icon">
                                            <img src={data.svgicon} alt="" />
                                        </Link>
                                        <div className="ms-3">
                                            <Link to={"#"}><h4 className="card-title mb-0">{data.name}</h4></Link>
                                            <span>{data.subtitle}</span>
                                        </div>
                                    </div>	
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <p className="mb-0 fs-14 text-dark font-w600">$72/{index+80}</p>
                                            <span className="fs-12">Neutral</span>
                                        </div>
                                        <div>
                                            <p className="mb-0 fs-14 text-success font-w600">{index+40}%</p>
                                            <span className="fs-12">Ended {index+12} Oct</span>
                                        </div>
                                    </div>
                                </div>	
                            </div>
                        </div>
                    ))}
                </div>    
            </div>    
        </div>    
    );
};

export default IcoListing;