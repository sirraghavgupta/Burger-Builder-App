import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../Axios/instance1';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        }, 
        loading : false
    }

    orderHandler = (event) => {
        // i didn't see its usage. 
        event.preventDefault();

        console.log(this.props); 
        console.log(this.props.ingredients);
        
        this.setState( { loading:true } );

        const order = {
            ingredients : this.props.ingredients,
        
            price : this.props.price,
            customer : {
                name : 'raghu',
                address : {
                    street : 'testt streey 777',
                    pincode : '99987'
                },
                email : 'test@myburgerapp.com'
            },
            paymentMethod : 'cash',
            deliveryMethod : 'fastest'
        }

        axios.post("/orders.json", order)
             .then( response => {
                        console.log("inside the then block");
                        console.log(response);
                        this.setState( { loading:false } );
                        this.props.history.push('/');
                    })
             .catch( error => {
                        console.log("inside the catch block");
                        console.log(error);
                        this.setState( { loading:false });
                    })

    }
    
    render(){

        let form  = (
            <form>
                <h4>Enter your contact data please.</h4>

                <input type="text" className = {classes.Input} name="name" placeholder="your Name"/>
                <input type="email" className = {classes.Input} name="email" placeholder="your Email"/>
                <input type="text" className = {classes.Input} name="street" placeholder="your Street"/>
                <input type="text" className = {classes.Input} name="postalCode" placeholder="your Postal Code"/>
                
                <Button btnType = "Success"
                        clicked = { this.orderHandler }> Order </Button>
            </form>
        );
        if(this.state.loading)
            form = <Spinner/>;
        return (
            <div className = {classes.ContactData}>
               {form}
            </div>
        );
    }
}

export default ContactData;