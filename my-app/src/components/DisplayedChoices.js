import React, { Fragment } from 'react';

export const DisplayedChoices = ({choices, choicesList}) => {


    console.log('choicesList length: ', choicesList.length);
    if (!choicesList.length > 0) return null;

    const ChoiceRow = (choice, destination, index) => {
        return(
            <li key={index}>
                {choice}
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
    
        return(
            <div className="container">
                <h4>Choose: </h4>
                <ul>
                    {displayedChoices(choices, choicesList)}
                </ul>
            </div>
        )
}
