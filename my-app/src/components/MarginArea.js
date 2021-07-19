import React, { Component, useState, useEffect } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginNotes } from './MarginNote.js';
import NoteAddingArea from './NoteAddingArea.js';

export const MarginArea = ({ marginNotes, currentStitch, currentStory }) => {

    const [showNoteAdder, setshowNoteAdder] = useState(false);

    const toggleShowNoteAdder = () => {
        setshowNoteAdder(!showNoteAdder);
    }

        const marginAreaStyle = {
            width: '35%',
            minWidth: '150px',
            padding: '0.5%',
            color: myPalette[3]
        }

        return (
            <div className="Margin Area" style={marginAreaStyle}>
                <MarginNotes marginNotes={marginNotes} />
                <button className="btn btn-outline-primary" onClick={toggleShowNoteAdder}>Leave a Note Here</button>
                {showNoteAdder && <NoteAddingArea currentStitch={currentStitch} currentStory={currentStory} />}
            </div>
        )
}