import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Aux from '../../hoc/Aux/Aux';

import classes from './Auth.module.css';

const Auth = (props) => {

  const {error, isAuthenticated, loading} = props;

  const [controls, setControls] = useState({
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
  });

  const [isSignup, setIsSignup] = useState(true);

  const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;

  // component did mount
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, authRedirectPath, buildingBurger]);

  const inputChangeHandler = (event, fieldname) => {
    const newFieldValue = updateObject(controls[fieldname], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, controls[fieldname].validation),
    });

    const newControls = updateObject(controls, {
      [fieldname]: newFieldValue,
    });

    setControls(newControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchModeHandler = () => {
    setIsSignup((prevSignupState) => !prevSignupState);
  };

  const elements = Object.keys(controls).map((key) => {
    return {
      id: key,
      config: controls[key],
    };
  });

  const formElements = elements.map((element) => {
    return (
      <Input
        key={element.id}
        {...element.config}
        changed={(event) => inputChangeHandler(event, element.id)}
      />
    );
  });

  const spinner = <Spinner />;

  let authRedirect = null;
  if (isAuthenticated) {
    // my short cut
    // if (props.buildingBurger) authRedirect = <Redirect to="/checkout" />;
    // else authRedirect = <Redirect to="/" />;

    // his long cut
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  const form = (
    <Aux>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        <h4>{isSignup ? 'SIGNUP' : 'SIGNIN'}</h4>

        {formElements}
        {/* disabled = { !formIsValid } */}
        <Button btnType="Success"> 
          {isSignup ? 'Signup' : 'Signin'}
        </Button>
      </form>

      <Button clicked={switchModeHandler} btnType="Danger">
        SWITCH AUTH MODE
      </Button>
    </Aux>
  );

  return <div className={classes.Auth}>{loading ? spinner : form}</div>;
};

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
    onAuth: (email, password, isSignup) =>
      dispatch(authActions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
