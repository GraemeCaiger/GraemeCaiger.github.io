function loadDog() {
    fetch("https://dog.ceo/api/breeds/image/random") // This is Asycronus Javascript.
        .then(response => response.json())           // Its Place in the order of exection is not defined by its location top to bottom.
        .then(data => {
            // data object contains multiple parts (message and status). So we seperate message.
            document.getElementById("DogContainer").innerHTML = `<img src="${data.message}" />` // $ is a template literal. It allows us to use variables inside of strings.
            console.log(data);
        });
}

// Ensures DogLogic Runs again if button pressed
const pressButton = document.getElementById("Press4Dog");
if (pressButton) {
    pressButton.addEventListener("click", loadDog);
}

loadDog(); // This will ensure a dog image is allways loaded when the page is loaded.
