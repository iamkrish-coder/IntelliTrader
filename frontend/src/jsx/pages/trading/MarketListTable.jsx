import React, { useRef, useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import { SVGICON } from '../../constant/theme';

const marketDataTable = [
    {price:'$0.6932', highlow:'30,585.00/21,250.00', volume:'30,585.00', cap:'Loss', logo : SVGICON.AustralianDoller, name:'AUD', subtitle:'Australian Doller',change:'+11'},
    {price:'$0.6122', highlow:'30,585.00/21,250.00', volume:'10,385.00', cap:'Trade', logo : SVGICON.MoneroDoller, name:'XMR', subtitle:'Monero',change:'+9'},
    {price:'$0.1232', highlow:'30,585.00/21,250.00', volume:'20,285.00', cap:'Trade', logo : SVGICON.ZcashDoller, name:'ZEC', subtitle:'ZCash',change:'-09'},
    {price:'$0.5332', highlow:'30,585.00/21,250.00', volume:'40,785.00', cap:'Trade', logo : SVGICON.DashDoller, name:'Dash', subtitle:'Dash',change:'+15'},
    {price:'$0.4931', highlow:'30,585.00/21,250.00', volume:'50,580.00', cap:'Loss', logo : SVGICON.EtheriumDoller, name:'ETH', subtitle:'Etherium Classic',change:'-09'},
    {price:'$0.3132', highlow:'30,585.00/21,250.00', volume:'10,580.00', cap:'Trade', logo : SVGICON.RippleDoller, name:'XRP', subtitle:'Ripplecoin',change:'+16'},    
    {price:'$0.2921', highlow:'30,585.00/21,250.00', volume:'20,110.00', cap:'Trade', logo : SVGICON.AustralianDoller, name:'AUD', subtitle:'Australian Doller',change:'+11'},
    {price:'$0.4112', highlow:'30,585.00/21,250.00', volume:'30,580.00', cap:'Trade', logo : SVGICON.MoneroDoller, name:'XMR', subtitle:'Monero',change:'+9'},
    {price:'$0.2112', highlow:'30,585.00/21,250.00', volume:'40,610.00', cap:'Loss', logo : SVGICON.ZcashDoller, name:'ZEC', subtitle:'ZCash',change:'-09'},
    {price:'$0.4432', highlow:'30,585.00/21,250.00', volume:'10,425.00', cap:'Trade', logo : SVGICON.DashDoller, name:'Dash', subtitle:'Dash',change:'+15'},
    {price:'$0.8832', highlow:'30,585.00/21,250.00', volume:'10,235.00', cap:'Trade', logo : SVGICON.EtheriumDoller, name:'ETH', subtitle:'Etherium Classic',change:'-09'},
    {price:'$0.9923', highlow:'30,585.00/21,250.00', volume:'20,145.00', cap:'Loss', logo : SVGICON.RippleDoller, name:'XRP', subtitle:'Ripplecoin',change:'+16'},    
];

const theadData = [
   { heading: 'Name', sortingVale:"name"},
   { heading: 'Price', sortingVale:"price"},
   { heading: 'Change', sortingVale:"change"},
   { heading: '24 High/24 Low', sortingVale:"highlow"},
   { heading: '24 Volume', sortingVale:"volume"},
   { heading: 'Market Cap', sortingVale:"cap"},
];

const MarketListTable = () => {

    const sort = 8;
    const [data, setData] = useState(
        document.querySelectorAll('#example6_wrapper tbody tr')
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
        setData(document.querySelectorAll('#example6_wrapper tbody tr'))        
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
            case "rollno":
                sortedPeople.sort((a, b) => {
                return   a.rollno < b.rollno ? -1 : 1 });
            break;
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
            case "change":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.change.localeCompare(b.change) : b.change.localeCompare(a.change)                    
                });
            break;            
            case "highlow":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.highlow.localeCompare(b.highlow) : b.highlow.localeCompare(a.highlow)                    
                });
            break;        
            case "volume":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.volume.localeCompare(b.volume) : b.volume.localeCompare(a.volume)                    
                });
            break;        
            case "cap":
                sortedPeople.sort((a, b) => {                    
                    return  iconData.complete ? a.cap.localeCompare(b.cap) : b.cap.localeCompare(a.cap)                    
                });
            break;        
            default:
                break;
        }            
        setMarketData(sortedPeople);         
    }  

    return (
        <div className="table-responsive dataTabletrade">
            <div id='example6_wrapper' className='dataTables_wrapper no-footer'>
                <table id="example-history" className="table shadow-hover display  orderbookTable dataTable no-footer" style={{minWidth:"845px"}}>
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
                                <td>
                                    <Link to={"#"} className="market-title d-flex align-items-center">
                                        <div className={`market-icon bg-${item.name === "Dash" ?  'success': 'warning'} `} >
                                            { item.logo}
                                        </div>
                                        <h5 className="mb-0 ms-2">{item.name}</h5>
                                        <span className="text-muted ms-2">{item.subtitle}</span>
                                    </Link>
                                </td>
                                <td>{item.price}</td>
                                <td className={`text-${item.change === "-09" ? 'danger' : 'success'}`}>{item.change}%</td>
                                <td>{item.highlow}</td>
                                <td>{item.volume}</td>
                                <td>$96M</td>
                                <td className="text-end"><Link to={"#"} className={`badge badge-sm badge-${item.cap ==="Trade" ? 'success' : 'danger'}`}>{item.cap}</Link></td>
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

export default MarketListTable;