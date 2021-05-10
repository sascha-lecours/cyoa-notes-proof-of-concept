import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginArea } from './MarginArea.js';
import { StoryTextArea } from './StoryTextArea.js';


// the LEFT page primarily holds descriptive text and margin notes

export const LeftPage = ({getStoryText, getMarginNotes}) => {


    const leftPageStyle = {
        width: '50%',
        // 'max-width': '1000px',
        padding: '15px',
        margin: '1%',
        'margin-right': '0.25%',
        backgroundColor: myPalette[2],
        display: 'flex',
        'flex-flow' : 'row'
    }

    const marginNotes = getMarginNotes();
    const storyText = getStoryText();

    console.log(marginNotes);

    // Left area for margin notes, right area holds text and/or illustrations


    return (
            <div style={leftPageStyle} className="LeftPage">
                <MarginArea marginNotes = {marginNotes}/>
                <StoryTextArea />
            </div>
    )

}