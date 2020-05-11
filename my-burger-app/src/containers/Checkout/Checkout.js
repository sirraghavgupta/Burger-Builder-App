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
        for(let param of queryParams.entries()){
            ingredients[param[0]] = +param[1];
        }
        // console.log("componentDidMount() of checkout component.");
        // console.log(ingredients);
        this.setState({ ingredients : ingredients });
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
                   component = {ContactData} />
            </div>
        );
    }
}

export default Checkout;