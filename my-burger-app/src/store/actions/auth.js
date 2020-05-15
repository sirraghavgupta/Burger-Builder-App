import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
}

export const authSuccess = ( authData ) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    };
}

export const authFailed = ( error ) => {
    return {
        type : actionTypes.AUTH_FAILED,
        error : error
    };
}

export const auth = ( email, password ) => {    
    return dispatch  => {

        dispatch( authStart() );

        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxwH27QH1glieZAtX9NBW8XNzr2kM6e28', authData)
             .then( response => {
                console.log( response );
                dispatch( authSuccess( response.data ) );
             })
             .catch( error => {
                console.log(error);
                dispatch(authFailed(error));
             })
    }
}