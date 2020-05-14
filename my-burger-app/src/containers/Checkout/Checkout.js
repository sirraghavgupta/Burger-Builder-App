import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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

        let summary = <Redirect to="/" />;

        if( this.props.ingredients ){
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients = {this.props.ingredients}
                        checkoutCancelled = { this.checkoutCancelHandler }
                        checkoutContinued = { this.checkoutContinueHandler }/>
                    <Route path = { this.props.match.path + '/contact-data' }
                        component = { ContactData } /> 
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);