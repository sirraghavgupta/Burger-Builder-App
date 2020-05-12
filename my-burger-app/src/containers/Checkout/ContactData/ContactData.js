import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../Axios/instance1';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


const getFormElementObject = ( tagType, inputType, placeHolder, val) => {
    return {
        elementType : tagType,
        elementConfig : {
            type : inputType,
            placeholder : placeHolder
        },
        value : val
    }
}

class ContactData extends Component{

    state = {
        orderForm : {
            name : getFormElementObject('input', 'text', 'Your Name', ''),
            street : getFormElementObject('input', 'text', 'Your Street', ''),
            pincode : getFormElementObject('input', 'text', 'Your ZipCode', ''),
            country : getFormElementObject('input', 'text', 'Your Country', ''),
            email : getFormElementObject('input', 'email', 'Your Email', ''),
        
            deliveryMethod : {
                                elementType : 'select',
                                elementConfig : {
                                    options : [
                                        { value : 'fastest', displayValue : 'Fastest' },
                                        { value : 'cheapest', displayValue : 'Cheapest' }
                                    ]
                                },
                                value : ''
                            }
        },
        loading : false
    }

    orderHandler = (event) => {
        // i didn't see its usage. 
        event.preventDefault();

        console.log(this.props); 
        console.log(this.props.ingredients);
        
        this.setState( { loading:true } );

        const customerData = {};
        Object.keys(this.state.orderForm).forEach( key => {
            customerData[key] = this.state.orderForm[key].value;
        });

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData : customerData
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
    
    inputChangeHandler = (event, fieldname) => {

        const newOrderForm = { ...this.state.orderForm };
        const newFieldValue = { ...this.state.orderForm[fieldname] };
        
        newFieldValue.value = event.target.value;

        newOrderForm[fieldname] = newFieldValue;

        this.setState( { orderForm : newOrderForm } );
    }   

    render(){

        let elements = Object.keys(this.state.orderForm).map( key => {
            return {
                id : key,
                config : this.state.orderForm[key]
            };
        });

        let formElements = elements.map( element => {
            return (
                <Input key = { element.id } 
                       { ...element.config }
                       changed = { (event) => this.inputChangeHandler(event, element.id) } />
            );
        });

        let form  = (
            <form onSubmit = { this.orderHandler }>
                <h4>Enter your contact data please.</h4>

                {formElements}
                
                <Button btnType = "Success"> Order </Button>
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