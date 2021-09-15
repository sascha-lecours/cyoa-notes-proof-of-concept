import React, { useEffect, useState, useContext } from 'react';

import { MarginNotes } from '../components/MarginNote';
import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';
import { useHttpClient } from '../util/hooks/httpHook';
import { AuthContext } from '../util/auth-context';

// Shows all notes for the currently-logged-in user

// TODO: Sort these by story, show the ratings, images, etc.
// TODO: Add "EDIT" and "DELETE" buttons as well

const UserNotes = () => {

    const [loadedNotes, setLoadedNotes] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    useEffect(()=>{
        const fetchNotes = async () => {
            console.log('Fetching all user notes with Authorization: Bearer ' + auth.token);
            try {
                
                const responseData = await sendRequest(
                    `http://localhost:3080/api/notes/userid/${auth.userId}`, 
                    'GET', 
                    null, // No body
                    { 
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setLoadedNotes(responseData.notes);
            } catch (err) {
                // Error handled in sendRequest
            }
            
        };
        fetchNotes();
    }, [sendRequest]);

    const errorHandler = () => {
        clearError();
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className="center"> <LoadingSpinner /></div>}
            {!isLoading && loadedNotes && <MarginNotes marginNotes={loadedNotes} />}
        </React.Fragment>
    )
};

export default UserNotes;
