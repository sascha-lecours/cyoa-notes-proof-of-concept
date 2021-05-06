import React from 'react';
import { myPalette } from './appearance/paletteConstants.js';


export const Footer = () => {

    const footerStyle = {

        width: '100%',
        padding: '3%',
        backgroundColor: myPalette[3],
        color: myPalette[1],
        textAlign: 'center'
    }

    return(
        <div style={footerStyle}>
            <h4><em>Sic erat legebatur</em></h4>
        </div>
    )
}