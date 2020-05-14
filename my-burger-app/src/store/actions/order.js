import * as actionTypes from './actionTypes';
import axios from '../../Axios/instance1';


export const puchaseBurger = ( newOrder ) => {
    return dispatch => {
    
        dispatch( purchaseBurgerStart() );

        axios.post("/orders.json", newOrder)

             .then( response => {
                        dispatch( purchaseBurgerSuccess(response.data.name, newOrder) );
                    })

             .catch( error => {
                        dispatch( purchaseBurgerFailed() );
                    })
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = ( id, newOrder ) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : newOrder
    }
}

export const purchaseBurgerFailed = ( ) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED
    }
}


export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
}

export const fetchOrdersFailed = () => {
    return {
        type : actionTypes.FETCH_ORDERS_FAILED
    };
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch( fetchOrdersStart() );
        axios.get("/orders.json")
             .then( response => {
                const fetchedOrders  = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        id : key,
                        ...response.data[key]
                    });
                }
                dispatch( fetchOrdersSuccess(fetchedOrders) );
             })
             .catch( error => {
                 console.log(error);
                 dispatch( fetchOrdersFailed() );
             })

    }
}
