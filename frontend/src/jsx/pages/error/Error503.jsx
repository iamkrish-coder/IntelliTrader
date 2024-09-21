import React from "react";
import { Link } from "react-router-dom";

const Error503 = () => {
   return (
      <div className="authincation  fix-wrapper">
        <div className="container">
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-6">
                  <div className="error-page">
                     <div className="error-inner text-center">
                        <div className="dz-error" data-text="503">503</div>
                        <h2 className="error-head mb-0"><i className="fa fa-times-circle text-danger" />Service Unavailable</h2>
                        <p>Sorry, we are under maintenance!</p>
                        <Link to={"/dashboard"} className="btn btn-secondary">BACK TO HOMEPAGE</Link>
                     </div>
                  </div>
               </div>
               </div>
         </div>
      </div>
   );
};

export default Error503;
