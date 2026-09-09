

let postsArray = []

function renderPosts() {
    let html = ""
    for(let post of postsArray) {
    html += `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <hr />
        `
    }
    document.getElementById("Feed").innerHTML = html
}

/* Breakdown :
    Javascript fetch function requests data, It takes time for this to be returned so it makes a promise object. 
    The promise object is a placeholder for the data that will be returned.
    The .then() method is used to handle the promise object when the promise is finished and  the data is returned.
    It uses shorthand notation, instead of naming and declaring a new function and passing it the variable Resp etc resp => resp.json() is a shorthand for function(resp) { return resp.json() }
    Each .then statment acts on the previously resolved object in the chain. 

    A simple implementation to return some truncated data for example would be. 
    fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(resp => resp.json())
    .then(data => data.slice(0, 5))
    .then(show => console.log(show))

    However this can be expanded instead with {} as below  
    */
// Generates all of the Lorem Ipsum starter posts.
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
.then(res => res.json())
.then(data => {
    postsArray = data.slice(0, 5)
    console.log(postsArray)
    renderPosts()
    }
)



/* Silly Expansion for funzies */
const API_KEY = typeof GEMINI_API_KEY === "string" ? GEMINI_API_KEY.trim() : ""; // Loaded from a file that is ignored by git.
console.log(API_KEY) // Just to show that the key is being loaded correctly.

async function askGemini() {
    const loadingIcon = document.getElementById("loadingIcon");

    if (!API_KEY) {
        loadingIcon.innerHTML = "This functionality is disabled as you need to supply your own API key";
        return;
    }

    loadingIcon.innerHTML = "Loading...";
    const Topic = {
        1: "Melodramatic Cats",
        2: "The Secret Life of Squirrels",
        3: "The Great Spaghetti Heist",
        4: "The Adventures of a Lost Sock",
        5: "God is a Potato",
        6: "The optimal way to eat a sandwich",
        7: "The effect of extreme weather on LLM Heat",
        8: "The Jellyfish mafia",
        9: "Looking after your Introvert",
        10: "History",
        11: "Random",
        12: "Zany",
        13: "Quirky"
    }
    TopicSelection = Topic[Math.floor(Math.random() * 13) + 1]
    console.log("Asking Gemini for some blogslop for the topic of " + TopicSelection + "...")
    let response;
    try {
        response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: "Write a short funny blog post about the topic: " + TopicSelection + ". Format it as html code with a <h2> title and a <p> paragraph. finishing with a <hr />. Do not include any other text or explanation."
                            }
                        ]
                    }
                ]
            })
        }
        );
    } catch (error) {
        loadingIcon.innerHTML = "This functionality is disabled as you need to supply your own API key to use the LLM";
        return;
    }

    const data = await response.json();

    if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
        loadingIcon.innerHTML = "This functionality is disabled as you need to supply your own API key";
        return;
    }

    const html = data.candidates[0].content.parts[0].text;
    console.log(html);
    document.getElementById("Feed").innerHTML = html + document.getElementById("Feed").innerHTML;
    document.getElementById("loadingIcon").innerHTML = "";
    
    
    // Send this information to the API to simulate adding an item to a database with a post request.
    const h2Content = (html.match(/<h2[^>]*>(.*?)<\/h2>/i) || [])[1] || ""; // one-line extract of <h2> contents
    const pContent = (html.match(/<p[^>]*>(.*?)<\/p>/i) || [])[1] || ""; // one-line extract of <p> contents
    const postData = {
        title: h2Content,
        body: pContent
    };
    postsArray.unshift(postData); // Add the new post to the beginning of the postsArray  (push method would tack it onto the other end)
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json" // This is a header that tells the server what type of data we are sending. In this case we are sending JSON data. This is nesseary for this API to work. 
        }
    }).then(res => res.json()).then(data => console.log(data))
};





/* Human User Posting Logic */
document.getElementById("Submit").addEventListener("click", function(e) { 
    e.preventDefault(); // Prevents a reload of the page when the button is pressed. This is more relevent when listening for a form submit rather than a button click.

    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const data = {
        title: titleInput.value.trim(),
        body: contentInput.value.trim()
    };

    if (data.title === "Title" || data.body === "Content" || data.title === "" || data.body === "") {
        return;
    }
    
    postsArray.unshift(data); // Add the new post to the beginning of the postsArray  (push method would tack it onto the other end)
    console.log("User Submitted a post")
    renderPosts() 
    console.log(postsArray)

    titleInput.value = "Title";     // Reset Input to defaults after post 
    contentInput.value = "Content"; // Reset Input to defaults after post 


    // Send this information to the API to simulate adding an item to a database with a post request.
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json" // This is a header that tells the server what type of data we are sending. In this case we are sending JSON data. This is nesseary for this API to work. 
        }
    }).then(res => res.json()).then(data => console.log(data))
})



