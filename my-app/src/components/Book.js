import React from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';


export const Book = ({marginNotes, storyText, choices, choicesList, makeChoice, currentStitch, currentStory, setFrontEndObject, isEnding, setNeedRefresh }) => {

    const bookStyle = {
        width: '100%',
        minHeight: '600px',
        maxWidth: '150rem',
        padding: '2%',
        margin: '0 auto',
        backgroundColor: myPalette[0],
        display: 'flex',
        flexFlow: 'row'

    }
    


    return (
            <div style={bookStyle} className = "Book">
                <LeftPage marginNotes={marginNotes} storyText={storyText} currentStitch={currentStitch} currentStory={currentStory} setNeedRefresh={setNeedRefresh} />
                <RightPage choices={choices} choicesList={choicesList} makeChoice={makeChoice} setFrontEndObject={setFrontEndObject} isEnding={isEnding} />
            </div>

    )

};