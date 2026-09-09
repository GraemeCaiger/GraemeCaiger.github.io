document.getElementById("bored-bot").addEventListener("click", getIdea)

function getIdea() {
    fetch("https://apis.scrimba.com/bored/api/activity")
        .then(res => res.json())
        .then(data => {
            console.log(data) // Helps To debug. Observe Console when running in browser.
            document.body.classList.add("fun")
            document.getElementById("idea").textContent = data.activity
            document.getElementById("title").textContent = "🦾 HappyBot🦿"
            document.getElementById("details").innerHTML = 
                `<p> Number of participants: ${data.participants} <br>
                     Price: $${data.price} <br>
                     Accessibility: ${data.accessibility} <br>
                     Type: ${data.type} <br>
                     link: <a href="${data.link}">${data.link}</a> <br>    
                </p>`
        })
}