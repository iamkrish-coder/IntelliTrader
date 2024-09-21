import React from 'react';
import { Link } from 'react-router-dom';
import { SVGICON } from '../../constant/theme';

const soldTable = [
    {currency:'BTC', date:'March 08, 2024', email:'samantha@mail.com', name:'Samanta William',price:'75.00',status:'Paid', color:'success'},
    {currency:'ETH', date:'March 09, 2024', email:'tony@mail.com', name:'Tony Soap',price:'80.50',status:'Paid', color:'success'},
    {currency:'USD', date:'March 10, 2024', email:'nela@mail.com', name:'Nela Vita',price:'60.00',status:'Penidng', color:'warning'},
    {currency:'BCTD', date:'March 11, 2024', email:'nadia@mail.com', name:'Nadia Edja',price:'95.00',status:'Unpaid', color:'danger'},
    {currency:'EURO', date:'March 12, 2024', email:'demo@mail.com', name:'Nadia Edja',price:'73.25',status:'Unpaid', color:'danger'},
    {currency:'EURO', date:'March 13, 2024', email:'demo@mail.com', name:'Nadia Edja',price:'73.25',status:'Unpaid', color:'danger'},
    {currency:'USD', date:'March 14, 2024', email:'nela@mail.com', name:'Nela Vita',price:'60.00',status:'Penidng', color:'warning'},
    {currency:'BCTD', date:'March 16, 2024', email:'nadia@mail.com', name:'Nadia Edja',price:'95.00',status:'Unpaid', color:'danger'},
    {currency:'ETH', date:'March 18, 2024', email:'tony@mail.com', name:'Tony Soap',price:'80.50',status:'Paid', color:'success'},
    {currency:'BTC', date:'March 20, 2024', email:'samantha@mail.com', name:'Samanta William',price:'75.00',status:'Paid', color:'success'},
];


const Orders = () => {
    const chackboxFun = (type) => {
        setTimeout(()=>{               
           const chackbox = document.querySelectorAll(".order-table input");
           const motherChackBox = document.querySelector(".order-table-head input");
           for (let i = 0; i < chackbox.length; i++) {
              const element = chackbox[i];
              if (type === "all") {
                 if (motherChackBox.checked) {
                    element.checked = true;
                 } else {
                    element.checked = false;
                 }
              } else {
                 if (!element.checked) {
                    motherChackBox.checked = false;
                    break;
                 } else {
                    motherChackBox.checked = true;
                 }
              }
           }
        },100)
    };
    return (
        <div className="row">
            <div className="col-xxl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table  tickettable display mb-4 no-footer" id="example6">
                                <thead>
                                    <tr>
                                        <th className="order-table-head" >                                            
                                            <input type="checkbox" className="form-check-input" id="checkAll" required="" 
                                                onClick={() => chackboxFun("all")}
                                            />
                                        </th>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Email</th>
                                        <th>Price</th>
                                        <th className="text-end">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {soldTable.map((item , i)=>(
                                        <tr key={i}>
                                            <td className="order-table">
                                                <div className="checkbox me-0 align-self-center">
                                                    <div className="custom-control custom-checkbox ">
                                                        <input type="checkbox" className="form-check-input" 
                                                            id={`check8${i}`}
                                                            required=" " 
                                                            onClick={() => chackboxFun()}
                                                        />
                                                        <label className="custom-control-label"htmlFor={`check8${i}`}></label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td> 
                                                <span className="font-w600 fs-14"> #ID-01-{i+54750} </span>
                                            </td>
                                            <td className="fs-14 font-w400">{item.date}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <Link to="/email-inbox">
                                                        <div className="icon-box icon-box-sm bg-primary"> 
                                                            {SVGICON.EmailMeszBox}
                                                        </div>
                                                    </Link>
                                                    <div className="ms-3">                                                        
                                                        <h5 className="mb-0"><Link to="/app-profile">{item.name}</Link></h5>
                                                        <span className="fs-14 text-muted">{item.email}</span>
                                                    </div>
                                                </div>	
                                            </td>
                                            <td>$75,00</td>
                                            <td className="text-end">
                                                <span className={`badge badge-sm badge-${item.color}`}>{item.status}</span>
                                            </td>
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

export default Orders;
