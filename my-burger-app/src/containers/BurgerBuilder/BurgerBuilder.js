import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../Axios/instance1';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const onIngredientAdded = (name) => dispatch(burgerBuilderActions.addIngredient(name));
  const onIngredientRemoved = (name) => dispatch(burgerBuilderActions.removeIngredient(name));
  const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), [
    dispatch,
  ]);
  const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));

  const { ingredients, totalPrice, error, isAuthenticated } = useSelector((state) => {
    return {
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null,
    };
  });

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const getPurchaseState = (ingredients) => {
    const count = Object.values(ingredients).reduce((a, b) => a + b, 0);
    let purchaseState = count > 0 ? true : false;
    return purchaseState;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    console.log('ordering the item');
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...ingredients };
  Object.keys(disabledInfo).forEach((type) => {
    disabledInfo[type] = disabledInfo[type] <= 0;
  });

  let burger = error ? <p>Something went wrong!!</p> : <Spinner />;
  let orderSummary = null;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />

        <BuildControls
          ingredientNames={Object.keys(ingredients)}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={getPurchaseState(ingredients)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        cancelled={purchaseCancelHandler}
        continued={purchaseContinueHandler}
        price={totalPrice}
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

export { BurgerBuilder };

export default withErrorHandler(BurgerBuilder, axios);
