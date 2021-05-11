import React from 'react';

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

    const marginNotesList = marginNotes.map((id, user, text) => MarginNoteRow(id, user, text))

    
        return(
            <div className="container">
                <h3>Marginalia:</h3>
                <ul>
                    {marginNotesList}
                </ul>
            </div>
        )
}