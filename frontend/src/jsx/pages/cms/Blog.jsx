import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';


const options = [
    //{ value: '1', label: 'Select Status' },
    { value: '2', label: 'Published' },
    { value: '3', label: 'Draft' },
    { value: '4', label: 'Trash' },
    { value: '5', label: 'Private' },
    { value: '6', label: 'Pending' }
]


const tableData = [
    {number:"1", title:"Title of first blog post entry"},
    {number:"2", title:"Why Go For A VFX Course?"},
    {number:"3", title:"Reasons To Choose Animation Courses"},
    {number:"4", title:"Blue Screen Vs. Green Screen For VFX"},
    {number:"5", title:"All About Animation"},
];

const Blog = () =>{
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [data, setData] = useState(
		document.querySelectorAll("#blog_wrapper tbody tr")
	);
	const sort = 8;
	const activePag = useRef(0);
	const [test, settest] = useState(0);


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
      setData(document.querySelectorAll("#blog_wrapper tbody tr"));
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
    return(
        <>
                   
            <div className="row">
                <div className="col-xl-12">
                    <div className="filter cm-content-box box-primary">
                        <div className={`content-title`}
                            onClick={() => setOpen(!open)}
                        >
                            <div className="cpa">
                                <i className="fas fa-filter me-2" />Filter
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open ? 'collapse' : 'expand' }`}>
                                    <i className="fas fa-angle-up" />
                                </Link>
                            </div>
                        </div>                      
                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-3 col-sm-6">
                                            <label className='form-label'>Title</label>
                                            <input type="text" className="form-control mb-3 mb-xl-0" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                        <div className="col-xl-3 col-sm-6 mb-3 mb-xl-0">   
                                            <label className='form-label'>Status</label>                                            
                                            <Select 
                                                isSearchable= {false}                                                
                                                options={options} className="custom-react-select"
                                            />
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <label className='form-label'>Date</label>
                                            <div className="input-hasicon mb-sm-0 mb-3">												
                                                <input type="date" name="datepicker" className=" form-control mb-xl-0 mb-3" />												
											</div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 align-self-end">
                                            <button className="btn btn-primary me-2 rounded-sm" title="Click here to Search" type="button"><i className="fas fa-filter me-1"></i>Filter</button>
                                            <button className="btn btn-danger light rounded-sm" title="Click here to remove filter" type="button">Remove Filter</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </Collapse>   
                    </div>
                    <div className="mb-4 pb-3">
                        <ul className="d-flex align-items-center flex-wrap">
                            <li><Link to={"/add-blog"} className="btn btn-sm btn-primary ">Add Blog</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-sm btn-primary mx-1">Blog Category</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-sm btn-primary mt-sm-0 mt-1">Add Blog Category</Link></li>
                        </ul>
                    </div>
                    <div className="filter cm-content-box box-primary">
                        <div className={`content-title`}
                            onClick={() => setOpen2(!open2)}
                        >
                            <div className="cpa">
                                <i className="fa-solid fa-file-lines me-1" />
                                Blogs List
                            </div>
                            <div className="tools">
                                <Link to={"#"} className={`SlideToolHeader ${open2 ? 'collapse' : 'expand' }`}>
                                    <i className="fas fa-angle-up"></i>
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open2}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body py-3">
                                    <div className="table-responsive order-list-table">
                                        <div id="blog_wrapper" className="dataTables_wrapper no-footer">
                                            <table className="table table-responsive-lg table-condensed flip-content">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Title</th>
                                                        <th>Status</th>
                                                        <th>Modified</th>
                                                        <th className='text-end'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((item, ind)=>(
                                                        <tr key={ind}>
                                                            <td>{item.number}</td>
                                                            <td>{item.title}</td>
                                                            <td>Published</td>
                                                            <td>18 Nov, 2023</td>
                                                            <td className='text-end'>
                                                                <Link to={"/blog-category"} className="btn btn-warning btn-sm content-icon me-1">
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <Link to={"#"} className="btn btn-danger btn-sm content-icon ms-1">
                                                                    <i className="fa-solid fa-trash" />
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
                                                        to="#"
                                                        onClick={() =>
                                                        activePag.current > 0 &&
                                                            onClick(activePag.current - 1)
                                                        }
                                                    >
                                                        
                                                        <i className='fa fa-angle-double-left' />
                                                    </Link>
                                                    <span>
                                                        {paggination.map((number, i) => (
                                                        <Link
                                                            key={i}
                                                            to="#"
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
                                                        to="/blog"
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
                                </div>
                            </div>
                        </Collapse> 
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Blog;