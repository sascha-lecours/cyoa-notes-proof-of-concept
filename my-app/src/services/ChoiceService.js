
export async function getChoices() {

    try{
        const response = await fetch('/api/choices');
        return await response.json();
    } catch(error) {
        return [];
    }
    
}