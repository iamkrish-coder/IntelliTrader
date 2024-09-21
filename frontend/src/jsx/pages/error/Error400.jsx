import React from "react";
import { Link } from "react-router-dom";

const Error400 = () => {
   return (
      <div className="authincation  fix-wrapper">
         <div className="container">
            {" "}
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-6">
                  <div className="error-page">
							<div className="error-inner text-center">
								<div className="dz-error" data-text="400">400</div>
								<h2 className="error-head mb-0"><i className="fa fa-thumbs-down text-danger me-2" />Bad Request</h2>
								<p>You do not have permission to view this resource.</p>
								<Link to={"/dashboard"} className="btn btn-secondary">BACK TO HOMEPAGE</Link>
							</div>
						</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Error400;
