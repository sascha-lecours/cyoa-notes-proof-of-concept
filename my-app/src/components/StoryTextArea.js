import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export class StoryTextArea extends Component {



    render() {

        const storyTextAreaStyle = {
            width: '70%',
            padding: '0.5%',
            color: myPalette[4]
        }

        return (
            <div className="StoryTextArea" style={storyTextAreaStyle}>
                <p>
                    This is a block of story text. 
                    
                    It could go on for quite a while.

                    Who knows where it might stop? 

                
                </p>
            </div>
        )
    }

}