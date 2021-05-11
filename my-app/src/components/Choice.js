import React, { Fragment } from 'react';

export const ChoiceList = ({choices}) => {


    console.log('Choices length: ', choices.length);
    if (!choices.length > 0) return null;


    const ChoiceRow = (choice, index) => {
        //const destination = currentElemment.destination;
        //const text = currentElemment.text;
        return(
            <li key={index}>
                {choice}
            </li>
          )
    }

    const choiceList = choices.map((choice, index) => ChoiceRow(choice, index));

    
        return(
            <div className="container">
                <h3>Choose: </h3>
                <Fragment>
                    {choiceList}
                </Fragment>
            </div>
        )
}

/*
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

*/