
export async function getDebugSettings() {
    try{
        const response = await fetch('/api/showDebugTools');
        return await response.json();
    } catch(error) {
        return [];
    }
}