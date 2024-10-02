import axiosInstance from '../services/AxiosInstance';

// import swal from "sweetalert";
import Swal from "sweetalert2";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';

export function signUp(userName, userEmail, userPassword, userConfirmPassword, userIam) {
    //axios call
    const postData = {
        userName,
        userEmail,
        userPassword,
        userConfirmPassword,
        userIam,
        returnSecureToken: true,
    };
        return axiosInstance.post(
        `/api/register`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axiosInstance.post(
        `/login`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.error) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            // swal("Oops", "Email already exists", "error");
              Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email already exists',                        
              })
            break;
        case 'EMAIL_NOT_FOUND':
             Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email not found',                        
              })
            //return 'Email not found';
                //swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            // swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Invalid Password',                        
            })
            break;
        case 'USER_DISABLED':
            return 'User Disabled';
        case 'JWT_TOKEN_GENERATION_FAILED':
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'JWT Token Failure',
            })
            break;
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    if (typeof tokenDetails === 'string') {
        // For JWT tokens, assume the token is the entire object
        const jwtToken = tokenDetails;
        tokenDetails = {
            token: jwtToken,
            expiresIn: 60 * 60
        };
    }
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: '',
    })
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        //dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
		return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(Logout(navigate));
        return;
    }
		
    dispatch(loginConfirmedAction(tokenDetails));
	
    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}
