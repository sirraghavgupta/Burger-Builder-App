import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

  const {showDrawer, closeDrawer, isAuthenticated} = props;

  let assignedClasses = [classes.SideDrawer, classes.Close];
  if (showDrawer) {
    assignedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={showDrawer} clicked={closeDrawer} />

      <div className={assignedClasses.join(' ')} onClick={closeDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuth={isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
