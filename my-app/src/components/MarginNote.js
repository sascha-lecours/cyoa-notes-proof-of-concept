import React from 'react';

export const MarginNotes = ({ marginNotes }) => {

    if (!marginNotes.length > 0) return null;


    const MarginNoteRow = (note) => {
        const { content, id, score, image, creator } = note; 
        return(
            <li key={id}>
                {content}
            </li>
          )
    }

    const marginNotesList = marginNotes.map((note) => MarginNoteRow(note))

    
        return(
            <div className="container">
                <h5>Marginalia:</h5>
                <ul>
                    {marginNotesList}
                </ul>
            </div>
        )
}