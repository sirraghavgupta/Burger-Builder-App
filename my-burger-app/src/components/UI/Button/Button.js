import React from 'react';

import classes from './Button.module.css';

const button = (props) => {

  const { btnType, clicked, disabled, children} = props;

  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default button;
