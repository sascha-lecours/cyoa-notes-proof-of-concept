import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export class Page extends Component {



    render() {

        const pageStyle = {
            // Todo: improve w/flexbox
            width: '500%',
            padding: '2%',
            margin: '2%',
            backgroundColor: myPalette[2]
        }

        return (
            <div style={pageStyle}>
                <p>This is the content of a page</p>
            </div>
        )
    }

}