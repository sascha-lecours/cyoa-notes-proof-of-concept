import React from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export const Header = () => {

    const headerStyle = {

        width: '100%',
        padding: '2%',
        'max-height' : '110px',
        backgroundColor: myPalette[1],
        color: myPalette[3],
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h1>React CYOA</h1>
        </div>
    )
}