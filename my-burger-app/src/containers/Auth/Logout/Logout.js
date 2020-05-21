import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../../store/actions/index';

const Logout = (props) => {
  useState(() => {
    props.onLogout();
  });

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
