import React, { Fragment } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { ChoiceList } from './Choice.js';

export const ChoiceArea = ({choices}) => {

        const ChoiceAreaStyle = {
            width: '70%',
            padding: '0.5%',
            color: myPalette[4]
        }

        const formattedChoiceList = choices; // TODO: apply formatting here

        return (
            <div className="ChoiceArea" style={ChoiceAreaStyle}>
                <ChoiceList choices={choices} />
            </div>
        )
}
