import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const tableData = [
    {name:'Airi Satou', trade:'Accountant', location:'Tokyo', price:'33', date:'2024/11/28', amount:'$162,700'},
    {name:'Cedric Kelly', trade:'Senior Javascript Developer', location:'Edinburgh', price:'22', date:'2024/03/29', amount:'$433,060'},
    {name:'Garrett Winters', trade:'Accountant', location:'Tokyo', price:'63', date:'2024/07/25', amount:'$170,750'},
    {name:'Cedric Kelly', trade:'Senior Javascript Developer', location:'Edinburgh', price:'22', date:'2024/03/29', amount:'$433,060'},
    {name:'Ashton Cox', trade:'Junior Technical Author', location:'San Francisco', price:'66', date:'2024/01/12', amount:'$86,000'},
    {name:'Airi Satou', trade:'Accountant', location:'Tokyo', price:'33', date:'2024/11/28', amount:'$162,700'},
    {name:'Brielle Williamson', trade:'Integration Specialist', location:'New York', price:'61', date:'2024/12/02', amount:'$372,000'},
    {name:'Garrett Winters', trade:'Accountant', location:'Tokyo', price:'63', date:'2024/07/25', amount:'$170,750'},
    {name:'Tiger Nixon', trade:'System Architect', location:'Edinburgh', price:'61', date:'2011/04/25', amount:'$320,800'},
    {name:'Ashton Cox', trade:'Junior Technical Author', location:'San Francisco', price:'66', date:'2024/01/12', amount:'$86,000'},
];

const FutureHistory = () => {
    const sort = 7;
    const [data, setData] = useState(
        document.querySelectorAll('#history_table tbody tr')
    )
    
    const activePag = useRef(0)
    const [test, settest] = useState(0)    
    
    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
          if (i >= frist && i < sec) {
            data[i].classList.remove('d-none')
          } else {
            data[i].classList.add('d-none')
          }
        }
    }      
    useEffect(() => {
        setData(document.querySelectorAll('#history_table tbody tr'))        
    }, [test])    
      
    activePag.current === 0 && chageData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)    
      
    const onClick = (i) => {
        activePag.current = i
        chageData(activePag.current * sort, (activePag.current + 1) * sort)
        settest(i)
    }
    return (
        <>
            <div className="table-responsive dataTabletrade">
                <div id='history_table' className='dataTables_wrapper no-footer'>
                    <table className="table display orderbookTable" style={{minWidth:"845px"}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Trade</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th className="text-end">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, i)=>(
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.trade}</td>
                                    <td>{item.location}</td>
                                    <td>{item.price}</td>
                                    <td>{item.date}</td>
                                    <td className="text-end">{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                    <div className='d-flex justify-content-end align-items-center'>                       
                        <div
                            className='dataTables_paginate paging_simple_numbers'
                            id='example-history_paginate'
                        >
                            <Link
                                className='paginate_button text-center previous disabled'
                                to='#'
                                onClick={() =>
                                    activePag.current > 0 && onClick(activePag.current - 1)
                                }
                            >                                                
                                <i className='fa fa-angle-double-left' />
                            </Link>
                            <span>
                                {paggination.map((number, i) => (
                                    <Link
                                        key={i}
                                        to='#'
                                        className={`paginate_button  ${
                                            activePag.current === i ? 'current' : ''
                                        } `}
                                        onClick={() => onClick(i)}
                                    >
                                        {number}
                                    </Link>
                                ))}
                            </span>
                            <Link
                                className='paginate_button next text-center'
                                to='#'
                                onClick={() =>
                                    activePag.current + 1 < paggination.length &&
                                    onClick(activePag.current + 1)
                                }
                            >                                                
                                <i className='fa fa-angle-double-right' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    );
};

export default FutureHistory;