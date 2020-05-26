import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => {

  const {isAuth} = props;

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>

      {isAuth ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}

      {isAuth ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
