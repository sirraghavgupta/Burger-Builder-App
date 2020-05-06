import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

    let assignedClasses = [classes.SideDrawer, classes.Close];
    if(props.showDrawer){
        assignedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show = { props.showDrawer } 
                      clicked = { props.closeDrawer }/>

            <div className = { assignedClasses.join(' ') }>
                <div className = { classes.Logo }>
                    <Logo/>
                </div>
                
                <nav>
                    <NavigationItems/>
                </nav>
        </div>
        </Aux>
    );

}

export default sideDrawer;