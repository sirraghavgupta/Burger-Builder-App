/* eslint-disable react/prop-types */
import React from 'react';

import classes from './BuildControl.module.css';

// we have several similar items in the BuildControls component, so we
// created a separate component for that.
const BuildControl = (props) => {
  const { label, removed, disabled, added } = props;

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>

      <button
        className={classes.Less}
        onClick={removed}
        disabled={disabled}
      >
        Less
      </button>

      <button type="button" className={classes.More} onClick={added}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
