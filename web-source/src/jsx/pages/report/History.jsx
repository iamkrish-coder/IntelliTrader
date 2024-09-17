import React from 'react';
import { Tab,Nav } from 'react-bootstrap';

import P2ptable from '../trading/P2ptable';
import P2ptableSell from '../trading/P2ptableSell';
import HistoryTradeTableData from './HistoryTradeTableData';

const History = () => {
    return (
        <div className="row">
            <div className="col-xxl-12">
                <div className="card">
                    <Tab.Container defaultActiveKey="Order">
                        <div className="card-header flex-wrap">                        
                            <h4 className="card-title">Trade History</h4>
                            <nav>
                                <Nav as="div" className="nav nav-pills light">
                                    <Nav.Link eventKey="Order">Order</Nav.Link>
                                    <Nav.Link eventKey="History">Order History</Nav.Link>
                                    <Nav.Link eventKey="Trade">Trade Histroy</Nav.Link>
                                </Nav>
                            </nav>                        
                        </div>
                        <div className="card-body pt-2">
                            <Tab.Content>
                                <Tab.Pane eventKey="Order">
                                    <P2ptable />
                                </Tab.Pane>
                                <Tab.Pane eventKey="History">
                                    <P2ptableSell />  
                                </Tab.Pane>
                                <Tab.Pane eventKey="Trade">                                    
                                    <HistoryTradeTableData /> 
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

export default History;