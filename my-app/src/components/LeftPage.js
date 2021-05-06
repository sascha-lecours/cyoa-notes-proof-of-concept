import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { MarginArea } from './MarginArea.js';
import { StoryTextArea } from './StoryTextArea.js';


// the LEFT page primarily holds descriptive text and margin notes

export class LeftPage extends Component {



    render() {

        const leftPageStyle = {
            width: '50%',
            // 'max-width': '1000px',
            padding: '15px',
            margin: '2%',
            backgroundColor: myPalette[2],
            display: 'flex',
            'flex-flow' : 'row'
        }

        // Left area for margin notes, right area holds text and/or illustrations

        return (
            <div style={leftPageStyle}>
                <MarginArea />
                <StoryTextArea />
            </div>
        )
    }

}