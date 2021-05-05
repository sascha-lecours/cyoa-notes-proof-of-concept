import React, { Component } from 'react';
import { Page } from './Page';

import { myPalette } from './appearance/paletteConstants.js';


export class Book extends Component {



    render() {

        const bookStyle = {
            width: '95%',
            'min-height': '550px',
            padding: '2%',
            margin: 'auto',
            backgroundColor: myPalette[0],
            display: 'flex',
            'flex-flow': 'row'

        }

        return (
            <div style={bookStyle}>
                <Page></Page>
                <Page></Page>
            </div>
        )
    }

}