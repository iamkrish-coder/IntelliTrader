import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../../store/actions/AuthActions';

// image
import logoFull from "../../../assets/images/logo-full.png";

function Register(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()
    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;			      
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: errorObj.email,                        
            })
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
			      Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: errorObj.password,                      
            })
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));
        dispatch(signupAction(email, password, navigate));
    }
  return (
    <div className="fix-wrapper">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
           
             
                <div className="card mb-0 h-auto">
                  <div className="card-body">
                    <div className="text-center mb-2">
                        <Link to="/login"><img src={logoFull} alt="" /></Link>
                    </div>
                    <h4 className="text-center mb-4 ">Create a new account</h4>
                      {props.errorMessage && (
                        <div className='text-danger'>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className='text-danger'>
                          {props.successMessage}
                        </div>
                      )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="username"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                        />
					              {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                      <div className="mb-4 position-relative">
                        <label className="form-label">Password</label>
                        <input defaultValue={password} className="form-control" placeholder="password"
                          type={`${showPassword ? "text" : "password"}`}
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                        />
                        <span className={`show-pass eye ${showPassword ? 'active' : '' }`}
                          onClick={()=>setShowPassword(!showPassword)}
                        >
                            <i className="fa fa-eye-slash" />
                            <i className="fa fa-eye" />
                        </span>
					              {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

