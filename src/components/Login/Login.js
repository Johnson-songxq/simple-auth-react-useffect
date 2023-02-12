import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const validateEmail = (value) => {
  if (!value) {
    return false;
  }

  return value.includes("@");
};

const validatePassword = (value) => {
  if (!value) {
    return false;
  }

  return value.trim().length > 6;
};

const actionType = {
  update_email: "update_email",
  update_password: "update_password",
  validate_email: "validate_email",
  validate_password: "validate_password",
};

const initialState = {
  email: "",
  isEmailValid: true,
  password: "",
  isPasswordValid: true,
};

// pure function
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.update_email:
      return {
        ...state,
        email: action.payload,
      };
    case actionType.update_password:
      return {
        ...state,
        password: action.payload,
      };
    case actionType.validate_email:
      return {
        ...state,
        isEmailValid: validateEmail(state.email),
      };
    case actionType.validate_password:
      return {
        ...state,
        isPasswordValid: validatePassword(state.password),
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState, undefined);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatch({ type: actionType.update_email, payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatch({ type: actionType.update_password, payload: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(validateEmail(enteredEmail));
    dispatch({ type: actionType.validate_email });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(validatePassword(enteredPassword));
    dispatch({ type: actionType.validate_password });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.email, state.password);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFormIsValid(
        validatePassword(state.password) && validateEmail(state.email)
      );
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [state.email, state.password]);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
