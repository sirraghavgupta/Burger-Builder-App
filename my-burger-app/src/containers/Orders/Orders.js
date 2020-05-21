import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../Axios/instance1';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';

const Orders = (props) => {
  useEffect(() => {
    props.onInitOrders(props.token, props.userId);
  }, []);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => {
      return <Order key={order.id} ingredients={order.ingredients} price={+order.price} />;
    });
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
