import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal = (props) => {

  const {show, modalClosed, children} = props;

  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />

      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? 1 : 0,
        }}
      >
        {children}
      </div>
    </Aux>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
// return true if the prevProps and nextProps are equal and false otherwise.
