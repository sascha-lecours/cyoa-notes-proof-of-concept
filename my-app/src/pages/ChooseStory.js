import React, { useEffect, useState, useContext } from 'react';

import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';
import { useHttpClient } from '../util/hooks/httpHook';
import StoryList from '../components/StoryList';

import { AuthContext } from '../util/auth-context';


// Display possible stories. On each one, selecting it will start a new session (prompting to resume or overwrite if existing session for that story)
// Starting a new session in this way will update the authcontext's storySessionId and redirect to the Game page.
const ChooseStory = () => {

    const [loadedStories, setLoadedStories] = useState();
    const [newStorySession, setNewStorySession] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    

    // This function will be passed down to the individual clickable story components
    const selectStory = async (sid, uid) => {
        try {
            const responseData = await sendRequest(
                'http://localhost:3080/api/story/session/start',
                'POST',
                JSON.stringify({
                    creator: uid,
                    story: sid
                }),
                { 'Content-Type': 'application/json' }
            );
            setNewStorySession(responseData._id);
        } catch (err) {
            // Error handled in sendRequest
        }
    }

    useEffect(()=>{
        const fetchStories = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:3080/api/story' // Defaults to GET, No body or headers since it's a GET
                );
                setLoadedStories(responseData.stories);
            } catch (err) {
                // Error handled in sendRequest
            }
            
        };
        fetchStories();
    }, [sendRequest]);

    const errorHandler = () => {
        clearError();
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className="center"> <LoadingSpinner /></div>}
            {!isLoading && loadedStories && <StoryList items={loadedStories} />}
        </React.Fragment>
    )
};

export default ChooseStory;
