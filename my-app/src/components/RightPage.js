import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { ChoiceArea } from './ChoiceArea.js';


// The RIGHT page primarily holds interactable option boxes rather than descriptive text

export const RightPage = ({choices, choicesList, makeChoice}) => {


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
           <ChoiceArea choices={choices} choicesList={choicesList} makeChoice={makeChoice} />
        </div>
    );
}


