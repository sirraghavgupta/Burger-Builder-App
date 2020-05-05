import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



// name global constants in capital - convention.
const INGREDIENT_PRICE = {
    bacon : 0.5,
    meat : 0.2,
    salad : 0.3,
    cheese : 0.4
};

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            cheese : 0,
            salad : 0,
            meat : 0,
            bacon : 0
        },
        totalPrice : 4,
        purchasable : false
    }

    updatePurchaseState = (ingredients) => {
        const count = Object.values(ingredients).reduce( (a,b) => a+b , 0  );
        let purchaseState = count>0 ? true: false;
        this.setState({ purchasable : purchaseState });
    }   

    addIngredientHandler = (type) => {
        const state = {...this.state};
        state.ingredients[type] += 1;
        state.totalPrice += INGREDIENT_PRICE[type];
        this.setState(state);
        this.updatePurchaseState(state.ingredients);
    }

    removeIngredientHandler = (type) => {
        const state = {...this.state};

        if(state.ingredients[type] <= 0)
            return;

        state.ingredients[type] -= 1;
        state.totalPrice -= INGREDIENT_PRICE[type];
        this.setState(state);
        /**
         * here if i dont pass in the ingredients in this method, 
         * i need to get that from the state and there is a possibility
         * that setState will not update the state immediately and hence the
         * update purchase state method will get some wrong value. 
         */
        this.updatePurchaseState(state.ingredients);
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
                    price = { this.state.totalPrice }
                    purchasable = { this.state.purchasable }
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;