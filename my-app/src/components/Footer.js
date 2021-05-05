import React from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export const Footer = () => {

    const footerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: myPalette[3],
        color: myPalette[1],
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h2>Sic erat legebatur</h2>
        </div>
    )
}