import React from "react";

const StepTwo = () => {
   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Company Name <span className="required"></span></label>
                  <input
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="Cellophane Square"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Company Email Address <span className="required"></span></label>
                  <input
                     type="email"
                     className="form-control"
                     id="emial1"
                     placeholder="example@example.com.com"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">Company Phone Number <span className="required"></span></label>
                  <input
                     type="number"
                     name="phoneNumber"
                     className="form-control"
                     placeholder="(+1)408-657-9007"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="form-group mb-3">
                  <label className="text-label">
                     Your position in Company
                  </label>
                  <input
                     type="text"
                     name="place"
                     className="form-control"
                     required
                  />
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepTwo;
