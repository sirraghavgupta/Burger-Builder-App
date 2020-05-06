import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


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
        purchasable : false,
        purchasing : false
    }

    updatePurchaseState = (ingredients) => {
        const count = Object.values(ingredients).reduce( (a,b) => a+b , 0  );
        let purchaseState = count>0 ? true: false;
        this.setState({ purchasable : purchaseState });
    }   

    /**
     * basically, we want to arrow function here because we need to refer to 
     * this. now, we refer to this in render() also but we use normal syntax 
     * there. the issue comes when the method is triggered by an event. then 
     * there is a problem in using the this. so, its preferred to use arrow
     * function always so that we dont miss anything. 
     */
    purchaseHandler = () => {
        this.setState( { purchasing : true } );
    }
    
    purchaseCancelHandler = () => {
        this.setState( { purchasing : false } );
    }

    purchaseContinueHandler = () => {
        alert("u made a purchase.");
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
                {/* // one method is this. 
                {this.state.purchasing ? 
                    <Modal>
                        <OrderSummary ingredients = {this.state.ingredients}/>
                    </Modal>
                    : null
                } */}

                <Modal show = { this.state.purchasing }
                       modalClosed = { this.purchaseCancelHandler }>
                    <OrderSummary ingredients = { this.state.ingredients}
                                  cancelled = { this.purchaseCancelHandler }
                                  continued = { this.purchaseContinueHandler }
                                  price = { this.state.totalPrice }/>
                </Modal>

                <Burger ingredients = { this.state.ingredients} />

                <BuildControls 
                    ingredientAdded = { this.addIngredientHandler }
                    ingredientRemoved = { this.removeIngredientHandler }
                    disabled = { disabledInfo }
                    price = { this.state.totalPrice }
                    purchasable = { this.state.purchasable }
                    ordered = { this.purchaseHandler } 
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;