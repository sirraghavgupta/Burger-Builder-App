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

    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer : true });
    }

    render() {
        return (
            <Aux>   
                <Toolbar showDrawer = { this.showSideDrawerHandler }/>
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