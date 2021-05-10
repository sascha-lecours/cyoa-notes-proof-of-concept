import React, { Component } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';
import { MarginNotes } from './Note';


export class Book extends Component {

    const [marginNotes] = useState({})

    render() {

        const bookStyle = {
            width: '100%',
            'min-height': '600px',
            padding: '2%',
            margin: 'auto',
            backgroundColor: myPalette[0],
            display: 'flex',
            'flex-flow': 'row'

        }

        return (
            <div style={bookStyle} className = "Book">
                <LeftPage getMarginNotes={this.props.getMarginNotes} getStoryText={this.props.getStoryText}/>
                <RightPage />
            </div>
        )
    }

}