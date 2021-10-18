import React, { useState, useEffect, useContext } from 'react';

import Input from './Input';
import ErrorModal from './appearance/ErrorModal';
import LoadingSpinner from './appearance/LoadingSpinner';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../util/validators';
import { useForm } from '../util/hooks/formHooks';
import { useHttpClient } from '../util/hooks/httpHook';
import { AuthContext } from '../util/auth-context';

const NoteAddingArea = ({ currentStitch, currentStory, toggleShowNoteAdder, setNeedRefresh }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        {
            content: {
            value: '',
            isValid: false
            }
        },
        false
    );

    const noteSubmitHandler = async event => {
        event.preventDefault();
        console.log('Submitting note with Authorization: Bearer ' + auth.token);
        try {
            await sendRequest(
                'http://localhost:3080/api/notes', 
                'POST', 
                JSON.stringify({
                    creator: auth.userId,
                    location: {
                        story: currentStory,
                        stitch: currentStitch
                    },
                    content: formState.inputs.content.value
                }),
                { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            toggleShowNoteAdder();
            setNeedRefresh(true);
        } catch (err) {
            
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="note-form" onSubmit={noteSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
                id="content"
                element="input"
                type="text"
                label="Your note: "
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter valid note content."
                onInput={inputHandler}
            />
            <button type="submit" disabled={!formState.isValid}>
                ADD NOTE
            </button>
            </form>
        </React.Fragment>
    );
};

export default NoteAddingArea;
