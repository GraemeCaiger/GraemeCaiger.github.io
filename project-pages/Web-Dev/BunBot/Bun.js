function loadDog() {
    fetch("https://rabbit-api-two.vercel.app/api/random") // This is Asycronus Javascript.
        .then(response => response.json())           // Its Place in the order of exection is not defined by its location top to bottom.
        .then(data => {
            // data object contains multiple parts (message and status). So we seperate message.
            document.getElementById("DogContainer").innerHTML = `<img src="${data.url}" />` // $ is a template literal. It allows us to use variables inside of strings.
            document.getElementById("Breed").innerHTML = `Breed: ${data.breed}` // $ is a template literal. It allows us to use variables inside of strings.
            console.log(data);
        });
} //{"_id":"6957e961b1a419ce4819b14b","breed":"unknown","url":"www.fileurl...","urlId":"4137ab54"}

// Ensures DogLogic Runs again if button pressed
const pressButton = document.getElementById("Press4Dog");
if (pressButton) {
    pressButton.addEventListener("click", loadDog);
}

loadDog(); // This will ensure a dog image is allways loaded when the page is loaded.
 