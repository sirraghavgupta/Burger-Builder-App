import React from 'react';
import classes from '../Logo/Logo.module.css';
import burgerLogo from '../../assets/images/logo.png';

/**
 * here we need to see that we dont give the hard coded path of the image 
 * in the image tag. because here in dev it will work. but in production, 
 * our actual src folder will not go. there will be a different folder 
 * optimised by webpack. so this path will not be available. 
 * so, we import the image first so that we make webpack aware that 
 * this image is required here. so, it provides the new path automatically.
 */

const logo = (props) => {
    return (
        <div className = { classes.Logo } >
            <img src = {burgerLogo} alt = 'My Burger'/>
        </div>
    );
}

export default logo;