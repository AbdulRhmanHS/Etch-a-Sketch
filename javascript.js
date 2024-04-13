const container = document.querySelector("#container");
let isDrawing = false;
let gridSize = 16;

// To make drawing on grid possible in DOM
function draw(event) {
    if(event.target.classList.contains("grid-item") && isDrawing) {
        const hoverdItem = event.target;
        hoverdItem.style.backgroundColor = "black";
        event.preventDefault(); // Prevent mouse from breaking mouseup event
    }
}

// Creating grid elements for rows
for (let i = 0; i < gridSize; i++) {
    // Another loop for columns within each row
    for (let j = 0; j < gridSize; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        // Dividing each grid by the grid size
        gridItem.style.width = `calc(100% / ${gridSize})`;
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

