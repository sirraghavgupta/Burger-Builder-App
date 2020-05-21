import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(false);
  };

  /**
   * this is a better way of setting the state due to the asynchronous
   * nature of setState() method. here, prevState will be automatically
   * passed in the arrow function. this is recommended.
   */
  const toggleSideDrawerHandler = () => {
    setShowSideDrawer((prevShowState) => !prevShowState);
  };

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        toggleDrawer={toggleSideDrawerHandler}
      />

      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        closeDrawer={closeSideDrawerHandler}
        showDrawer={showSideDrawer}
      />

      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
