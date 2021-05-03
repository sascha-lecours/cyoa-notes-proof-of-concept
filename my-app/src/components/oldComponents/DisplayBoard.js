import React from 'react';
import { myPalette } from '../appearance/paletteConstants.js';

export const DisplayBoard = ({numberOfUsers, getAllUsers}) => {

    const boardStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: myPalette[0],
        color: myPalette[1],
        textAlign: 'center'
    }
    
    return(
        <div style={boardStyle} className="display-board">
            <h4 style={{color: myPalette[1]}}>Users Created</h4>
            <div className="number">
            {numberOfUsers}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllUsers()} className="btn btn-warning">Get all Users</button>
            </div>
        </div>
    )
}