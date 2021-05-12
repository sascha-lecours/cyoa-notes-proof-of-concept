
export async function getChoices() {

    try{
        const response = await fetch('/api/choices');
        return await response.json();
    } catch(error) {
        return [];
    }
    
}

export async function getChoicesList() {

    try{
        const response = await fetch('/api/choiceslist');
        return await response.json();
    } catch(error) {
        return [];
    }
    
}

export async function makeChoice(destination) {
    const response = await fetch(`/api/makechoice`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({destination})
      })
    return await response.json();
}
