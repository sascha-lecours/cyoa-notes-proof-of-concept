

// TODO: In progress. This will return:
// Frontend info object template:

/*
{
  paragraphList = [Array of strings]
  choices = [Array of choice text];
  choicesList = [Array of ???];
  currentStitch = "String which is a stitch name";
  currentNotes = [Array of note objects];
}
*/

// TODO functions (to migrate to services later):

// Function (advanceStory?) that makes a new inkle object where ...
//...the storyname, choice made (optional), "starting" stitch and flags can be set arbitrarily and returns the frontend object.
//... It should also create or update a story session in the database. 

// Make another function that simply takes in a choice, a user, and a story and then calls advanceStory (above) as...
// ... appropriate.

/*
export async function getFrontendStoryObject( {} ) {
    try{
        console.log(` Note Service: Calling API and sending: ${JSON.stringify(location)}`);
        const response = await fetch(`/api/notes/location`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(location)
          })
        return await response.json();
    } catch(error) {
        console.log(error);
        return [];
    }
}
*/

export async function getStoryText() {

    try{
        const response = await fetch('/api/storyText');
        return await response.json();
    } catch(error) {
        return [];
    }
}

export async function resetStory() {
    
    try{
        const response = await fetch('/api/reset');
        return await response.json();
    } catch(error) {
        return [];
    }

}

export async function getCurrentStoryName() {
    try{
        const response = await fetch('/api/currentStoryName');
        return await response.json();
    } catch(error) {
        return [];
    }
}

export async function getCurrentStitch() {
    try{
        const response = await fetch('/api/currentStitch');
        return await response.json();
    } catch(error) {
        return [];
    }
}