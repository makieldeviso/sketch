let dimensions = 16;
let previousDimensions = 16;
let sketchPad = document.querySelector("#sketch-pad");

addPad(dimensions); //puts initial sketch pad on load

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

    if (!isNaN(sizeFromPrompt) && sizeFromPrompt >= 8 && sizeFromPrompt < 100 ) {
        dimensions = sizeFromPrompt;
        sizeLabel.textContent = `${dimensions}px`;
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
        sizeLabel.textContent = `${dimensions}px`;
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

let setPadSizeButton = document.querySelector(".set-pad-size");
setPadSizeButton.addEventListener("click", setPad);

function setPad() {
    removePad(previousDimensions);
    addPad(dimensions);
}

// removes add and set the sketch pad (end) --------