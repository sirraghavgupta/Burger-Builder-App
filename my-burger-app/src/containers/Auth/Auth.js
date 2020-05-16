import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as authActions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (rules.isEmail && isValid) {
      isValid = pattern.test(value);
    }

    return isValid;
  };

  inputChangeHandler = (event, fieldname) => {
    const newFieldValue = updateObject(this.state.controls[fieldname], {
      value: event.target.value,
      touched: true,
      valid: this.checkValidity(event.target.value, this.state.controls[fieldname].validation),
    });

    const newControls = updateObject(this.state.controls, {
      [fieldname]: newFieldValue,
    });

    this.setState({ controls: newControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const elements = Object.keys(this.state.controls).map((key) => {
      return {
        id: key,
        config: this.state.controls[key],
      };
    });

    const formElements = elements.map((element) => {
      return (
        <Input
          key={element.id}
          {...element.config}
          changed={(event) => this.inputChangeHandler(event, element.id)}
        />
      );
    });

    let spinner = <Spinner />;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      // my short cut
      // if (this.props.buildingBurger) authRedirect = <Redirect to="/checkout" />;
      // else authRedirect = <Redirect to="/" />;

      // his long cut
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const form = (
      <Aux>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          <h4>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</h4>

          {formElements}
          {/* disabled = { !this.state.formIsValid } */}
          <Button btnType="Success"> {this.state.isSignup ? 'Signup' : 'Signin'} </Button>
        </form>

        <Button clicked={this.switchModeHandler} btnType="Danger">
          {' '}
          SWITCH AUTH MODE{' '}
        </Button>
      </Aux>
    );

    return <div className={classes.Auth}>{this.props.loading ? spinner : form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(authActions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
