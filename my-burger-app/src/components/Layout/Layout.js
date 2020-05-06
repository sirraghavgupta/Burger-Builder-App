import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : true
    }

    sidebarClosedHandler = () => {
        this.setState({ showSideDrawer : false });
    }

    render() {
        return (
            <Aux>   
                <Toolbar/>
                <SideDrawer closeDrawer = { this.sidebarClosedHandler }
                            showDrawer = { this.state.showSideDrawer } />

                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;