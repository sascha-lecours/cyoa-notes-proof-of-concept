import React, { Component } from 'react';
import { myPalette } from './appearance/paletteConstants.js';

export class MarginArea extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            marginNotes: ['placeholder']
        }
    }

    componentDidMount = () => {
        this.props.marginNotes.then(json => this.setState({ marginNotes: json.marginNotes}));
    }
    
    render(){
        const { marginNotes } = this.state;
        const marginAreaStyle = {
            width: '35%',
            padding: '0.5%',
            color: myPalette[3]
        }
        return (
            <div className="Margin Area" style={marginAreaStyle}>
                {marginNotes}
            </div>
        )
    }

}