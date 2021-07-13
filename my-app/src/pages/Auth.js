import React, { useState } from 'react';

import Card from '../components/Card';
import Input from '../components/Input';
import { useForm } from '../util/hooks/formHooks';
import './styling/Auth.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';


const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, 
        false
    );
    
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // TODO: connect this to backend and actually authenticate
    };

    return <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input 
                    element="input" 
                    id="name" 
                    type="text" 
                    label="Username" 
                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
                    errorText="Please enter a user name"
                    onInput={inputHandler}
                />
            )}
            <Input 
                element="input" 
                id="email" 
                type="email" 
                label="Email" 
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please provide a valid email"
                onInput={inputHandler}
            />
            <Input 
                element="input" 
                id="password" 
                type="password" 
                label="Password" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Passwords must be at least 5 characters"
                onInput={inputHandler}
            />
            <button className="btn btn-primary" disabled={!formState.isValid}>
                {isLoginMode ? 'Login' : 'Sign Up'}
            </button>
        </form>
        <button className="btn btn-info" onClick={switchModeHandler}>
            Switch to {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
    </Card>;
}

export default Auth;