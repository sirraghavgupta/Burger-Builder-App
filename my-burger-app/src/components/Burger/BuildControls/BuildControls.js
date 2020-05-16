import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price : <strong>{props.price.toFixed(2)}</strong>
    </p>

    {props.ingredientNames.map((ingredientName) => (
      <BuildControl
        label={ingredientName}
        // key has been kept like this because its unique here.
        key={ingredientName}
        added={() => props.ingredientAdded(ingredientName)}
        removed={() => props.ingredientRemoved(ingredientName)}
        disabled={props.disabled[ingredientName]}
      />
    ))}

    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
      {props.isAuth ? 'Order Now' : 'Signup To Continue'}
    </button>
  </div>
);

export default BuildControls;
