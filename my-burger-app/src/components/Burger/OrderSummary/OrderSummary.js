import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const { ingredients, price, cancelled, continued } = props;

  const ingredientSummary = Object.entries(ingredients).map(([label, qty]) => {
    return (
      <li key={label}>
        <span style={{ textTransform: 'capitalize' }}>{label}</span>
        :
        {qty}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>

      <ul>{ingredientSummary}</ul>

      <p>
        <strong>
          Total price :
          {price.toFixed(2)}
        </strong>
      </p>

      <p>Continue to Checkout?</p>

      <Button clicked={cancelled} btnType="Success">
        CANCEL
      </Button>

      <Button clicked={continued} btnType="Danger">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
