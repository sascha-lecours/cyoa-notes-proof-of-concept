import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { ChoiceArea } from './ChoiceArea.js';
import { EndStoryButton } from './EndStoryButton.js';

import { myPalette } from './appearance/paletteConstants.js';


// The RIGHT page primarily holds interactable option boxes rather than descriptive text

export const RightPage = ({ choices, choicesList, makeChoice, setFrontEndObject, isEnding }) => {

    const [showEndOfStoryRedirect, setShowEndOfStoryRedirect] = useState(false);

    const rightPageStyle = {
        width: '35%',
        // 'maxWidth': '1000px',
        padding: '2%',
        margin: '1%',
        'marginLeft': '0.25%',
        backgroundColor: myPalette[2]
    }


    // List of choices (TODO: possibly also illustrations?)

    return (
        <div className="RightPage" style={rightPageStyle}>
            {isEnding && <EndStoryButton setShowEndOfStoryRedirect={setShowEndOfStoryRedirect} />}
            {showEndOfStoryRedirect && <Redirect to="/stories" /> }
           <ChoiceArea choices={choices} choicesList={choicesList} makeChoice={makeChoice} setFrontEndObject={setFrontEndObject} />
        </div>
    );
}


