import React, { Component } from 'react';
import classes from './Auth.module.css'; 
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';



class Auth extends Component{

    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your Email'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false ,
                touched : false  
            }, 
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Your Password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false ,
                touched : false  
            }
        }
    }

    checkValidity  = ( value, rules ) => {
        let isValid = true;

        if( rules.required && isValid ){
            isValid = value.trim() !== '';
        }

        if( rules.minLength && isValid ){
            isValid = value.length >= rules.minLength;
        }
        
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if( rules.isEmail && isValid ){
            isValid = pattern.test(value)
        }

        return isValid;
    }

    inputChangeHandler = (event, fieldname) => {

        const newControls = { ...this.state.controls };
        const newFieldValue = { ...this.state.controls[fieldname] };
        
        newFieldValue.value = event.target.value;
        newFieldValue.touched = true;
        newFieldValue.valid = this.checkValidity( newFieldValue.value, newFieldValue.validation );
        
        newControls[fieldname] = newFieldValue;
    
        this.setState( { controls : newControls } );
    } 

    render() {
        
        const elements = Object.keys( this.state.controls ).map(
            key => {
                return {
                    id : key,
                    config : this.state.controls[key]
                }
            }
        );

        const formElements = elements.map( element => {
            return (
                <Input key = { element.id } 
                       { ...element.config }   
                       changed = { (event) => this.inputChangeHandler(event, element.id) } />
            );
        });

        const form  = (
            <form onSubmit = { this.authHandler }>
                <h4>Login</h4>

                {formElements}
                {/* disabled = { !this.state.formIsValid } */}
                <Button btnType = "Success"> Login </Button>
            </form>
        );

        return (
            <div className = { classes.Auth }>
                {form}
            </div>
        );
    }
}

export default Auth;