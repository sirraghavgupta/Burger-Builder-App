import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
}

export const authSuccess = ( token, userId ) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token, 
        localId : userId
    };
}

export const authFailed = ( error ) => {
    return {
        type : actionTypes.AUTH_FAILED,
        error : error
    };
}

export const auth = ( email, password, isSignup ) => {    
    return dispatch  => {

        dispatch( authStart() );

        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxwH27QH1glieZAtX9NBW8XNzr2kM6e28';
        
        if( !isSignup )
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxwH27QH1glieZAtX9NBW8XNzr2kM6e28';

        axios.post( url, authData )
             .then( response => {
                console.log( response );
                dispatch( authSuccess( response.data.idToken, response.data.localId ) );
                dispatch( checkAuthTimeout( response.data.expiresIn ) );
             })
             .catch( error => {
                console.log( error );
                dispatch( authFailed( error.response.data.error ) );
            })
    }
}

const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( authLogout() );
        }, expirationTime*1000 );
    }
}

const authLogout = () => {
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}