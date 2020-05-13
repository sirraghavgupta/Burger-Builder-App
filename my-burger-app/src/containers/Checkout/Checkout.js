import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{


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
                    ingredients = {this.props.ingredients}
                    checkoutCancelled = { this.checkoutCancelHandler }
                    checkoutContinued = { this.checkoutContinueHandler }/>
                <Route path = { this.props.match.path + '/contact-data' }
                       component = { ContactData } /> 
            </div>

// route doesnt pass props to the component if we use render method. 
// so we need to pass them explicitly. 
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);