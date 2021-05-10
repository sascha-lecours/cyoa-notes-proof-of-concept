
export async function getMarginNotes() {

    try{
        console.log("trying getMarginNotes...")
        const response = await fetch('/api/marginNotes');
        return await response.json();
    } catch(error) {
        return [];
    }
    
}