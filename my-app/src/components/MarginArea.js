import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export class MarginArea extends Component {



    render() {

        const marginAreaStyle = {
            width: '35%',
            padding: '0.5%',
            color: myPalette[3]
        }

        return (
            <div style={marginAreaStyle}>
                <ul>
                    <li>This is where margin notes might appear</li>
                    <li>Lorem Ipsum Blabbity bloo?</li>
                    <li>lololololololllll</li>
                </ul>
            </div>
        )
    }

}