import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.module.css';

const toolbar = (props) => {

  const {toggleDrawer, isAuthenticated} = props;

  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={toggleDrawer} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolbar;
