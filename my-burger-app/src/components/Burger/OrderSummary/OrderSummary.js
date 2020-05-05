import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = 
        Object.entries(props.ingredients)
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
            <p>Continue to Checkout?</p>
            <Button clicked = { props.cancelled }
                    btnType = 'Success'>CANCEL</Button>

            <Button clicked = { props.continued }
                    btnType = 'Danger'>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;