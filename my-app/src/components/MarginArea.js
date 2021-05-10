import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginNotes } from './Note.js';

export const MarginArea = ({marginNotes}) => {

        const marginAreaStyle = {
            width: '35%',
            padding: '0.5%',
            color: myPalette[3]
        }
        
        console.log(marginNotes);

        return (
            <div className="Margin Area" style={marginAreaStyle}>
                <MarginNotes marginNotes={marginNotes} />
            </div>
        )
}