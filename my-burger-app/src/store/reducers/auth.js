import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false
}



const authStart = ( state, action ) => {
    return updateObject( state, { loading : true, error : null } );
}

const authSuccess = ( state, action ) => {
    const newProps = {
        token : action.idToken,
        userId : action.localId,
        error : null,
        loading : false
    };
    return updateObject( state, newProps );
}

const authFailed = ( state, action ) => {
    return updateObject( state, { loading : false, error : action.error } );
}

const authLogout = ( state, action ) => {
    return updateObject( state, { token : null, userId : null } );
}


const reducer = ( state = initialState, action ) => {

    switch( action.type ) {

        case actionTypes.AUTH_START : return authStart( state, action );

        case actionTypes.AUTH_SUCCESS : return authSuccess( state, action );

        case actionTypes.AUTH_FAILED : return authFailed( state, action );

        case actionTypes.AUTH_LOGOUT : return authLogout( state, action );

        default : return state; 
    }
}   


export default reducer;