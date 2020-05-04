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
        { 
        controls.map(  
            (control) => <BuildControl label = {control.label} 
            // key has been kept like this because its unique here. 
                                       key = { control.label } 
                                       added = { () => props.ingredientAdded( control.type ) }
                                       removed = { () => props.ingredientRemoved( control.type ) }
                                       disabled = { props.disabled[control.type] } />
        ) }
    </div>

);

export default BuildControls;