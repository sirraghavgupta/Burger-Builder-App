import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
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
        loading : false,
        error : false
    }

    componentDidMount = () => {
        console.log("getting ingredients from server - componentDidMount()");
        // axios.get("/ingredients.json")
        //      .then( response => {
        //          this.setState( {
        //                  ingredients : response.data} );
        //      } ).catch( error => {
        //          this.setState( { error:true } );
        //      });
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
        
        let burger = this.state.error ? <p>Something went wrong!!</p> : <Spinner/>;
        let orderSummary = null;
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = { this.props.ingredients} />
        
                    <BuildControls 
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

        
        
        if( this.state.loading ){
            orderSummary = <Spinner/>
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
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded : (name) => dispatch({ 
                                        type : actionTypes.ADD_INGREDIENT,
                                        ingredientName : name }),

        onIngredientRemoved : (name) => dispatch({ 
                                        type : actionTypes.REMOVE_INGREDIENT,
                                        ingredientName : name })
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