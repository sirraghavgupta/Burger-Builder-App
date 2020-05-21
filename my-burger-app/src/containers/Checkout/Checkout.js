import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.push('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchaseRedirect}

        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelHandler}
          checkoutContinued={checkoutContinueHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
