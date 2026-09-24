fetch('https://apis.scrimba.com/jsonplaceholder/posts/2/comments')
    .then(response => response.json())
    .then(data => console.log(data));
    

fetch('https://apis.scrimba.com/openweathermap/data/2.5/weather?q=London') // could also appemnd &units=metric to the end of the url to get celsius instead of kelvin.
    .then(response => response.json())
    .then(data => {
        response => response.json();
        console.log(data);
        data.main.temp = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius and round to 2 decimal places
        console.log(`The temperature in ${data.name} is ${data.main.temp}°C`);
    });






// Experementing with ways to view Json where Console acess is restricted.
const escapeHtml = (value) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

fetch('https://apis.scrimba.com/jsonplaceholder/posts/2/comments')
    .then(response => response.json())
    .then(data => {
        const prettyJson = JSON.stringify(data, null, 2);
        document.getElementById('pseudoConsole').innerHTML = `<pre>${escapeHtml(prettyJson)}</pre>`;
    });
