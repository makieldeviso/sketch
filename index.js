let dimensions = 16;
let previousDimensions = 16;
let colorPicked = "";

let sketchPad = document.querySelector("#sketch-pad");
let colorPickedPalette = document.querySelector("#color-picked");

addPad(dimensions); //puts initial sketch pad on load
addEventListenersToPixels();

let sizeLabel = document.querySelector(".size-label");


// Sets the pad size through prompt (start) -----------
let sizeTyper = document.querySelector(".size-typer");
sizeTyper.addEventListener("click", typeForPadSize);

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
    } else if (isNaN(sizeFromPrompt || sizeFromPrompt > 8 ||    sizeFromPrompt > 100)) {
        alert("Invalid input! Please enter a number between 8 and 100.");
        promptSize();
    }
}
// Sets the pad size through prompt (end) -----------


// Sets the pad size through slider (start) -----------
let sizeSlider = document.querySelector("#size-slider");
sizeSlider.addEventListener("input", slideForPadSize);

function slideForPadSize() {
        dimensions = this.value;
        sizeLabel.textContent = `${dimensions} x ${dimensions}`;
}
// Sets the pad size through slider (end) -----------


// removes add and set the sketch pad (start) --------

function removePad(pixelRowSize) {
    let padRows = document.querySelectorAll(".pad-row");
    
    if (padRows.length > 0) {
        for (let i = 0; i < pixelRowSize; i++) {
            let padRow = document.querySelector(".pad-row");
            sketchPad.removeChild(padRow);
        }
    }
}

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

// sets the sketch pad
let setPadSizeButton = document.querySelector(".set-pad-size");
setPadSizeButton.addEventListener("click", setPad);

function setPad() {
    removePad(previousDimensions);
    addPad(dimensions);
    addEventListenersToPixels();
}

// removes add and set the sketch pad (end) --------




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
    color = this.getAttribute("style").split(/[:;]/)[1];
    colorPicked = color;

    colorPickedPalette.style.backgroundColor = colorPicked;
    }

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", getColorFromPicker);


// select color from a color picker
function getColorFromPicker() {
    colorPicked = this.value;
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

    console.log(colorPicked);
}

// select color (end) ------------------


// paints the pixel (start) ----------------

function addEventListenersToPixels() {
    let pixels = document.querySelectorAll("div.pixel-dim");
    pixels.forEach(pixel => {
        pixel.addEventListener("mousedown", paintBrush);
    });
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseup", paintBrush);
    });
    pixels.forEach(pixel => {
        pixel.addEventListener("click", paintPixel);
    });
}

function paintBrush(event) {
    let pixels = document.querySelectorAll("div.pixel-dim");

    if (event.type === "mousedown"){
        pixels.forEach(pixel => {
            pixel.addEventListener("mouseover", paintPixel);
    })
    } else if (event.type === "mouseup") {
        pixels.forEach(pixel => {
            pixel.removeEventListener("mouseover", paintPixel);
    })

    }
}

function paintPixel() {
    this.style.backgroundColor = colorPicked;
}

// paints the pixel (end) ----------------

