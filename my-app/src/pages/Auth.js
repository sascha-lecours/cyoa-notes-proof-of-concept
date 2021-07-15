import React, { useState, useContext } from 'react';

import Card from '../components/Card';
import Input from '../components/Input';
import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';
import { useForm } from '../util/hooks/formHooks';
import { AuthContext } from '../util/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';

import './styling/Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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

    const authSubmitHandler = async event => {
        event.preventDefault();
        
        setIsLoading(true);
        if(isLoginMode) {
            
            try {
                const response = await fetch('http://localhost:3080/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });

                const responseData = await response.json();
                if(!response.ok) {
                    console.log(responseData.message);
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again');
            }
        } else {
            try {
                
                const response = await fetch('http://localhost:3080/api/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });

                const responseData = await response.json();
                if(!response.ok) {
                    console.log(responseData.message);
                    throw new Error(responseData.message);
                }
                console.log(`Sign up: ${responseData}`);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Something went wrong, please try again');
            }
            
        }    
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
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
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Passwords must be at least 6 characters"
                        onInput={inputHandler}
                    />
                    <button className="btn btn-primary" disabled={!formState.isValid}>
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button className="btn btn-info" onClick={switchModeHandler}>
                    Switch to {isLoginMode ? 'Sign Up' : 'Login'}
                </button>
            </Card>
        </React.Fragment>
    );
}

export default Auth;