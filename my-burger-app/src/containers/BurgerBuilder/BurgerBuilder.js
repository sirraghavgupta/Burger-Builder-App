import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



// name global constants in capital - convention.
const INGREDIENT_PRICE = {
    bacon : 1,
    meat : 2,
    salad : 3,
    cheese : 0.5
};

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            cheese : 0,
            salad : 0,
            meat : 0,
            bacon : 0
        },
        totalPrice : 4
    }

    addIngredientHandler = (type) => {
        const state = {...this.state};
        state.ingredients[type] += 1;
        state.totalPrice += INGREDIENT_PRICE[type];
        this.setState(state);
    }

    removeIngredientHandler = (type) => {
        const state = {...this.state};

        if(state.ingredients[type] <= 0)
            return;

        state.ingredients[type] -= 1;
        state.totalPrice -= INGREDIENT_PRICE[type];
        this.setState(state);
    }   

    render(){

        const disabledInfo = {...this.state.ingredients};
        Object.keys(disabledInfo).forEach((type)=>{
            disabledInfo[type] = disabledInfo[type] <=0;
        });
        
        return (
            <Aux>
                <Burger ingredients = { this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = { this.addIngredientHandler }
                    ingredientRemoved = { this.removeIngredientHandler }
                    disabled = { disabledInfo }
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;