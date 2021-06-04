import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginNotes } from './MarginNote.js';

// TODO: add note-leaving functionality here

export const MarginArea = ({ marginNotes, currentStitch, currentStory }) => {

        const marginAreaStyle = {
            width: '35%',
            minWidth: '150px',
            padding: '0.5%',
            color: myPalette[3]
        }

        return (
            <div className="Margin Area" style={marginAreaStyle}>
                <MarginNotes marginNotes={marginNotes} />
                <button className="btn btn-outline-primary">Leave a Note Here</button>
            </div>
        )
}