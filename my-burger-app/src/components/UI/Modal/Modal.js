import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    /**
     * we need to use PureComponents very carefully if there are many cases 
     * when the component is unnecessarily rerendrered. 
     * else, this method will inturn degrade performance. and it will be 
     * better to have a few useless render cycles. we need to use it 
     * carefully. 
     */
    shouldComponentUpdate( nextprops, nextState ){
        return (nextprops.show !== this.props.show || 
                    nextprops.children !== this.props.children);
    }

    // componentWillUpdate(){
    //     console.log("modal is getting updated");
    // }

    render(){
        return (
            <Aux>
                <Backdrop show = { this.props.show }
                          clicked = { this.props.modalClosed } />
                          
                <div className = { classes.Modal }
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? 1 : 0
                    }}>
                    { this.props.children }
                </div>
            </Aux>
        );
    }
}

export default Modal;