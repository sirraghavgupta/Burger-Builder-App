import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';

import axios from '../../Axios/instance1';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const getPurchaseState = (ingredients) => {
    const count = Object.values(ingredients).reduce((a, b) => a + b, 0);
    const purchaseState = count > 0;
    return purchaseState;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    console.log('ordering the item');
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ingredients };
  Object.keys(disabledInfo).forEach((type) => {
    disabledInfo[type] = disabledInfo[type] <= 0;
  });

  let burger = props.error ? <p>Something went wrong!!</p> : <Spinner />;
  let orderSummary = null;
  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />

        <BuildControls
          ingredientNames={Object.keys(props.ingredients)}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={getPurchaseState(props.ingredients)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        cancelled={purchaseCancelHandler}
        continued={purchaseContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>

      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name) =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: (name) =>
      dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export { BurgerBuilder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
