import React from 'react';

import Card from '../components/Card';
import Input from '../components/Input';
import { useForm } from '../util/hooks/formHooks';
import './styling/Auth.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../util/validators';

const Auth = () => {
    const [formState, inputHandler] = useForm({
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // TODO: connect this to backend and actually authenticate
    }

    return <Card className="Authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
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
            <button className="btn btn-primary" disabled={!formState.isValid}>Login</button>
        </form>
    </Card>;
}

export default Auth;