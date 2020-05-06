import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component{

    // componentWillUpdate = () => {
    //     console.log("order summary will update");
    // }

    render(){
        const ingredientSummary = 
        Object.entries(this.props.ingredients)
                 .map( ([label, qty]) => {
                    return <li key = { label }> 
                                <span style = {{textTransform : 'capitalize'}}>
                                        {label}
                                </span> : {qty} 
                            </li>;
                 } );

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>

            <ul>
                { ingredientSummary }
            </ul>

            <p><strong>Total price : {this.props.price.toFixed(2)}</strong></p>

            <p>Continue to Checkout?</p>

            <Button clicked = { this.props.cancelled }
                    btnType = 'Success'>CANCEL</Button>

            <Button clicked = { this.props.continued }
                    btnType = 'Danger'>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;