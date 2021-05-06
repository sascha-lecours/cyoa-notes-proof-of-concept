import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';


// The RIGHT page primarily holds interactable option boxes rather than descriptive text

export class RightPage extends Component {



    render() {

        const rightPageStyle = {
            width: '50%',
            // 'max-width': '1000px',
            padding: '2%',
            margin: '2%',
            backgroundColor: myPalette[2]
        }

        return (
            <div style={rightPageStyle}>
                <p>This is the content of the right page</p>
            </div>
        )
    }

}