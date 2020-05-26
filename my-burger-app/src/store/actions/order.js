import * as actionTypes from './actionTypes';
import axios from '../../Axios/instance1';

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerSuccess = (id, newOrder) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: newOrder,
  };
};

export const purchaseBurgerFailed = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const puchaseBurger = (newOrder, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());

    axios
      .post(`/orders.json?auth=${token}`, newOrder)

      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, newOrder));
      })

      .catch(() => {
        dispatch(purchaseBurgerFailed());
      });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    /** *
     * in firebase while sending query params like this, we need to use
     * orderBy always and then equalTo after that refers to the same key
     * specified in the orderBy query.
     * also, to make the db searcheable by this prop, we need to modify
     * the indexOn rule in the firebase. and we need to send the prop name
     * within quotes and values also within quoted if its a string.
     */
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${  userId  }"`;
    axios
      .get(`/orders.json${  queryParams}`)
      .then((response) => {
        const fetchedOrders = [];
        
        Object.keys(response.data).forEach( key => {
          fetchedOrders.push({
            id: key,
            ...response.data[key],
          });
        });
        
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchOrdersFailed());
      });
  };
};
