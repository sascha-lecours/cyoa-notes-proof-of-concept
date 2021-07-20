

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



// Needs: req.body.userName, req.body.storyName, req.body.destinationStitch

export async function moveStoryAndGetFrontend(userId, storyId, destinationStitch) {
    try{
        console.log(`Moving story forward. User: ${JSON.stringify(userId)} Story: ${JSON.stringify(storyId)} Stitch: ${JSON.stringify(destinationStitch)}`);
        const response = await fetch(`/api/story/move`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                "userId" : userId, 
                "storyID" : storyId, 
                "destinationStitch" : destinationStitch
            }
          })
        return await response.json();
    } catch(error) {
        console.log(error);
        return [];
    }
}

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