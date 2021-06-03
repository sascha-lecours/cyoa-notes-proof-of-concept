
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

export async function getCurrentStitch() {
    try{
        const response = await fetch('/api/currentStitch');
        return await response.json();
    } catch(error) {
        return [];
    }
}