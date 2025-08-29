const container = document.querySelector("#container");
const inputGrid = document.getElementById("grid");
const inputButton = document.getElementById("enter");
const clearButton = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const colorPickerLabel = document.querySelector('.colorPickerContainer label');
const rainbowButton = document.getElementById("rainbow");

let isRainbow = false;
let isDrawing = false;
let isMiddleDrawing = false;
let gridSize = 16;
let currentColor = colorPicker.value;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw(event) {
    const clickedItem = event.target;
    if (clickedItem.classList.contains("grid-item") && isDrawing) {
        if (isRainbow) {
            clickedItem.style.backgroundColor = getRandomColor(); // Set random color in rainbow mode
        }
        else {
            clickedItem.style.backgroundColor = currentColor;
        }
        clickedItem.style.opacity = 1; // Reset opacity to 1
        event.preventDefault(); // Prevent mouse from interrupting the drawing
    }
}

function drawWithOpacity(event) {
    const clickedItem = event.target;
    if (clickedItem.classList.contains("grid-item") && isMiddleDrawing) {
        clickedItem.style.backgroundColor = currentColor;
        let opacity = parseFloat(clickedItem.style.opacity) || 1; // Default opacity is 1
        opacity = Math.max(opacity - 0.1, 0.1); // Decrease opacity but not less than 0.1
        clickedItem.style.opacity = opacity.toFixed(1); // Set new opacity with only one number after the decimal point
        event.preventDefault(); // Prevent mouse from interrupting the drawing
    }
}

// For recreating grid.
function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createGrid(size) {

    clearContainer(container); // Clear container

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `calc(100% / ${size})`;
            container.appendChild(gridItem);
        }
    }

    const gridText = document.getElementById("gridText");
    const girdLabel = document.querySelector('.inputBox label');

    girdLabel.textContent = `Grid Size: ${size}x${size}`; // Display grid size at start
    gridText.textContent = `${size}x${size}`; // Display grid size
}

// Upadte the current color
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
    colorPickerLabel.style.color = currentColor; // Change label background to match selected color
});

// Add hover effect for color picker dynamically
colorPickerLabel.addEventListener("mouseover", () => {
    colorPickerLabel.style.color = currentColor;
    if (currentColor.toLowerCase() === "#ffffff" || currentColor.toLowerCase() === "#fff") {
        colorPickerLabel.style.backgroundColor = "#000";
    }
    else {
        colorPickerLabel.style.backgroundColor = "#fff";
    }
});
colorPickerLabel.addEventListener("mouseout", () => {
    colorPickerLabel.style.backgroundColor = currentColor;
    if (currentColor.toLowerCase() === "#ffffff" || currentColor.toLowerCase() === "#fff") {
        colorPickerLabel.style.color = "#000";
    }
    else {
        colorPickerLabel.style.color = "#fff";
    }
});

// Update grid size when moving the slider
inputGrid.addEventListener("input", (e) => {
  const gridSize = e.target.value;
  const gridLabel = document.querySelector('.inputBox label');
  gridLabel.textContent = `Grid Size: ${gridSize}x${gridSize}`;
});

// Update slider color with the color picker
colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  inputGrid.style.setProperty("--slider-color", color);
});


// Event listeners for all grid items at once (more efficient)
container.addEventListener("mousedown", (e) => {
    if (e.button === 0 && e.target.classList.contains("grid-item")) {
        isDrawing = true;
        isMiddleDrawing = false;
        draw(e);
    } else if (e.button === 1 && e.target.classList.contains("grid-item")) {
        isMiddleDrawing = true;
        isDrawing = false;
        drawWithOpacity(e);
    }
});
window.addEventListener("mouseup", () => {
    isDrawing = false;
    isMiddleDrawing = false;
});
container.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        draw(e);
    } else if (isMiddleDrawing) {
        drawWithOpacity(e);
    }
});

createGrid(gridSize);

// Enter button work
inputButton.addEventListener("click", () => {
    gridSize = inputGrid.value;
    if (gridSize > 100 || gridSize <= 0) {
        alert("Error");
    } else {
        createGrid(gridSize);
    }
});


clearButton.addEventListener("click", () => {
    container.querySelectorAll(".grid-item").forEach((item) => {
        item.style.backgroundColor = "white"; // Return all grid color to white
        item.style.opacity = 1; // Reset opacity
    })
});

rainbowButton.addEventListener('click', () => {
    isRainbow = true;
});
rainbowButton.addEventListener('dblclick', () => {
    isRainbow = false;
});