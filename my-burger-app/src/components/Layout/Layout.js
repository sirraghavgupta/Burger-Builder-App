import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer : false });
    }

    /**
     * this is a better way of setting the state due to the asynchronous
     * nature of setState() method. here, prevState will be automatically 
     * passed in the arrow function. this is recommended. 
     */
    toggleSideDrawerHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer : !prevState.showSideDrawer }
        } );
    }

    render() {
        return (
            <Aux>   
                <Toolbar toggleDrawer = { this.toggleSideDrawerHandler }/>
                <SideDrawer closeDrawer = { this.closeSideDrawerHandler }
                            showDrawer = { this.state.showSideDrawer } />

                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;