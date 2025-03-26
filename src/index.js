// Your code here

document.addEventListener('DOMContentLoaded',() =>{
    const characterBar = document.getElementById("character-bar")
    const infoDetails = document.getElementById("detailed-info")
    const votesForm = document.getElementById('votes-form')
    const name = document.getElementById('name')
    const image = document.getElementById('image')
    const votes = document.getElementById('vote-count')
    const votesInput = document.getElementById('votes')
    const characterForm = document.getElementById('character-form')
    const characterNameInput = document.querySelector("#character-form #name")
    const characterImageInput = document.getElementById('image-url')
    let currentCharacter = null;

fetch ('http://localhost:3000/characters')
.then(res=>res.json())
.then (characters=>{
    
    characters.forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.textContent= character.name

        characterSpan.addEventListener('click', () => {
            displayInfo(character);
        });

        characterBar.appendChild(characterSpan);
        
    });
})
.catch(error=>{
    console.log("Not available", error)
})



function displayInfo(character){
    currentCharacter = character
    name.textContent = character.name
    image.src = character.image
    votes.textContent = character.votes


infoDetails.appendChild(votesForm);
}

votesForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (currentCharacter){
        const votesAdded = parseInt(votesInput.value, 10)
        if(!isNaN(votesAdded)){
            currentCharacter.votes += votesAdded;
        }
        fetch (`http://localhost:3000/characters/${currentCharacter.id}`,{
            method: 'PATCH',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
                votes:currentCharacter.votes
            }) 
        })
        .then(response=>response.json())
        .then(updatedCharacter => {
            
            const votesCount = document.getElementById("vote-count");
            votesCount.textContent = updatedCharacter.votes;
        })
        .catch(error => {
            console.error("Error updating votes:", error);
        });
        
    }
})

const votesCount = document.getElementById("vote-count")
votesCount.textContent = currentCharacter.votes;
votesForm.reset();  
})


