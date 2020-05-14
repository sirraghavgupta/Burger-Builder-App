import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../Axios/instance1';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class BurgerBuilder extends Component{

    state = {
        purchasing : false,
    }

    componentDidMount = () => {
        console.log("getting ingredients from server - componentDidMount()");
        this.props.onInitIngredients();
    }

    getPurchaseState = (ingredients) => {
        const count = Object.values(ingredients).reduce( (a,b) => a+b , 0  );
        let purchaseState = count>0 ? true: false;
        return purchaseState;
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
        this.props.history.push('/checkout');
    }

    render(){

        const disabledInfo = {...this.props.ingredients};
        Object.keys(disabledInfo).forEach((type)=>{
            disabledInfo[type] = disabledInfo[type] <=0;
        });
        
        let burger = this.props.error ? <p>Something went wrong!!</p> : <Spinner/>;
        let orderSummary = null;
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = { this.props.ingredients} />
        
                    <BuildControls 
                        ingredientNames = { Object.keys(this.props.ingredients) }
                        ingredientAdded = { this.props.onIngredientAdded }
                        ingredientRemoved = { this.props.onIngredientRemoved }
                        disabled = { disabledInfo }
                        price = { this.props.totalPrice }
                        purchasable = { this.getPurchaseState(this.props.ingredients) }
                        ordered = { this.purchaseHandler } 
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary ingredients = { this.props.ingredients}
                                  cancelled = { this.purchaseCancelHandler }
                                  continued = { this.purchaseContinueHandler }
                                  price = { this.props.totalPrice }/>
            );
        }


        return (
            <Aux>
                {/* // one method is this. 
                {this.state.purchasing ? 
                    <Modal>
                        <OrderSummary ingredients = {this.props.ingredients}/>
                    </Modal>
                    : null
                } */}

                <Modal show = { this.state.purchasing }
                       modalClosed = { this.purchaseCancelHandler }>
                       { orderSummary }
                </Modal>

                {burger}

            </Aux>
        );
    }
}


const mapStateToProps = state => {

    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded : (name) => dispatch( burgerBuilderActions.addIngredient(name) ),
        onIngredientRemoved : (name) => dispatch( burgerBuilderActions.removeIngredient(name) ),
        onInitIngredients : () => dispatch( burgerBuilderActions.initIngredients() )
    };
}


/**
 * here we might doubt that we may have problem because there is already 
 * an hoc present to wrap the BurgerBuilder. 
 * answer is - we may have any number of HOCs, it doesnt matter.
 * plus, the connect will add some props to the withErrorHandler and those
 * props might be lost, but here we are passing the props to the 
 * burger builder inside the withErrorHandler. so, its good that we do that. 
 */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));