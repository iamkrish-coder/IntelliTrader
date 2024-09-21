import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';

import CkEditorBlog from '../../elements/CkEditor/CkEditorBlog';

const AddMail = () => {
    const [collapseBtn, setCollapseBtn] = useState(true);
    return (
        <>          
            <div className="row">
                <div className="col-xl-12">
                    <Link to={"/email-template"} type="submit" className="btn btn-sm btn-primary mb-4">List Email Template</Link>
                </div>
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                        <div className="content-title"
                            onClick={()=>setCollapseBtn(!collapseBtn)}
                        >
                            <div className="cpa">
                                <i className="fa-solid fa-envelope me-2"/>Add Email Template		
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${collapseBtn ? 'collapse' : 'expand' }`}>
                                    <i className="fas fa-angle-up" />
                                </Link>
                            </div>
                        </div>
                        <Collapse in={collapseBtn}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <form>
                                                <div className="mb-3">
                                                    <label  className="form-label">Title</label>
                                                    <input type="text" className="form-control" />
                                                    <div className="form-text">Title should be meaning full like : registration email, forgot password email.</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Description</label>
                                                    <textarea className="form-control" rows="5"></textarea>
                                                    <div className="form-text">Decribe about this email template. </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="mb-3">
                                                <label  className="form-label">Slug</label>
                                                <input className="form-control " type="text" placeholder="Slug" aria-label="Disabled input example" disabled />
                                                <div className="form-text">slug will use for url. can't edited.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Placeholder</label>
                                                <div className="new-scroll">
                                                    <div className="d-grid mb-3">
                                                        <h6 className="mb-0">User Configuration</h6>
                                                        <span>#USERNAME#: Username can display with this placeholder.</span>
                                                        <span>#USERNAME#: Username can display with this placeholder.</span>
                                                        <span>#LASTNAME#: Lastname can display with this placeholder.</span>
                                                        <span>#TELEPHONE#: Contact number can display with this placeholder.</span>
                                                        <span>#PASSWORD#: password can display with this placeholder.</span>
                                                        <span>#SITENAME#: Site name can display with this placeholder.</span>
                                                    </div>
                                                    <div className="d-grid mb-3">
                                                        <h6 className="mb-0">Config Configuration</h6>
                                                        <span>#SITENAME#: Site name can display with this placeholder.</span>
                                                        <span>#ADMINEMAIL#: Admin email can display with this placeholder.</span>
                                                        <span>#SUPPORTEMAIL#: Support email can display with this placeholder.</span>
                                                        <span>#SITEADDRESS#: Site address can display with this placeholder.</span>
                                                    </div>
                                                    <div className="d-grid mb-3">
                                                        <h6>Generate Configuration</h6>
                                                        <span>#ACTIVATIONLINK#: Activation link can display with this placeholder.</span>
                                                        <span>#SITELOGO#: Site logo can display with this placeholder.</span>
                                                        <span>#LOGINLINK#: Login link can display with this placeholder.</span>
                                                        <span>#REGESTERLINK#: Registration link can display with this placeholder.</span>
                                                        <span>#REGESTERLINK#: Registration link can display with this placeholder.</span>
                                                    </div>
                                                    <div className="d-grid mb-3">
                                                        <h6>Contact Configuration</h6>
                                                        <span>#NAME#: Contact user name can display with this placeholder.</span>
                                                        <span>#EMAIL#: Contact user email can display with this placeholder.</span>
                                                        <span>#MESSAGE#: Contact user message can display with this placeholder.</span>
                                                    </div>
                                                    <div className="d-grid mb-3">
                                                        <h6>Subscribe Configuration</h6>
                                                        <span>#USERNAME#: Subscribe user email can display with this placeholder.</span>
                                                    </div>
                                                    <div className="d-grid mb-3">
                                                        <h6>Order Configuration</h6>
                                                        <span>#STATUS#: Order Status can display with this placeholder.</span>
                                                        <span>#FIRSTNAME#: User first name can display with this placeholder.</span>
                                                        <span>#LASTNAME#: User last name can display with this placeholder.</span>
                                                        <span>#MESSAGE#: Delivery details or expected deliery date. This message will deliver to customer.</span>
                                                        <span>#ID#: Order number can display with this placeholder.</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-xl-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Email Template</label>
                                                <div className="custom-ekeditor ct-ticket mb-3">                                                
                                                    <CkEditorBlog />
                                                </div>
                                                <div className="form-text mb-3">This design will show in recieved email and place holders will replace with dynamic content.</div>
                                            </div>
                                        </div>
                                        <label className='form-label'>Status</label>
                                        <ul className="d-flex align-items-center mb-3">
                                            <li>
                                                <div className="form-check mb-2">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> 
                                                    <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                                                </div>
                                            </li>
                                            <li>Active status template will use in email sending only.</li>
                                        </ul>
                                        <div className="text-end">
                                            <button type="submit" className="btn btn-primary rounded-sm">Save Email Template</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AddMail;