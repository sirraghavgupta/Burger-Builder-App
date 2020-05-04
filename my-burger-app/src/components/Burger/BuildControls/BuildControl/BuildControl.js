import React from 'react';
import classes from './BuildControl.module.css';

// we have several similar items in the BuildControls component, so we 
// created a separate component for that. 
const BuildControl = (props) => {

    return (
        <div className = { classes.BuildControl }>
            <div className = { classes.Label }> {props.label} </div>
            <button className = { classes.Less }>Less</button>
            <button className = { classes.More }>More</button>
        </div>
    );

}

export default BuildControl;