import React from 'react'

export const MarginNotes = ({marginNotes}) => {

    console.log('marginNotes length:::', marginNotes.length)
    if (marginNotes.length === 0) return null

    const MarginNoteRow = (key,user,text) => {

        return(
            <li key={key}>
                {text}
            </li>
          )
    }

    // TODO: Display issue to be resolved here
    const marginNotesList = marginNotes.map((key, user, text) => MarginNoteRow(key, user, text))

    return(
        <div className="container">
            <h2>Marginalia</h2>
            <ul>
                {marginNotesList}
            </ul>
        </div>
    )
}