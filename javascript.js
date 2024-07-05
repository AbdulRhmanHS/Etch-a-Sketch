const container = document.querySelector("#container");
const inputGrid = document.getElementById("grid");
const inputButton = document.getElementById("enter");
const gridText = document.getElementById("gridText");
const clearButton = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const colorPickerLabel = document.querySelector('.colorPickerContainer label');
const rainbowButton = document.getElementById("rainbow");
let isRainbow = false;
let isDrawing = false;
let gridSize = 16;
let gridItems; // Array to store grid item elements
let currentColor = colorPicker.value;

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

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

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
        event.preventDefault(); // Prevent mouse from interrupting the drawing
    }
}

function createGrid(size) {
    gridItems = []; // Reset grid items array
    clearContainer(container); // Clear container

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `calc(100% / ${size})`;
            gridItems.push(gridItem); // Add item to gridItems array
            container.appendChild(gridItem);
        }
    }
    gridText.textContent = `${size}x${size}`; // Display grid size
}

// Event listeners for all grid items at once (more efficient)
container.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("grid-item")) {
      isDrawing = true;
      draw(e);
    }
});
window.addEventListener("mouseup", () => {
    isDrawing = false;
});
container.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      draw(e);
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

// Clear button work
clearButton.addEventListener("click", () => {
    for (const item of gridItems) {
        item.style.backgroundColor = "white"; // Return all gird color to white
    }
});

rainbowButton.addEventListener('click', () => {
    isRainbow = true;
});
rainbowButton.addEventListener('dblclick', () => {
    isRainbow = false;
});