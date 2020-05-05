import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : 'Bacon',  type:'bacon' },
    { label : 'Salad',  type:'salad' },
    { label : 'Cheese', type:'cheese'  },
    { label : 'Meat',   type:'meat' }
];

const BuildControls = (props) => (

    <div className = { classes.BuildControls }>
        <p>Current Price : <strong>{ props.price.toFixed(2) }</strong></p>
        { 
        controls.map(  
            (control) => <BuildControl label = {control.label} 
            // key has been kept like this because its unique here. 
                                       key = { control.label } 
                                       added = { () => props.ingredientAdded( control.type ) }
                                       removed = { () => props.ingredientRemoved( control.type ) }
                                       disabled = { props.disabled[control.type] } />
        ) }
        <button className = { classes.OrderButton }
                disabled = { !props.purchasable }
                onClick = { props.ordered }
        >Order Now</button>
    </div>

);

export default BuildControls;