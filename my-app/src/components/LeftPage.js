import React, { useEffect, useState } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginArea } from './MarginArea.js';
import { StoryTextArea } from './StoryTextArea.js';

// the LEFT page primarily holds descriptive text and margin notes

export const LeftPage = (fetchStoryText, fetchMarginNotes) => {


    const leftPageStyle = {
        width: '50%',
        //maxWidth: '1000px',
        padding: '15px',
        margin: '1%',
        marginRight: '0.25%',
        backgroundColor: myPalette[2],
        display: 'flex',
        flexFlow : 'row'
    }

    const [marginNotes, setMarginNotes] = useState([
        {
          key: 1,
          user: 'placeholder1',
          text: 'Unloaded placeholder note 1'
        },
        {
          key: 2,
          user: 'placeholder2',
          text: 'Unloaded placeholder note 2'
        },
        {
          key: 3,
          user: 'placeholder3',
          text: 'Unloaded placeholder note 3'
        }
      ]);


    // Left area "MarginArea" for margin notes, right area "StoryTextArea" holds text and/or illustrations

    return (
            <div style={leftPageStyle} className="LeftPage">
                <MarginArea marginNotes = {marginNotes}/>
                <StoryTextArea />
            </div>
    )

}