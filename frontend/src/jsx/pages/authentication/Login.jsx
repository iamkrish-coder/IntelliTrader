import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../../store/actions/AuthActions';

// image
// import logoFull from "../../../assets/images/logo-full.png";
import { IMAGES } from '../../constant/theme';

function Login (props) {	
  	const [email, setEmail] = useState('demo@example.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('123456');

    const dispatch = useDispatch();
	const navigate = useNavigate()
	const randomImage = getRandomImage();
	const randomImage1 = getRandomImage();
	const randomImage2 = getRandomImage();
	const randomImage3 = getRandomImage();

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return ;
		}
		dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, navigate));
    }
	
  	return (
		
		<>
			<div className="authentication d-flex flex-column flex-lg-row flex-column-fluid">
				<div className="login-aside text-center  d-flex flex-column flex-row-auto">
					<div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
						<div className="text-center mb-lg-4 mb-2 pt-5 logo">
							<img src={IMAGES.LogoWhite} alt="" />
						</div>
						<h3 className="mb-2 text-white">IntelliTrader</h3>
						<p className="mb-4">A cutting-edge algorithmic trading application</p>
					</div>
					<div className="aside-image position-relative move-1" style={{backgroundImage:`url(${randomImage})`}}>
					</div>
				</div>
				<div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
					<div className="d-flex justify-content-center h-100 align-items-center">
						<div className="authentication-content style-2">
							<div className="row no-gutters">
								<div className="col-xl-12 tab-content">
									<div id="sign-up" className="auth-form tab-pane fade show active  form-validation">
										<form onSubmit={onLogin}>
											<div className="text-center mb-4">
												<h3 className="text-center mb-2 text-dark">Sign In</h3>
											</div>

											<div className="row mb-4">
												<div className="col-xl-12 col-12">
													<Link to={"#"} className="btn btn-outline-dark btn-sm btn-block">
														<svg className="me-1" width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M27.9851 14.2618C27.9851 13.1146 27.8899 12.2775 27.6837 11.4094H14.2788V16.5871H22.1472C21.9886 17.8738 21.132 19.8116 19.2283 21.1137L19.2016 21.287L23.44 24.4956L23.7336 24.5242C26.4304 22.0904 27.9851 18.5093 27.9851 14.2618Z" fill="#4285F4"/>
															<path d="M14.279 27.904C18.1338 27.904 21.37 26.6637 23.7338 24.5245L19.2285 21.114C18.0228 21.9356 16.4047 22.5092 14.279 22.5092C10.5034 22.5092 7.29894 20.0754 6.15663 16.7114L5.9892 16.7253L1.58205 20.0583L1.52441 20.2149C3.87224 24.7725 8.69486 27.904 14.279 27.904Z" fill="#34A853"/>
															<path d="M6.15656 16.7113C5.85516 15.8432 5.68072 14.913 5.68072 13.9519C5.68072 12.9907 5.85516 12.0606 6.14071 11.1925L6.13272 11.0076L1.67035 7.62109L1.52435 7.68896C0.556704 9.58024 0.00146484 11.7041 0.00146484 13.9519C0.00146484 16.1997 0.556704 18.3234 1.52435 20.2147L6.15656 16.7113Z" fill="#FBBC05"/>
															<path d="M14.279 5.3947C16.9599 5.3947 18.7683 6.52635 19.7995 7.47204L23.8289 3.6275C21.3542 1.37969 18.1338 0 14.279 0C8.69485 0 3.87223 3.1314 1.52441 7.68899L6.14077 11.1925C7.29893 7.82856 10.5034 5.3947 14.279 5.3947Z" fill="#EB4335"/>
														</svg>
														Sign in with Google
													</Link>
												</div>
											</div>

											<div className="separator">
												<span className="d-block mb-4 fs-13">Or with email</span>
											</div>

											{props.errorMessage && (
												<div className='text-danger p-1 my-2'>
													{props.errorMessage}
												</div>
											)}
											{props.successMessage && (
												<div className='text-danger p-1 my-2'>
													{props.successMessage}
												</div>
											)}

											<div className="mb-3">
												<label htmlFor="exampleFormControlInput1" className="form-label required">Email address</label>
												<input type="email" className="form-control"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													placeholder="Type Your Email Address"
												/>									
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}												
											</div>
											<div className="mb-3 position-relative">
												<label className="form-label required">Password</label>												
												<input
													type="password"
													className="form-control"
													value={password}
													placeholder="Type Your Password"
													onChange={(e) =>
														setPassword(e.target.value)
													}
												/>
												<span className="show-pass eye">
													<i className="fa fa-eye-slash" />
													<i className="fa fa-eye" />												
												</span>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
											<div className="form-row d-flex justify-content-between mt-4 mb-2">
												<div className="mb-3">
													<div className="form-check custom-checkbox mb-0">
														<input type="checkbox" className="form-check-input" id="customCheckBox1" required="" />
														<label className="form-check-label" htmlFor="customCheckBox1">Remember me</label>
													</div>
												</div>												
											</div>
											<button className="btn btn-block btn-primary">Sign In</button>											
										</form>
										<div className="new-account mt-3 text-center">
											<p className="font-w500">Create an account? <Link className="text-primary" to="/register" >Sign Up</Link></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
  	);
};

const getRandomImage = () => {
	const filteredKeys = Object.keys(IMAGES).filter(key => key.startsWith('BgPic'));
	if (filteredKeys.length === 0) return IMAGES.BgPic1;

	const randomIndex = Math.floor(Math.random() * filteredKeys.length);
	const randomKey = filteredKeys[randomIndex];
	return IMAGES[randomKey];
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);
