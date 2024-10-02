import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from 'react-redux';
import {
    loadingToggleAction,
    signupAction,
} from '../../../store/actions/AuthActions';

// image
import logoWhite from "../../../assets/images/logo-white.png";

function Register(props) {
    let errorsObj = { username: '', email: '', password: '', confirmPassword: '', createIamUser: ''};
    const [errors, setErrors] = useState(errorsObj);

    const [userEmail, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userConfirmPassword, setConfirmPassword] = useState('');
    const [userShowPassword, setShowPassword] = useState(false);
    const [userIam, setCreateIamUser] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (userName === '') {
            errorObj.username = 'Username is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.username,
            })
        }
        if (userEmail === '') {
            errorObj.email = 'Email is Required';
            error = true;			      
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: errorObj.email,                        
            })
        }
        if (userPassword === '') {
            errorObj.password = 'Password is Required';
            error = true;
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: errorObj.password,                      
            })
        }
        if (userPassword !== userConfirmPassword) {
            errorObj.confirmPassword = 'Passwords do not match';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.confirmPassword,
            })
        }
        if (!userIam) {
            errorObj.createIamUser = '* Required';
            error = true;
        }

        setErrors(errorObj);
        if (error) return;

        dispatch(loadingToggleAction(true));
        dispatch(signupAction(userName, userEmail, userPassword, userConfirmPassword, userIam, navigate));
    }

  return (
    <div className="fix-wrapper">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">

                <div className="card mb-0 h-auto">
                    <div className="card-body">
                        <div className="text-center mb-2 logo-signup">
                            <Link to="/login"><img src={logoWhite} alt=""/></Link>
                        </div>
                        <h3 className="text-center mb-4 ">IntelliTrader</h3>
                        <h4 className="text-center mb-4 ">Create a new account</h4>

                        {props.errorMessage && (
                            <div className='text-danger'>
                                {props.errorMessage}
                            </div>
                        )}
                        {props.successMessage && (
                            <div className='text-success'>
                                {props.successMessage}
                            </div>
                        )}

                        <form onSubmit={onSignUp}>

                            <div className="form-group">
                                <label className="form-label">
                                    Username
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="username"
                                    defaultValue={userName}
                                    onChange={e => {
                                        setUsername(e.target.value)
                                    }}
                                />
                                {errors.userName && <div className="text-danger">{errors.userName}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Email
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    defaultValue={userEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="email"
                                />
                                {errors.userEmail && <div className="text-danger">{errors.userEmail}</div>}
                            </div>
                            <div className="mb-4 position-relative">
                                <label className="form-label">
                                    Password
                                    <span className="text-danger">*</span>
                                </label>
                                <div className="password-container">
                                <input defaultValue={userPassword}
                                       className="form-control"
                                       placeholder="password"
                                       type={`${userShowPassword ? "text" : "password"}`}
                                       onChange={e =>
                                            setPassword(e.target.value)
                                       }
                                    />
                                    <span className={`show-pass eye ${userShowPassword ? 'active' : ''}`}
                                          onClick={() => setShowPassword(!userShowPassword)}>
                                        <i className="fa fa-eye-slash"/>
                                        <i className="fa fa-eye"/>
                                    </span>
                                </div>
                                {errors.userPassword && <div className="text-danger">{errors.userPassword}</div>}
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="form-label">
                                    Confirm Password
                                    <span className="text-danger">*</span>
                                </label>
                                <div className="password-container">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="confirm password"
                                        onChange={e =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                {errors.userConfirmPassword && <div className="text-danger">{errors.userConfirmPassword}</div>}
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           checked={userIam}
                                           onChange={() => setCreateIamUser(!userIam)}
                                    />
                                    <label className="form-check-label">
                                        Create Amazon Web Services <b>(IAM)</b> user
                                        <span className="text-danger">*</span>
                                    </label>
                                    {errors.userIam && <div className="text-danger">{errors.userIam}</div>}
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary btn-block">
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
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);

