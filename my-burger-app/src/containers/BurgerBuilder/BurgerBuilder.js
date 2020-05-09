import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../Axios/instance1';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


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
        purchasing : false,
        loading : false
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
        console.log("ordering the item");

        this.setState( { loading:true } );

        const order = {
            ingredients : this.state.ingredients,
            /**
             * note that in prod env, we never send the price like this. 
             * we will evaluate it on the server again. 
             * as the customer might be manipulating it, so we cant trust that.
             * ---- very important. 
             */
            price : this.state.totalPrice,
            customer : {
                name : 'raghu',
                address : {
                    street : 'testt streey 777',
                    pincode : '99987'
                },
                email : 'test@myburgerapp.com'
            },
            paymentMethod : 'cash',
            deliveryMethod : 'fastest'
        }
        /**
         * its a syntax for firbase that we need to send the requst to 
         * node_name.json. 
         * .json has to be appended always. 
         * it will be different for some other service provider. 
         * 
         * it will basically create a node orders and then store the data inside 
         * that in nested form as json objects.
         * it will maintain a list inside orders and assign a unique id to 
         * all the entries, automatically. 
         */
        axios.post("/orders.json", order)
             .then( response => {
                        console.log("inside the then block");
                        console.log(response);
                        this.setState( { loading:false, purchasing:false } );
                    })
             .catch( error => {
                        console.log("inside the catch block");
                        console.log(error);
                        this.setState( { loading:false, purchasing:false } );
                    });
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
        
        let orderSummary = (
            <OrderSummary ingredients = { this.state.ingredients}
                                  cancelled = { this.purchaseCancelHandler }
                                  continued = { this.purchaseContinueHandler }
                                  price = { this.state.totalPrice }/>
        );
        
        if( this.state.loading ){
            orderSummary = <Spinner/>
        }

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
                       { orderSummary }
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

export default withErrorHandler(BurgerBuilder, axios);