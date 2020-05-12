import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../Axios/instance1';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{

    state = {
        orderForm : {
            name : {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Your Name'
                        },
                        value : '',
                        validation : {
                            required : true
                        },
                        valid : false,
                        touched : false
                    },
                    
            street : {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Your Street'
                        },
                        value : '',
                        validation : {
                            required : true
                        },
                        valid : false,
                        touched : false
                    },

            pincode : {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Your ZipCode'
                        },
                        value : '',
                        validation : {
                            required : true,
                            minLength : 3,
                            maxLength : 5
                        },
                        valid : false,
                        touched : false
                    },
                
            country : {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Your Country'
                        },
                        value : '',
                        validation : {
                            required : true
                        },
                        valid : false,
                        touched : false
                    },

            email : {
                        elementType : 'input',
                        elementConfig : {
                            type : 'email',
                            placeholder : 'Your Email'
                        },
                        value : '',
                        validation : {
                            required : true
                        },
                        valid : false ,
                        touched : false  
                    },    

            deliveryMethod : {
                                elementType : 'select',
                                elementConfig : {
                                    options : [
                                        { value : 'fastest', displayValue : 'Fastest' },
                                        { value : 'cheapest', displayValue : 'Cheapest' }
                                    ]
                                },
                                value : '',
                                valid : true,
                                validation : {}
                            }
        },
        formIsValid : false,
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

    checkValidity  = ( value, rules ) => {
        let isValid = true;

        if( rules.required && isValid ){
            isValid = value.trim() !== '';
        }

        if( rules.minLength && isValid ){
            isValid = value.length >= rules.minLength;
        }

        if( rules.maxLength && isValid ){
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, fieldname) => {

        const newOrderForm = { ...this.state.orderForm };
        const newFieldValue = { ...this.state.orderForm[fieldname] };
        
        newFieldValue.value = event.target.value;

        newOrderForm[fieldname] = newFieldValue;
        newFieldValue.touched = true;
        newFieldValue.valid = this.checkValidity( newFieldValue.value, newFieldValue.validation );

        let formIsValid = true;
        for( let field in this.state.orderForm ){
            formIsValid = formIsValid && newOrderForm[field].valid;
        }
        this.setState( { orderForm : newOrderForm, formIsValid : formIsValid } );
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
                
                <Button btnType = "Success"
                        disabled = { !this.state.formIsValid } > Order </Button>
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