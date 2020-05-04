import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {

    // prepare the ingredient components array from the state object.
    // keep in mind their quantity also. 
    let transformedIngredients = Object.entries(props.ingredients).map(
        ([name, quantity])=>{
            return Array(quantity)
                    .fill(name)
                    .map( (_, index) => <BurgerIngredient type = {name}
                                                  key = {name+index} />);
        }
    );
    
    // flatten it. 
    transformedIngredients = transformedIngredients.flat();
    console.log(transformedIngredients);

    if(transformedIngredients.length === 0)
        transformedIngredients = <p>Please add some ingredients</p>

    return (
        <div className = { classes.Burger }>

            {/* always there */}
            <BurgerIngredient type="bread-top" />

            {transformedIngredients}
            
            {/* always there */}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
