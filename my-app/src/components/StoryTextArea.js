import React, { Fragment } from 'react';
import { myPalette } from './appearance/paletteConstants.js';
import { addInkleWriterFormatting } from './InkleWriterFormatting.js';

export const StoryTextArea = ({storyText}) => {

        const storyTextAreaStyle = {
            width: '70%',
            padding: '0.5%',
            color: myPalette[4]
        }

        const formattedStoryText = addInkleWriterFormatting(storyText);

        return (
            <div className="StoryTextArea" style={storyTextAreaStyle}>
                <div>
                    <Fragment>
                        {formattedStoryText}
                    </Fragment>
                </div>
            </div>
        )
}
