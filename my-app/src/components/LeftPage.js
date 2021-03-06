import React, { useEffect, useState } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginArea } from './MarginArea.js';
import { StoryTextArea } from './StoryTextArea.js';

// the LEFT page primarily holds descriptive text and margin notes

export const LeftPage = ({ marginNotes, storyText, currentStitch, currentStory, setNeedRefresh }) => {


    const leftPageStyle = {
        width: '65%',
        //maxWidth: '1000px',
        padding: '15px',
        margin: '1%',
        marginRight: '0.25%',
        backgroundColor: myPalette[2],
        display: 'flex',
        flexFlow : 'row'
    }


    // Left area "MarginArea" for margin notes, right area "StoryTextArea" holds text and/or illustrations

    return (
            <div style={leftPageStyle} className="LeftPage">
                <MarginArea marginNotes = {marginNotes} currentStitch={currentStitch} currentStory={currentStory} setNeedRefresh={setNeedRefresh} />
                <StoryTextArea storyText = {storyText}/>
            </div>
    )

}