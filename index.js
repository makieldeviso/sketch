let dimensions = 16;
let previousDimensions = 16;
let colorPicked = "black"; //set default paint color
let padAccess = true; //checks if the pad is available

let sketchPad = document.querySelector("#sketch-pad");
let colorPickedArea = document.querySelector("#color-picked-area");
colorPickedArea.addEventListener("click", getColorFromSwatch);

let colorPickedPalette = document.querySelector("#color-picked");
colorPickedPalette.style.backgroundColor = colorPicked; //color palette set to default
colorPickedPalette.addEventListener("click", getColorFromSwatch);

let clearButton = document.querySelector("#clear-all");
clearButton.addEventListener("click", clearPaint);

addPad(dimensions); //puts initial sketch pad on load
addEventListenersToPixels("add", true); //add event listeners to initial sketch pad on load

changeCursorStyle("paint");

let sizeLabel = document.querySelector(".size-label");

// pad size editor (start)-----------------------------
// Sets the pad size through prompt (start) -----------
let sizeTyperButton = document.querySelector(".size-typer");
sizeTyperButton.addEventListener("click", typeForPadSize);

function typeForPadSize() {
    let sizeFromPrompt = parseInt(prompt("What pad size do you want to work with?\n (Input number between 8 and 100) "));

    if (sizeFromPrompt === null) {
        console.log(sizeFromPrompt);
        return; 
    }

    if (!isNaN(sizeFromPrompt) && sizeFromPrompt >= 8 && sizeFromPrompt <= 100 ) {
        dimensions = sizeFromPrompt;
        sizeLabel.textContent = `${dimensions} x ${dimensions}`;
        sizeSlider.value = dimensions;
    } else if (sizeFromPrompt < 8 || sizeFromPrompt > 100) {
        alert("Invalid input! Please enter a number between 8 and 100.");
        typeForPadSize();
    }
    removePad(previousDimensions);
    addPad(dimensions);
    addEventListenersToPixels("add", true);
}
// Sets the pad size through prompt (end) -----------


// Sets the pad size through slider (start) -----------
let sizeSlider = document.querySelector("#size-slider");
sizeSlider.addEventListener("input", slideForPadSize);

function slideForPadSize() {
        dimensions = this.value;
        sizeLabel.textContent = `${dimensions} x ${dimensions}`;
        removePad(previousDimensions);
        addPad(dimensions);
        addEventListenersToPixels("add", true);

}
// Sets the pad size through slider (end) -----------


// removes and add individual  pixel to sketch pad (start) --------

// removes previous pad before inserting new pad
function removePad(pixelRowSize) { 
    let padRows = document.querySelectorAll(".pad-row");
    
    if (padRows.length > 0) {
        for (let i = 0; i < pixelRowSize; i++) {
            let padRow = document.querySelector(".pad-row");
            sketchPad.removeChild(padRow);
        }
    }
}

// add new pad
function addPad(pixelSize) {
    for (let i = 0; i < pixelSize; i++) {
        let padRow = document.createElement("div");
        padRow.classList.add("pad-row");       
        sketchPad.appendChild(padRow);
        
        for (let i = 0; i < pixelSize; i++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel-dim");
            padRow.appendChild(pixel);
        }
}
    previousDimensions = pixelSize;
}

//removes and add individual  pixel to sketch pad (end) --------
// pad size editor (end)-----------------------------



// select color (start) ------------------
function BasicSwatch(name, color) {
    this.name = name;
    this.color = color;
}

    let black = new BasicSwatch("black", "#000000");
    let gray = new BasicSwatch("gray", "#999999");
    let brown = new BasicSwatch("brown", "#A52A2A");
    let red = new BasicSwatch("red", "#FF0000");
    let orange = new BasicSwatch("orange", "#FFA500");
    let yellow = new BasicSwatch("yellow", "#FFFF00");
    let green = new BasicSwatch("green", "#008000");
    let blue = new BasicSwatch("blue", "#0000FF");
    let indigo = new BasicSwatch("indigo", "#4B0082");
    let violet = new BasicSwatch("violet", "#EE82EE");


let swatchColors = [black, gray, brown, red, orange, yellow, green, blue, indigo, violet];

let swatchArea = document.querySelector(".basic-swatches");
let customColorArea = document.querySelector(".custom-colors");

// adds initial swatches
for (let i = 0; i < swatchColors.length; i++) {
    let swatchPixel = document.createElement("div");
    swatchPixel.classList.add("swatch");
    swatchPixel.style.backgroundColor = `${swatchColors[i]["color"]}`;
    swatchArea.appendChild(swatchPixel);
}
// add blank swatches to be filled by picker
for (let i = 0; i < swatchColors.length; i++) {
    let swatchPixel = document.createElement("div");
    swatchPixel.classList.add("blank-color");
    swatchPixel.style.backgroundColor = "white";
    customColorArea.appendChild(swatchPixel);
}


// select color by clicking on swatches
let swatchSelect = document.querySelectorAll(".swatch");
swatchSelect.forEach(swatch =>{
    swatch.addEventListener("click", getColorFromSwatch);
    })


function getColorFromSwatch() {

    if (this === colorPickedArea) {
        colorPicked = lastColor;
        colorPickedPalette.style.backgroundColor = colorPicked;
    } else {
        color = this.getAttribute("style").split(/[:;]/)[1];
        colorPicked = color;
        lastColor = color; //records previous color
        colorPickedPalette.style.backgroundColor = colorPicked;
    }
    changeCursorStyle("paint");
    addClickedClass(colorPickedArea);
    addEventListenersToPixels("add", true);
    }

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", getColorFromPicker);


// select color from a color picker
function getColorFromPicker() {
    colorPicked = this.value;
    lastColor = this.value; //records previous color
    let newSwatch = document.createElement("div");
    newSwatch.classList.add("swatch");
    newSwatch.addEventListener("click", getColorFromSwatch);

    let customSwatches = document.querySelectorAll(".custom-colors .swatch");

    if (customSwatches.length < 10) {
        newSwatch.style.backgroundColor = `${this.value}`;
        customColorArea.insertBefore(newSwatch, customColorArea.children[customSwatches.length]);
        customColorArea.removeChild(customColorArea.lastChild);
        
    } else {
        newSwatch.style.backgroundColor = `${this.value}`;
        customColorArea.appendChild(newSwatch);
        customColorArea.removeChild(customColorArea.firstChild);
    }

    colorPickedPalette.style.backgroundColor = colorPicked;
    changeCursorStyle("paint");
    addClickedClass(colorPickedArea);
    addEventListenersToPixels("add", true);
    
}


// select color (end) ------------------


// paints the pixel (start) ----------------
//  add event listeners and check if the pad is available -------
function addEventListenersToPixels(action, padAvailable) {
    let clicked = false;
    padAccess = padAvailable;
    
    if (action === "remove" || padAccess === false) {
        let pixels = document.querySelectorAll(".pixel-dim");
    
        pixels.forEach(pixel => {
            pixel.removeEventListener("mouseover", paintPixel);
        });

        pixels.forEach(pixel => {
            pixel.removeEventListener("mousedown", paintBrush);
        });    
        pixels.forEach(pixel => {
            pixel.removeEventListener("click", paintPixel);
        });
        window.removeEventListener("mouseup", paintBrush);
    
    
    } else if (action === "add" && padAccess === true) {
        let pixels = document.querySelectorAll(".pixel-dim");
    
        pixels.forEach(pixel => {
            pixel.addEventListener("mouseover", paintPixel);
        });

        pixels.forEach(pixel => {
            pixel.addEventListener("mousedown", paintBrush);
        });    
        pixels.forEach(pixel => {
            pixel.addEventListener("click", paintPixel);
        });
        window.addEventListener("mouseup", paintBrush); //allows mouseup outside the pad
    }

    function paintBrush(event) {
        if (event.type === "mousedown"){
            event.preventDefault();
            clicked = true;
            paint(this);
        } else if (event.type === "mouseup") {
            clicked = false;
        }
    }

    function paintPixel(event) {
        if (event.type === "mouseover" & clicked === false || padAccess === false) {
            return;
        } else if (event.type === "mouseover" && clicked === true && padAccess === true) {
            paint(this);
        } else if (event.type === "click" && padAccess === true) {
            paint(this);
        }
    }

    function paint(pixel) {
        if (padAccess === false) {
            return;
        }
        pixel.classList.add("erasable");
        pixel.style.backgroundColor = colorPicked;
    }

}

// paints the pixel (end) ----------------

// clears the sketch pad (start) -------
function clearPaint() {
    let erasable = document.querySelectorAll(".erasable");
    erasable.forEach(item => {
        item.removeAttribute("style");
    });

    addClickedClass(this);
    addEventListenersToPixels("remove", false);
    changeCursorStyle("clear");
    setTimeout(() => {
        this.classList.remove("clicked");
    }, 50);   
}

// clears the sketch pad (end) -------

// eraser (start) ---------
let eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", toggleEraser);

let lastColor = "black"; //records previous color

function toggleEraser() {
    colorPicked = "";
    changeCursorStyle("erase");
    addClickedClass(this);
    addEventListenersToPixels("add", true);
}
// eraser (end) ---------

// change cursor style (start) ------
function changeCursorStyle(action) {
    let pixels = document.querySelectorAll("div.pixel-dim");
    if (action === "paint") {
        pixels.forEach(pixel => {
            pixel.style.cursor = `url("./cursors/brush.cur"), pointer`;
        });
    } else if (action === "erase") {
        pixels.forEach(pixel => {
            pixel.style.cursor = `url('./cursors/eraser.cur'), crosshair`;
        })
    } else if (action === "clear") {
        pixels.forEach(pixel => {
            pixel.style.cursor = `default`;
        })
    }
}
// change cursor style (end) ------


//add styling to clicked items (start) ----
function addClickedClass(button) {
    let otherClicked = document.querySelectorAll(".clicked");
    if (otherClicked.length > 0) {
        otherClicked.forEach(clicked => {
            clicked.classList.remove("clicked");
        })
    }
    button.classList.add("clicked");
}

//add styling to clicked items (end) ----



// //toggle rainbow mode (end) ----
// function toggleEraser() {
//     colorPicked = "";
//     changeCursorStyle("erase");
//     addClickedClass(this);
//     addEventListenersToPixels("add", true);
// }


