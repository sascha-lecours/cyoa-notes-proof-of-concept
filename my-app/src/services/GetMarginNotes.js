
export async function getMarginNotes() {

    try{
        const response = await fetch('/api/marginNotes');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}