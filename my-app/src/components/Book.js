import React, { Component } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';
//import { getMarginNotes } from '../services/GetMarginNotes';
//import { getStoryText } from '../services/GetStoryText';


export class Book extends Component {

    constructor(props) {
        super(props);
        /*
        this.state = {
            marginNotes: {}, 
            storyText: ''
        };
        */
        this.getMarginNotes = this.props.getMarginNotes;
        this.getStoryText = this.props.getStoryText;

        this.fetchMarginNotes = () => {
            this.getMarginNotes()
              .then(json => {
                //console.log(json);
                return(json);
              });
          };

        this.fetchStoryText = () => {
            this.getStoryText()
              .then(json => {
                //console.log(json);
                return(json);
              });
          };

    }



    render() {

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
                <LeftPage fetchMarginNotes={this.fetchMarginNotes} fetchStoryText={this.fetchStoryText}/>
                <RightPage />
            </div>
        )
    }

}