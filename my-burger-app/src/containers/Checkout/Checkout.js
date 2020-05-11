import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients : {}
    }

    componentDidMount = () => {
        const ingredients = {};
        const queryParams = new URLSearchParams(this.props.location.search);
        let price = 0;
        for(let param of queryParams.entries()){
            if(param[0] !== 'price')
                ingredients[param[0]] = +param[1];
            else
                price = param[1];

        }
        // console.log("componentDidMount() of checkout component.");
        // console.log(ingredients);
        this.setState({ ingredients : ingredients, totalPrice : price });
    }

    componentDidUpdate(){
        console.log("componentDidUpdate() of checkout component.");
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render(){

        return (
            <div>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients}
                    checkoutCancelled = { this.checkoutCancelHandler }
                    checkoutContinued = { this.checkoutContinueHandler }/>
                <Route path = {this.props.match.path + '/contact-data'} 
                   render = { () => { 
                       return <ContactData 
                        ingredients = { this.state.ingredients }
                        { ...this.props } 
                        price = {this.state.totalPrice} /> } } /> 
            </div>

// route doesnt pass props to the component if we use render method. 
// so we need to pass them explicitly. 
        );
    }
}

export default Checkout;