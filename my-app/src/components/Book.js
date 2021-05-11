import React, { useEffect, useState } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';


//export const Book = (getMarginNotes, getStoryText) => {
export const Book = ({marginNotes}, {storyText}) => {



/*
    const fetchMarginNotes = async () => {
            getMarginNotes()
              .then(json => {
                console.log(json);
                return(json);
              });
          };

    const fetchStoryText = () => {
            getStoryText()
              .then(json => {
                // console.log(json);
                return(json);
              });
    }

    */

    const bookStyle = {
        width: '100%',
        minHeight: '600px',
        padding: '2%',
        margin: 'auto',
        backgroundColor: myPalette[0],
        display: 'flex',
        flexFlow: 'row'

    }
    


    return (
            <div style={bookStyle} className = "Book">
                <LeftPage marginNotes={marginNotes} storyText={storyText}/>
                <RightPage />
            </div>

    )

};