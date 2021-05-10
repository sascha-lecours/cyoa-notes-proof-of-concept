
export async function getStoryText() {

    try{
        const response = await fetch('/api/storyText');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}