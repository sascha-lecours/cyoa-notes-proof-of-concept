import React, { Component } from 'react';
import { LeftPage } from './LeftPage';
import { RightPage } from './RightPage';

import { myPalette } from './appearance/paletteConstants.js';


export class Book extends Component {



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
            <div style={bookStyle}>
                <LeftPage />
                <RightPage />
            </div>
        )
    }

}