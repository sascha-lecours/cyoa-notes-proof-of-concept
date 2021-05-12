import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginNotes } from './Note.js';

export const MarginArea = ({marginNotes}) => {

        const marginAreaStyle = {
            width: '35%',
            minWidth: '150px',
            padding: '0.5%',
            color: myPalette[3]
        }

        return (
            <div className="Margin Area" style={marginAreaStyle}>
                <MarginNotes marginNotes={marginNotes} />
            </div>
        )
}