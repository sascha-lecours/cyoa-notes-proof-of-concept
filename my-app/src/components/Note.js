import React from 'react';

import { getMarginNotes } from '../services/MarginNotesService';

export const MarginNotes = ({marginNotes}) => {


    console.log('marginNotes length: ', marginNotes.length);
    if (!marginNotes.length > 0) return null;


    const MarginNoteRow = ({id,user,text}) => {

        return(
            <li key={id}>
                {text}
            </li>
          )
    }

    const marginNotesList = (notes) => {
        notes.map((id, user, text) => MarginNoteRow(id, user, text));
    } 
    
        return(
            <div className="container">
                <h2>Marginalia</h2>
                <ul>
                    {marginNotesList(marginNotes)}
                </ul>
            </div>
        )
}