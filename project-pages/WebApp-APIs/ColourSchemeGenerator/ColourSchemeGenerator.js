const colorPicker = document.getElementById('colorPicker');
const pressButton = document.getElementById("generateButton");

// Initialize hex variable with a default value (including leading #)
let hex = "#ff0000";

// Fetch initial color name on load
getName(hex);

// Fires ONLY when the user commits their selection
if (colorPicker) {
  colorPicker.addEventListener('change', (event) => {
    hex = event.target.value; // Returns hex with '#', e.g. "#ff0000"
    const rgb = hexToRgb(hex);
    
    console.log("Hex:", hex);
    console.log("RGB:", rgb);

    getName(hex);
  });
}

if (pressButton) {
  // Pass an anonymous function so GetColorScheme uses the current 'hex' variable
  pressButton.addEventListener("click", () => GetColorScheme(hex));
}

function hexToRgb(hexStr) {
  // Ensure the '#' is stripped for bitwise calculation if present
  const cleanHex = hexStr.startsWith('#') ? hexStr.slice(1) : hexStr;
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

function getName(hexStr) {
  // Strip '#' if present to ensure API receives clean hex string
  const cleanHex = hexStr.startsWith('#') ? hexStr.slice(1) : hexStr;
  
  console.log("Parsing " + cleanHex + " to API");
  
  fetch("https://www.thecolorapi.com/id?hex=" + cleanHex + "&format=json")
    .then(res => res.json())
    .then(data => {
      console.log("Color Data:", data);
      const button = document.getElementById('generateButton');
      if (button) {
        button.innerHTML = "Get Color Scheme For " + data.name.value;
      }
    })
    .catch(err => console.error(err));
}

function GetColorScheme(hexStr) {
  // Strip '#' if present
  const cleanHex = hexStr.startsWith('#') ? hexStr.slice(1) : hexStr;
  const modeSelect = document.querySelector('.colour-mode');
  const mode = modeSelect && modeSelect.selectedOptions.length
    ? modeSelect.selectedOptions[0].textContent.trim().toLowerCase()
    : '';
  console.log(mode);

  fetch("https://www.thecolorapi.com/scheme?hex=" + cleanHex + "&mode=" + mode + "&format=json")
    .then(res => res.json())
    .then(data => {
      console.log("Scheme Data:", data);
      
      const colors = data.colors;
      const colorSections = document.querySelectorAll('.Section');
      
      colors.forEach((color, index) => {
        if (index < colorSections.length) {
          colorSections[index].style.backgroundColor = color.hex.value;
        }
      });
    })
    .catch(err => console.error(err));
}