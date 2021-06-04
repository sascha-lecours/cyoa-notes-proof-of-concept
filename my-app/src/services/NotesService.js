
export async function getMarginNotes(location) {

    try{
        const response = await fetch('/api/notes/location', location);
        return await response.json();
    } catch(error) {
        return [];
    }
    
}

export async function getMargingNoteById(id) {
    try{
        const response = await fetch(`/api/notes/id/${id}`);
        return await response.json();
    } catch(error) {
        return [];
    }
    
}