import React, { useEffect, useState } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';


export const Book = ({marginNotes, storyText, choices, choicesList, makeChoice, currentStitch, currentStory}) => {

    const bookStyle = {
        width: '100%',
        minHeight: '600px',
        padding: '2%',
        margin: 'auto',
        backgroundColor: myPalette[0],
        display: 'flex',
        flexFlow: 'row'

    }
    


    return (
            <div style={bookStyle} className = "Book">
                <LeftPage marginNotes={marginNotes} storyText={storyText} currentStitch={currentStitch} currentStory={currentStory} />
                <RightPage choices={choices} choicesList={choicesList} makeChoice={makeChoice} />
            </div>

    )

};