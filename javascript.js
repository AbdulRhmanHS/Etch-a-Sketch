const container = document.querySelector("#container");
const inputGrid = document.getElementById("grid");
const inputButton = document.getElementById("enter");
const gridText = document.getElementById("gridText");
const clearButton = document.getElementById("clear");
let isDrawing = false;
let gridSize = 16;


// To make drawing on grid possible in the DOM
function draw(event) {
    // Condition to check if the created grid is present or not to make the color apply
    if(event.target.classList.contains("grid-item") && isDrawing) {
        const hoverdItem = event.target;
        hoverdItem.style.backgroundColor = "black";
        event.preventDefault(); // Prevent mouse from breaking mouseup event
    }
}

function createGrid(size) {
    // Creating grid elements for rows
    for (let i = 0; i < size; i++) {
    // Another loop for columns within each row
        for (let j = 0; j < size; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            // Dividing each grid by the grid size
            gridItem.style.width = `calc(100% / ${size})`;
            // Drawing effect
            gridItem.addEventListener("mousedown", (e) => {
                isDrawing = true;
                draw(e);
            });
            window.addEventListener("mouseup", () => {
                isDrawing = false;
            });
            gridItem.addEventListener("mousemove", (e) => {
                if (isDrawing) {
                    requestAnimationFrame(() => draw(e));
                }
            });
            container.appendChild(gridItem);
        }
    }
    gridText.textContent = `${size}x${size}`;
}

createGrid(gridSize);

// Enter button work
inputButton.addEventListener("click", () => {
    gridSize = inputGrid.value;
    if (gridSize > 100 || gridSize <= 0) {
        alert("Error");
    }
    else {
        container.innerHTML = "";
        createGrid(gridSize);
    }
});

// Claer button work
clearButton.addEventListener("click", () => {
    container.innerHTML = "";
    createGrid(gridSize);
});

