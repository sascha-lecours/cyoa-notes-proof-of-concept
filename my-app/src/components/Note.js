import React from 'react';

import { getMarginNotes } from '../services/MarginNotesService';

export const MarginNotes = ({marginNotes}) => {


    if (marginNotes.length === 0) return null;
    console.log('marginNotes length:::', marginNotes.length);

    const MarginNoteRow = ({key,user,text}) => {

        return(
            <li key={key}>
                {text}
            </li>
          )
    }

    const marginNotesList = marginNotes.map((key, user, text) => MarginNoteRow(key, user, text));

    return(
        <div className="container">
            <h2>Marginalia</h2>
            <ul>
                {marginNotesList}
            </ul>
        </div>
    )
}