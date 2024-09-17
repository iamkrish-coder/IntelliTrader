import React, {useState, useRef, useEffect} from 'react';
// import { DatePicker } from 'rsuite';
import  DatePicker  from "react-datepicker";    
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';

const options = [
    { value: '1', label: 'Select Status' },
    { value: '2', label: 'Published' },
    { value: '3', label: 'Draft' },
    { value: '4', label: 'Trash' },
    { value: '5', label: 'Private' },
    { value: '6', label: 'Pending' }
]


const tableData = [
    {number:"1", title:"Privacy Policy"},
    {number:"2", title:"Contact Us"},
    {number:"3", title:"Price"},
    {number:"4", title:"Blog"},
    {number:"5", title:"Faq"},
    {number:"6", title:"About us"},
    {number:"7", title:"Portfolio"},
    {number:"8", title:"Schedule"},
    {number:"9", title:"Under Maintenance"},
    {number:"10", title:"Comming Soon"},
    {number:"11", title:"Faq"},
    {number:"12", title:"About us"},
    {number:"13", title:"Portfolio"},
];

const Content = () =>{
    const [startDate, setStartDate] = useState(new Date());
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);

    const [data, setData] = useState(
		document.querySelectorAll("#content_wrapper tbody tr")
	);
	const sort = 8;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
  
   useEffect(() => {
      setData(document.querySelectorAll("#content_wrapper tbody tr"));      
	}, [test]);

  
   
   activePag.current === 0 && chageData(0, sort);
  
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
   
    const [deleteItem, setDeleteItem] = useState(tableData);
    const handleDelete = ind => {
        setDeleteItem(oldValues => {
          return oldValues.filter((_, i) => i !== ind)
        })
    }
    return(
        <>
            
            <div className="row">
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                        <div className="content-title"
                            onClick={() => setOpen(!open)}
                        >
                            <div className="cpa">
                                <i className="fas fa-filter me-2"></i>Filter
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open ? 'collapse' : 'expand' }`}                                   
                                >
                                    <i className="fas fa-angle-up"></i>
                                </Link>
                            </div>
                        </div>
                        
                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row filter-row">
                                        <div className="col-xl-3 col-sm-6">
                                            <label className='form-label'>Title</label>
                                            <input type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-3">
                                            <label className='form-label'>Status</label>
                                            <Select 
                                                isSearchable = {false}
                                                options={options} 
                                                defaultValue={options[0]}
                                                className="custom-react-select"
                                            />
                                        </div>
                                        <div className="col-xl-3 col-sm-6 modal-date">
                                            <label className='form-label'>Date</label>                                            
                                            <div className="input-hasicon mb-xl-0 mb-3">                                               
                                                <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} 
                                                    className="form-control bt-datepicker"
                                                />  
                                                <div className="icon"><i className="far fa-calendar" /></div>
                                            </div>                                         
                                        </div>
                                        <div className="col-xl-3 col-sm-6 align-self-end">
                                            <button className="btn btn-primary rounded-sm me-2" title="Click here to Search" type="button"><i className="fa fa-filter me-1" />Filter</button>
                                            <button className="btn btn-danger rounded-sm light" title="Click here to remove filter" type="button">Remove Filter</button>
                                        </div> 
                                    </div>
                                
                                </div>
                            </div>
                        </Collapse>   
                    </div>
                    <div className="mb-4 pb-3">
                        <Link to={"/add-content"} className="btn btn-primary btn-sm">Add Content</Link>
                    </div>
                    <div className="filter cm-content-box box-primary">
                        <div className={`content-title`}
                            onClick={() => setOpen2(!open2)}
                        >
                            <div className="cpa">
                                <i className="fa-solid fa-file-lines me-2" />Contact List
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open2 ? 'collapse' : 'expand' }`}>
                                    <i className="fas fa-angle-up" />
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open2}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body py-3">
                                    <div className="table-responsive order-list-table">
                                        <div id="content_wrapper" className="dataTables_wrapper no-footer">
                                            <table className="table table-responsive-lg  table-condensed flip-content">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Title</th>
                                                        <th>Status</th>
                                                        <th>Modified</th>
                                                        <th className="text-end">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {deleteItem.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td>{item.number}</td>
                                                            <td>{item.title}</td>
                                                            <td>Published</td>
                                                            <td>18 Feb, 2024</td>
                                                            <td className='text-end'>
                                                                <Link to={"/add-content"} className="btn btn-warning btn-sm content-icon me-1">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <Link to={"#"} className="btn btn-danger btn-sm content-icon ms-1"
                                                                    onClick={()=>handleDelete(ind)}
                                                                >
                                                                    <i className="fa fa-times"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                                                <div className="dataTables_info">
                                                    Showing {activePag.current * sort + 1} to{" "}
                                                    {data.length > (activePag.current + 1) * sort
                                                        ? (activePag.current + 1) * sort
                                                        : data.length}{" "}
                                                    of {data.length} entries
                                                </div>
                                                <div
                                                    className="dataTables_paginate paging_simple_numbers"
                                                    id="example2_paginate"
                                                >
                                                    <Link
                                                        className="paginate_button previous disabled"
                                                        to="/content"
                                                        onClick={() =>
                                                        activePag.current > 0 &&
                                                        onClick(activePag.current - 1)
                                                        }
                                                    >
                                                        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                                                    </Link>
                                                    <span>
                                                        {paggination.map((number, i) => (
                                                        <Link
                                                            key={i}
                                                            to="/content"
                                                            className={`paginate_button  ${
                                                                activePag.current === i ? "current" : ""
                                                            } `}
                                                            onClick={() => onClick(i)}
                                                        >
                                                            {number}
                                                        </Link>
                                                        ))}
                                                    </span>
                                                    <Link
                                                        className="paginate_button next"
                                                        to="/content"
                                                        onClick={() =>
                                                        activePag.current + 1 < paggination.length &&
                                                        onClick(activePag.current + 1)
                                                        }
                                                    >
                                                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                                                    </Link>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse> 
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Content;