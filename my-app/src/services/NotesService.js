export async function getMarginNotes(location) {
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


export async function getMarginNoteById(id) {
    try{
        const response = await fetch(`/api/notes/id/${id}`);
        return await response.json();
    } catch(error) {
        return [];
    }
    
}