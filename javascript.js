const container = document.querySelector("#container");
let isDrawing = false;

function draw(event) {
    if(event.target.classList.contains("grid-item") && isDrawing) {
        const hoverdItem = event.target;
        hoverdItem.style.backgroundColor = "red";
        event.preventDefault();
    }
}

// Creating grid elements
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
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

