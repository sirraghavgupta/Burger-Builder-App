import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component{

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        }
    }

    render(){

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact data please.</h4>

                <input type="text" className = {classes.Input} name="name" placeholder="your Name"/>
                <input type="email" className = {classes.Input} name="email" placeholder="your Email"/>
                <input type="text" className = {classes.Input} name="street" placeholder="your Street"/>
                <input type="text" className = {classes.Input} name="postalCode" placeholder="your Postal Code"/>
                
                <Button btnType = "Success"> Order </Button>
            </div>
        );
    }
}

export default ContactData;