import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const BuildControls = (props) => {
  const { price, ingredientNames, purchasable, ordered, isAuth } = props;

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price :<strong>{price.toFixed(2)}</strong>
      </p>

      {ingredientNames.map((ingredientName) => (
        <BuildControl
          label={ingredientName}
          // key has been kept like this because its unique here.
          key={ingredientName}
          added={() => props.ingredientAdded(ingredientName)}
          removed={() => props.ingredientRemoved(ingredientName)}
          disabled={props.disabled[ingredientName]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={ordered}
      >
        {isAuth ? 'Order Now' : 'Signup To Continue'}
      </button>
    </div>
  );
};

export default BuildControls;
