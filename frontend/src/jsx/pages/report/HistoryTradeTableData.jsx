import React, { useRef, useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import { SVGICON } from '../../constant/theme';

const marketDataTable = [
     { date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'576.76',price:'100.00', logo : SVGICON.AustralianDoller, name:'AUD', side:"Buy"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'176.76',price:'110.00',  logo : SVGICON.MoneroDoller, name:'XMR', side:"Sell"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'212.50',price:'120.00',  logo : SVGICON.ZcashDoller, name:'ZEC', side:"Buy"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'141.75',price:'130.00',  logo : SVGICON.DashDoller, name:'DASH', side:"Sell"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'321.70',price:'140.00', logo : SVGICON.EtheriumDoller, name:'ETH', side:"Buy"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'176.50',price:'170.00',  logo : SVGICON.RippleDoller, name:'XRP', side:"Buy"},    
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'256.66',price:'190.00',  logo : SVGICON.AustralianDoller, name:'AUD', side:"Sell"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'356.10',price:'110.00',  logo : SVGICON.MoneroDoller, name:'XMR', side:"Buy"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'446.11',price:'120.00', logo : SVGICON.ZcashDoller, name:'ZEC', side:"Sell"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'136.50',price:'130.00',  logo : SVGICON.DashDoller, name:'DASH', side:"Buy"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'216.20',price:'140.00',  logo : SVGICON.EtheriumDoller, name:'ETH', side:"Sell"},
    {  date:'2022-10-03 16:24', order:'Limit', filled:'-', total:'526.10',price:'200.00', logo : SVGICON.RippleDoller, name:'XRP', side:"Buy"},    
];


const theadData = [
   { heading: 'Date', sortingVale:"date"},
   { heading: 'Pair', sortingVale:"name"},
   { heading: 'Side', sortingVale:"side"},
   { heading: 'Order', sortingVale:"order"},
   { heading: 'Filled', sortingVale:"filled"},
   { heading: 'Price', sortingVale:"price"},
   { heading: 'Total', sortingVale:"total"},
];

const HistoryTradeTableData = () => {

    const sort = 8;
    const [data, setData] = useState(
        document.querySelectorAll('#trade_table tbody tr')
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
        setData(document.querySelectorAll('#trade_table tbody tr'))        
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

    const [marketData, setMarketData] = useState([...marketDataTable]);
    const [iconData, setIconDate] = useState({ complete: false ,ind : Number});


    function SotingData(name){
        const sortedPeople = [...marketData]; 
        switch (name) {
            
            case "name":
                sortedPeople.sort((a, b) => {                    
                 return  iconData.complete ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)                    
                });
            break;            
            case "price":
                sortedPeople.sort((a, b) => {                    
                 return  iconData.complete ? a.price.localeCompare(b.price) : b.price.localeCompare(a.price)                    
                });
            break; 
            case "total":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.total.localeCompare(b.total) : b.total.localeCompare(a.total)                    
                });
            break;        
            case "side":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.side.localeCompare(b.side) : b.side.localeCompare(a.side)                    
                });
            break;        
            default:
                break;
        }            
        setMarketData(sortedPeople);         
    }  

    return (
        <div className="table-responsive dataTabletrade">
            <div id='trade_table' className='dataTables_wrapper no-footer'>
                <table id="example-history" className="table shadow-hover display orderbookTable dataTable no-footer" style={{minWidth:"845px"}}>
                    <thead>
                        <tr>
                            {theadData.map((item, ind)=>(
                                <th key={ind}
                                    onClick={()=>{SotingData(item.sortingVale); setIconDate(prevState => ({complete:!prevState.complete, ind: ind }) )}}
                                >
                                    {item.heading}
                                    <span>
                                        {ind !== iconData.ind &&
                                            <i className="fa fa-sort ms-2 fs-12" style={{opacity: '0.3'}} />                                                                
                                        }
                                        {ind === iconData.ind && (
                                            iconData.complete ? 
                                                <i className="fa fa-arrow-down ms-2 fs-12"  style={{opacity: '0.7'}} />
                                                :
                                                <i className="fa fa-arrow-up ms-2 fs-12" style={{opacity: '0.7'}} />                                                                    
                                            )                                                            
                                        }
                                    </span>
                                </th>
                            ))}                            
                            <th className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marketData.map((item, i)=>(
                            <tr key={i}>
                                
                                <td>2022-10-03 16:24</td>
                                <td>
                                    <Link to={"#"}  className="market-title d-flex align-items-center">
                                        <div className={`market-icon me-2 ${item.name==="DASH" ? 'bg-success' : item.name === "ZEC" ? 'bg-warning' : ''  }`}>
                                            { item.logo}
                                        </div>                                        
                                        {item.name}/USDT
                                    </Link>
                                </td>
                                <td>
                                    <span className={`badge badge-sm badge-${item.side==="Buy" ? 'success' : 'danger' }`}>{item.side}</span>
                                </td>
                                <td>{item.order}</td>
                                <td>{item.filled}</td>
                                <td><span className="badge badge-sm badge-light">${item.price}</span> </td>
                                <td>{item.total}</td>
                                <td>
                                    <div className="text-end">
                                        <Link to={"#"} className="btn btn-primary shadow btn-xs sharp me-3"><i className="fas fa-pencil-alt" /></Link>
                                        <Link to={"#"} className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash" /></Link>
                                    </div>												
                                </td>                                
                            </tr>
                        ))}                       
                    </tbody>
                </table>
                <div className='mt-3 d-flex justify-content-between align-items-center'>
                    <div className='dataTables_info'>
                        Showing {activePag.current * sort + 1} to{' '}
                        {data.length > (activePag.current + 1) * sort
                            ? (activePag.current + 1) * sort
                            : data.length}{' '}
                        of {data.length} entries
                    </div>
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
    );
};

export default HistoryTradeTableData;