import React from 'react';
import { Accordion } from 'react-bootstrap';
import Nestable from 'react-nestable';

import {MenuAccordBlog1, MenuAccordBlog2} from './MenuAccord';

const AccordBlog1 = (props) =>{
   return(
   
        <Accordion.Item eventKey={`${props.id}`}>
            <Accordion.Header className="accordion-header rounded-lg">
                <div className="move-media dd-handle">
                    <i className="fas fa-arrows-alt" />
                </div>
                Contact Us 
            </Accordion.Header> 
            <Accordion.Collapse eventKey={`${props.id}`}>
                <div className="accordion-body">
                    <MenuAccordBlog1 />
                </div>
            </Accordion.Collapse>                
        </Accordion.Item>        
    
   )
}
const AccordBlog2= ({title, subtitle, id}) =>{
   return(
   
        <Accordion.Item eventKey={`${id}`}>
            <Accordion.Header className="accordion-header rounded-lg">
                <div className="move-media dd-handle">
                    <i className="fas fa-arrows-alt" />
                </div>
                {title}                 
            </Accordion.Header>
            <Accordion.Collapse eventKey={`${id}`}>
                <div className="accordion-body">
                    <MenuAccordBlog2 />
                </div>
            </Accordion.Collapse>               
        </Accordion.Item>        
   )
}

const ItemList = [
    {id: 0 , text : <AccordBlog1  id={0} />}, 
    {id: 1, text : <AccordBlog2  title="Privacy Policy" subtitle="Fashion" id={1} />}, 
    {id: 2, text : <AccordBlog2  title = "Terms and Conditions" subtitle="Lifestyle" id={2} />}, 
    {id: 3, text : <AccordBlog2  title = "About Us" subtitle="Food" id={3}/>}, 
    {id: 4, text : <AccordBlog2  title = "Important Information" subtitle="Beauty" id={4} />}, 
];
const renderItem = ({ item }) => item.text;

const MenusBlog2 = () => {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title flex-wrap">
                    <div className="cpa d-flex align-items-center flex-wrap">
                        <span className='pe-3 pb-sm-0 pb-3'>Menu Name</span>
                        <input type="text" className="form-control w-auto mb-sm-0 mb-3" placeholder="information" />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-sm ms-sm-auto mb-2 mb-sm-0">Save Menu</button>
                </div>
                <div className="cm-content-body form excerpt">
                    <div className="card-body">
                        <h6 className="mb-0">Menu Structure</h6>
                        <p>Add menu items from the column on the left.</p>
                        <div className="col-xl-7 nestable accord-data">
                            <div className="" id="nestable">
                                <Accordion className="accordion menu-accord" defaultActiveKey={0}>
                                    <ol className="dd-list ps-0" id="accordionExample-1">                                    
                                        <li className="dd-item menu-ac-item" >
                                            <Nestable
                                                items={ItemList}
                                                renderItem={renderItem}
                                                className='ps-0'
                                            />  
                                            
                                        </li>
                                    </ol>
                                </Accordion>
                            </div>
                        </div>
                    </div>		
                </div>
                <div className="filter cm-content-box box-primary style-1 mb-0 border-0 ">
                    <div className="content-title border-bot">
                        <div className="cpa">
                            Delete Menu
                        </div>
                        <button type="submit" className="btn btn-secondary btn-sm">Save Menu</button>
                    </div>
                </div>
            </div>            
        </>
    );
};



export default MenusBlog2;