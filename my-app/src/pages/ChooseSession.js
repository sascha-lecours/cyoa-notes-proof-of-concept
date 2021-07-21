import React, { useEffect, useState } from 'react';

import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';
import { useHttpClient } from '../util/hooks/httpHook';
import StoryList from '../components/StoryList';

import { AuthContext } from '../util/auth-context';


// TODO: This is a work in progress and isn't yet hooked up

const ChooseSession = () => {

    const [loadedSessions, setLoadedSessions] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    const userId = auth.userId; // TODO: use this in the fetch below

    useEffect(()=>{
        const fetchStorySessions = async () => {
            try {
                const responseData = await sendRequest(
                   // TODO: needs new URL and should include user ID 'http://localhost:3080/api/story' // Defaults to GET, No body or headers since it's a GET
                    // Should probably populate with story names/images for the returned stuff
                   );
                setLoadedSessions(responseData.sessions);
            } catch (err) {
                // Error handled in sendRequest
            }
            
        };
        fetchStorySessions();
    }, [sendRequest]);

    const errorHandler = () => {
        clearError();
    }

    // TODO: Right now this expects STORY objects and not sessions. need to populate the stories in the fetch above.
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className="center"> <LoadingSpinner /></div>}
            {!isLoading && loadedSessions && <StoryList items={loadedSessions} />}
        </React.Fragment>
    )
};

export default ChooseSession;
