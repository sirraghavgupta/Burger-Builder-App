import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

  const {price, ingredients} = props;

  const ingredientsArray = [];
  
  Object.keys(ingredients).forEach( ingredient => {
    ingredientsArray.push({
      name: ingredient,
      qty: props.ingredients[ingredient],
    });
  });

  const style = {
    textTransform: 'capitalise',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid #ccc',
    padding: '5px',
  };

  const ingredientsOutput = ingredientsArray.map((ingredient) => {
    return (
      <span style={style} key={ingredient.name}>
        {ingredient.name}
        {' '}
        (
        {ingredient.qty}
        )
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>
        Ingredients :
        {ingredientsOutput}
      </p>
      <p>
        Price : 
        <strong>{`USD ${price.toFixed(2)}`}</strong>
      </p>
    </div>
  );
};

export default order;
