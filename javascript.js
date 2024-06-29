const container = document.querySelector("#container");
const inputGrid = document.getElementById("grid");
const inputButton = document.getElementById("enter");
const gridText = document.getElementById("gridText");
const clearButton = document.getElementById("clear");
let isDrawing = false;
let gridSize = 16;
let gridItems; // Array to store grid item elements

function draw(event) {
    const clickedItem = event.target;
    if (clickedItem.classList.contains("grid-item") && isDrawing) {
        if (!clickedItem.classList.contains("drawn")) {
            clickedItem.classList.add("drawn"); // Mark as drawn
        }
        event.preventDefault(); // Prevent mouse from interrupting the drawing
    }
}

function createGrid(size) {
    gridItems = []; // Reset grid items array
    container.innerHTML = ""; // Clear container

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
        item.classList.remove("drawn"); // Remove drawn class from all items
    }
});