import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../Axios/instance1';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    pincode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your ZipCode',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },

    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },

    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      valid: true,
      validation: {},
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const customerData = {};
    Object.keys(orderForm).forEach((key) => {
      customerData[key] = orderForm[key].value;
    });

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: customerData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangeHandler = (event, fieldname) => {
    const newFieldValue = updateObject(orderForm[fieldname], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, orderForm[fieldname].validation),
    });

    const newOrderForm = updateObject(orderForm, {
      [fieldname]: newFieldValue,
    });

    let formIsValid = true;
    for (let field in orderForm) {
      formIsValid = formIsValid && newOrderForm[field].valid;
    }
    setOrderForm(newOrderForm);
    setFormIsValid(formIsValid);
  };

  let elements = Object.keys(orderForm).map((key) => {
    return {
      id: key,
      config: orderForm[key],
    };
  });

  let formElements = elements.map((element) => {
    return (
      <Input
        key={element.id}
        {...element.config}
        changed={(event) => inputChangeHandler(event, element.id)}
      />
    );
  });

  let form = (
    <form onSubmit={orderHandler}>
      <h4>Enter your contact data please.</h4>

      {formElements}

      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );

  if (props.loading) form = <Spinner />;

  return <div className={classes.ContactData}>{form}</div>;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (newOrder, token) => dispatch(orderActions.puchaseBurger(newOrder, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
