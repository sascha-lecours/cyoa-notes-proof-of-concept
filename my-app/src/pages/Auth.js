import React, { useState, useContext } from 'react';

import Card from '../components/Card';
import Input from '../components/Input';
import { useForm } from '../util/hooks/formHooks';
import { AuthContext } from '../util/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';

import './styling/Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
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

    const authSubmitHandler = async event => {
        event.preventDefault();
        
        if(isLoginMode){
            //fetch('http://localhost:3080/api/user/login');
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
                console.log(responseData); // TODO: proper handling

            } catch (err) {
                console.log(err) // TODO: Proper handling
            }
            
        }

        auth.login();
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