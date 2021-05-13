import parse from 'html-react-parser';

export const addInkleWriterFormatting = (text) => {
    let formattedText = text;

    // Add bolding
    formattedText = formattedText.map(str => str.replace(new RegExp('\\*-', 'g'), "<strong>"));
    formattedText = formattedText.map(str => str.replace(new RegExp('-\\*', 'g'), "</strong>"));

    // Add italics
    formattedText = formattedText.map(str => str.replace(new RegExp('\/=', 'g'), "<em>"));
    formattedText = formattedText.map(str => str.replace(new RegExp('=\/', 'g'), "</em>"));

    // Add paragraph tags
    formattedText = formattedText.map(str => "<p>" + str + "</p>");

    //console.log(formattedText);

    // Concatenate array
    formattedText = formattedText.join("");

    // Use HTML formatting
    formattedText = parse(formattedText);
    return formattedText;
}