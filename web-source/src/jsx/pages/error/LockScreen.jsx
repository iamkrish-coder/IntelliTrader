import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
// image
// import logo from "../../assets/images/logo-full.png";
import logoText from "../../../assets/images/logo-full.png";
import logoWhite from "../../../assets/images/logo-white.png";


const LockScreen = () => {

  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    nav("/dashboard");
  };
  return (
    <div className="fix-wrapper ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">              
                <div className="card-body">
                  <div className="text-center mb-2">
                      <div className="brand-logo invoice-logo mb-3">
                        <img className="logo-abbr me-2" width="110" src={logoText} alt="" />
                        <img className="logo-compact" width="110" src={logoWhite} alt="" />
                      </div>                    
                  </div>
                <h4 className="text-center mb-4 ">Account Locked</h4>
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="mb-4 position-relative">
                      <label className="form-label required">Password</label>
                      <input 
                        type={!showPassword ? "password" : "text"} 
                        className="form-control" defaultValue="123456"
                      />
                      <span className={`show-pass eye ${showPassword ? 'active' : ''}`}
                        onClick={()=>setShowPassword(!showPassword)}
                      >
                          <i className="fa fa-eye-slash" />
                          <i className="fa fa-eye"/>
                      </span>
                  </div>
                  <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block">Unlock</button>
                  </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
