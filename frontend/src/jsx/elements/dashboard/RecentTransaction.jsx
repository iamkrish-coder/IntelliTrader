import React, { useState } from 'react';

import Btc from '../../../assets/images/svg/btc.svg';
import Dash  from "../../../assets/images/svg/dash.svg"
import Eth from  "../../../assets/images/svg/eth.svg"


import { IMAGES, SVGICON } from '../../constant/theme';

const tableData = [
    {type:'Week', icon : SVGICON.TransferSucces,sender:'Donalt', reciver:'Dr. Jackson', image: IMAGES.Avatar1, coin: Btc, color:'success', status:'COMPLETED' },
    {type:'Week', icon : SVGICON.TransferPending,sender:'Thomas', reciver:'Kritiyan', image: IMAGES.Avatar2, coin: Dash, color:'warning', status:'PENDING' },
    {type:'Week', icon : SVGICON.TransferCencel,sender:'Hitesh', reciver:'Prof. Kalyan', image: IMAGES.Avatar3, coin: Eth, color:'danger', status:'CANCEL' },

    {type:'Month', icon : SVGICON.TransferPending,sender:'Thomas', reciver:'Kritiyan', image: IMAGES.Avatar2, coin: Dash, color:'warning', status:'PENDING' },
    {type:'Month', icon : SVGICON.TransferSucces,sender:'Donalt', reciver:'Dr. Jackson', image: IMAGES.Avatar1, coin: Btc, color:'success', status:'COMPLETED' },
    {type:'Month', icon : SVGICON.TransferCencel,sender:'Hitesh', reciver:'Prof. Kalyan', image: IMAGES.Avatar3, coin: Eth, color:'danger', status:'CANCEL' },

    {type:'Year', icon : SVGICON.TransferSucces,sender:'Donalt', reciver:'Dr. Jackson', image: IMAGES.Avatar1, coin: Btc, color:'success', status:'COMPLETED' },
    {type:'Year', icon : SVGICON.TransferCencel,sender:'Hitesh', reciver:'Prof. Kalyan', image: IMAGES.Avatar3, coin: Eth, color:'danger', status:'CANCEL' },
    {type:'Year', icon : SVGICON.TransferPending,sender:'Thomas', reciver:'Kritiyan', image: IMAGES.Avatar2, coin: Dash, color:'warning', status:'PENDING' },
];

const tabMainData = [
    {name:'Week',type:'week'},
    {name:'Month',type:'month'},
    {name:'Year',type:'year'},
];



const RecentTransaction = () => {
    const [transactionData, setTransactionData] = useState(tableData.slice(0,3));
    const [activeTab, setActiveTab]  = useState('Week');

    function UpdateArray(name){
        let updateDate = tableData.filter((ele)=>{
            return ele.type === name
        })
        setTransactionData(updateDate);
        setActiveTab(name);
    }
    return (
        <div className="card transaction-table">
                <div className="card-header border-0 flex-wrap pb-0">
                    <div className="mb-2">
                        <h4 className="card-title">Recent Transactions</h4>
                        <p className="mb-sm-3 mb-0">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                    <ul className="float-end nav nav-pills mb-2">
                        {tabMainData.map((item,i)=>(
                            <li className="nav-item" key={i}>
                                <button className={`nav-link ${item.name === activeTab ? 'active' : ''}`} 
                                    onClick={()=>UpdateArray(item.name)}                                    
                                >{item.name}</button>
                            </li>
                        ))}                       
                    </ul>
                </div>
                <div className="card-body p-0">
                    <div className="tab-content" id="myTabContent1">
                        <div className="tab-pane fade show active" id="Week" role="tabpanel" aria-labelledby="Week-tab">
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Coin</th>
                                            <th>Amount</th>
                                            <th className="text-end">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionData.map((item, ind)=>(
                                            <tr key={ind}>
                                                <td>
                                                    {item.icon}
                                                </td>
                                                <td>#12415346563475</td>
                                                <td>01 August 2020</td>
                                                <td>{item.sender}</td>
                                                <td><div className="d-flex align-items-center"><img src={item.image} className=" me-2" width="30" alt="" /> <span className="w-space-no">{item.reciver}</span></div></td>
                                                <td><div className="d-flex align-items-center"><img src={item.coin} alt="" className="me-2 img-btc" />Bitcoin</div></td>
                                                <td className="text-success font-w600">+$5,553</td>
                                                <td className="text-end"><div className={`badge badge-sm badge-${item.color}`}>{item.status}</div></td>
                                            </tr>
                                        ))}                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    );
};

export default RecentTransaction;