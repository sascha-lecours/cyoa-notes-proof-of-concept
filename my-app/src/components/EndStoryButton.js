import React, { useContext } from 'react';

import ErrorModal from './appearance/ErrorModal';
import LoadingSpinner from './appearance/LoadingSpinner';

import { StorySessionContext } from '../util/storySession-context.js';
import { useHttpClient } from '../util/hooks/httpHook';

import { myPalette } from './appearance/paletteConstants.js';



export const EndStoryButton = ({ setShowEndOfStoryRedirect }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const deleteCurrentStorySession = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:3080/api/story/session/delete/${ssid}`,
            'DELETE',
          );
          setShowEndOfStoryRedirect(true);
        } catch (err) {}
        
    };

    const ssContext = useContext(StorySessionContext);
    const ssid = ssContext.storySessionId;
            
    const endButtonStyle = {
        width: '100%',
        minWidth: '150px',
        padding: '0.5%',
        color: myPalette[3]
    }
    
        return(
            <div style={endButtonStyle} >
                <ErrorModal error={error} onClear={clearError} />
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Your Story Has Now Ended</h2>
                <button onClick={(e) => deleteCurrentStorySession()}>So be it.</button>
            </div>
                
                
        )
}


