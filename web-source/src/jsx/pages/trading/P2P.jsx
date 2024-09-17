import React from 'react';
import Select from 'react-select';
import { Nav, Tab } from 'react-bootstrap';

import P2ptable from './P2ptable';
import P2ptableSell from './P2ptableSell';


const datarup = [
    {label:'INR', value:"0"},
    {label:'JPY', value:"1"},
    {label:'KES', value:"2"},
    {label:'KHR', value:"3"},
    {label:'KWD', value:"4"},
    {label:'KZT', value:"5"},
    {label:'LAK', value:"6"},
    {label:'LBP', value:"7"},
    {label:'LKR', value:"8"},
];


const payment = [
    {label:'All Payments', value:'1'},
    {label:'UPI', value:'2'},
    {label:'IMPS', value:'3'},
    {label:'RTGS', value:'4'},
    {label:'Gpay', value:'5'},
    {label:'Paytm', value:'6'},
    {label:'Phonepay', value:'7'},
    {label:'Mokwikbi', value:'8'},    
]

const P2P = () => {
    return (
        <div className="row">
            <Tab.Container defaultActiveKey={'Buy'}>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header border-0">
                            <h4 className="card-title">Buy & Sell Bitcoin</h4>
                            <nav>
                                <Nav as="div" className="nav nav-pills light" >
                                    <Nav.Link as="button" eventKey="Buy" >Buy</Nav.Link>
                                    <Nav.Link as="button" eventKey="Sell" >Sell</Nav.Link>
                                </Nav>
                            </nav>
                        </div>
                        <div className="card-body pt-0">
                            <div className="d-flex flex-wrap">
                                <div className="input-group width-300 mb-2">
                                    <input type="text" className="form-control amount" placeholder="Enter Amount" />
                                </div>
                                <Select
                                    className='custom-react-select p2p-select width-100 mb-2'
                                    options={datarup}
                                    defaultValue={datarup[0]}
                                    isSearchable = {false}
                                />
                                <Select
                                    className='custom-react-select default-select width-200'
                                    options={payment}
                                    defaultValue={payment[0]}
                                    isSearchable = {false}
                                />
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <Tab.Content>
                                <Tab.Pane eventKey="Buy">                                    
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="card-title">P2P: Buy</h4>
                                    </div>
                                    <P2ptable />                                
                                </Tab.Pane>
                                <Tab.Pane eventKey="Sell">                                    
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="card-title">P2P: Sell</h4>
                                    </div>
                                    <P2ptableSell />                         
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>
                </div>
            </Tab.Container>
         </div>
    );
};

export default P2P;