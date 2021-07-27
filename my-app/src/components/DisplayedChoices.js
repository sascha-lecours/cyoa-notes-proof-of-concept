import React, { Fragment } from 'react';
import { myPalette } from './appearance/paletteConstants.js';

export const DisplayedChoices = ({choices, choicesList, makeChoice }) => {


    // console.log('choicesList length: ', choicesList.length);
    if (!choicesList.length > 0) return null;

    const ChoiceRow = (choice, destination, index) => {
        return(
            <li key={index}>
                <button onClick={(e) => makeChoice(destination)}>{choice}</button>
            </li>
          )
    }

    const displayedChoices = (myChoices, myChoicesList) => {
        const keySet = Object.keys(myChoices);
        let choiceRows = [];
        let i = 0;
        myChoicesList.forEach((value, destination) => {
            const currentrow = ChoiceRow(choices[value], destination, i);
            i+=1;
            choiceRows.push(currentrow);
        });
        return choiceRows;
    }

    const displayedChoicesStyle = {
        width: '100%',
        minWidth: '150px',
        padding: '0.5%',
        color: myPalette[3]
    }
    
        return(
            <div className="listOfChoices" style={displayedChoicesStyle}>
                <h4>Choose: </h4>
                <ul>
                    {displayedChoices(choices, choicesList)}
                </ul>
            </div>
        )
}
