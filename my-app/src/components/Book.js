import React, { Component } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';


export class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            marginNotes: {}, 
            storyText: ''
        };

        this.fetchMarginNotes = async () => {
            this.props.getMarginNotes()
              .then(json => {
                //console.log(json);
                return(json);
              });
          };

        this.fetchStoryText = () => {
            this.props.getStoryText()
              .then(json => {
                // console.log(json);
                return(json);
              });
          };
    }

    componentDidMount() {
        this.fetchMarginNotes()
        .then((result) => {
                console.log(result);
                this.setState({
                isLoaded: true,
                marginNotes: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
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