import React, { Fragment } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { DisplayedChoices } from './DisplayedChoices.js';

export const ChoiceArea = ({choices, choicesList, makeChoice, setFrontEndObject }) => {

    const ChoiceAreaStyle = {
        width: '70%',
        padding: '0.5%',
        color: myPalette[4]
    }

    return (
        <div className="ChoiceArea" style={ChoiceAreaStyle}>
            <DisplayedChoices choices={choices} choicesList={choicesList} makeChoice={makeChoice} setFrontEndObject={setFrontEndObject} />
        </div>
    )
}
