let dimensions = 16;
let previousDimensions = 16;
let colorPicked = "black"; //set default paint color
let lastColor = "black"; //records previous color

let padAccess = true; //checks if the pad is available

const updateFooterYear = (function () {
    const footerYear = document.querySelector('#footer-year');
    footerYear.textContent = (new Date()).getFullYear();
})();

// Mode flags status toggler (start) -----------------------
let modeFlagsArray = [];
function ModeFlag (mode, status) {
    this.mode =  mode;
    this.status = status;

    modeFlagsArray.push(this);
}

    let rainbowMode = new ModeFlag ("rainbowMode", false);
    let eraserMode = new ModeFlag ("eraserMode", false);
    let colorFillMode = new ModeFlag ("colorFillMode", false);
    let paintMode = new ModeFlag ("paintMode", true);

// Checks the status of modes to enhance active toggling
function turnOnModeOthersOff(modeToOn, onOrOff) {
    if (onOrOff === false) {
        modeToOn["status"] = false;
        return;
    } else if (onOrOff === true) {
        modeFlagsArray.forEach(mode => {
            mode["status"] = false;
        });

        modeToOn["status"] = true;
    }
}
// Mode flags status toggler (end) -----------------------

let sketchPad = document.querySelector("#sketch-pad");
let colorPickedArea = document.querySelector("#color-picked-area");
colorPickedArea.addEventListener("click", getColorFromSwatch);

let colorPickedPalette = document.querySelector("#color-picked");
colorPickedPalette.style.backgroundColor = colorPicked; //color palette set to default
colorPickedPalette.addEventListener("click", getColorFromSwatch);

let clearButton = document.querySelector("#clear-all");
clearButton.addEventListener("click", clearPaint);

let eraserButton = document.querySelector("#eraser");
eraserButton.addEventListener("click", toggleEraser);

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


// Removes and add individual  pixel to sketch pad (start) --------

// Removes previous pad before inserting new pad
function removePad(pixelRowSize) { 
    let padRows = document.querySelectorAll(".pad-row");
    
    if (padRows.length > 0) {
        for (let i = 0; i < pixelRowSize; i++) {
            let padRow = document.querySelector(".pad-row");
            sketchPad.removeChild(padRow);
        }
    }
}

// Adds new pad
function addPad(pixelSize) {
    for (let i = 0; i < pixelSize; i++) {
        let padRow = document.createElement("div");
        padRow.classList.add("pad-row");
        padRow.setAttribute("data-row", `${pixelSize - i}`);  //row 1 would be the bottom row     
        sketchPad.appendChild(padRow);
        
        for (let i = 0; i < pixelSize; i++) {
            let pixel = document.createElement("div");
            pixel.classList.add("pixel-dim");
            pixel.setAttribute("data-column", `${i + 1}`);
            padRow.appendChild(pixel);
        }
}
    previousDimensions = pixelSize;
}

// Removes and Add individual  pixel to sketch pad (end) --------
// Pad size editor (end)-----------------------------

// select color (start) ------------------
let swatchColors=[];
function BasicSwatch(name, color) {
    this.name = name;
    this.color = color;
    swatchColors.push(this);
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
    // let white = new BasicSwatch("white", "#FFFFFF");

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
    swatchPixel.style.backgroundColor = "#BDCDD6";
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
    
    addClickedClass(colorPickedArea);

    //change to normal painter if before click painter mode is on
    if (rainbowMode["status"] === true) {
        turnOnModeOthersOff(rainbowMode, false);
        turnOnModeOthersOff(paintMode, true);
        changeCursorStyle("paint");
        addClickedClass(paintButton);
    }

    //turns off eraser mode when swatch is clicked
    if (eraserMode["status"] === true) {
        turnOnModeOthersOff(eraserMode, false);
        changeCursorStyle("clear");
        addEventListenersToPixels("remove", false);
        eraserButton.classList.remove("clicked");
    }
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

    addClickedClass(colorPickedArea);
    
    //change to normal painter if before click painter mode is on
    if (rainbowMode["status"] === true) {
        turnOnModeOthersOff(rainbowMode, false);
        turnOnModeOthersOff(paintMode, true);
        changeCursorStyle("paint");
        addClickedClass(paintButton);
    }

    //turns off eraser mode when swatch is clicked
    if (eraserMode["status"] === true) {
        turnOnModeOthersOff(eraserMode, false);
        changeCursorStyle("clear");
        addEventListenersToPixels("remove", false);
        eraserButton.classList.remove("clicked");
    }
}
// select color (end) ------------------

// paints the pixel (start) ----------------
//  add event listeners and check if the pad is available -------
function addEventListenersToPixels(action, padAvailable) {
    let clicked = false;
    padAccess = padAvailable;

    let touchScreen = "ontouchstart" in window;

    // touchscreen mobile feature (start) -----------

    if (touchScreen) {
        let pixels = document.querySelectorAll(".pixel-dim");
        if (action === "remove" || padAccess === false) {
            pixels.forEach(pixel => {
                pixel.removeEventListener("touchstart", paintBrush);
            });
            pixels.forEach(pixel => {
                pixel.removeEventListener("touchmove", paintPixel);
            });

            window.removeEventListener("touchend", paintBrush);
        }


        if (colorFillMode["status"] === true){
            // let pixels = document.querySelectorAll(".pixel-dim");
            pixels.forEach(pixel => {
                pixel.addEventListener("touchstart", colorFill);
            });
            return;
    
        } else if (paintMode["status"] === true || 
            rainbowMode["status"] === true ||
            eraserMode["status"] === true) {
            
            if (action === "add" && padAccess === true) {
                pixels.forEach(pixel => {
                    pixel.addEventListener("touchstart", paintBrush);
                });
                pixels.forEach(pixel => {
                    pixel.addEventListener("touchmove", paintPixel);
                });
                window.removeEventListener("touchend", paintBrush);
            }
         }

     } else {
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
            pixels.forEach(pixel => {
                pixel.removeEventListener("click", colorFill);
            });
            window.removeEventListener("mouseup", paintBrush);
        }
        //enables active toggling of padSize without turning off colorFill Mode
        //since changing padSize initially removes all pixels and add new ones
        if (colorFillMode["status"] === true){
            let pixels = document.querySelectorAll(".pixel-dim");
            pixels.forEach(pixel => {
                pixel.addEventListener("click", colorFill);
            });
            return;
    
        } else if (paintMode["status"] === true || 
            rainbowMode["status"] === true ||
            eraserMode["status"] === true) {
            
            if (action === "add" && padAccess === true) {
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
        }
    }
    
        function paintBrush(event) {
            if (event.button === 2) { //prevents right click from painting the pad
                return;
            }

            if (event.type === "mousedown"){
                event.preventDefault();
                clicked = true;
                paint(this);
            } else if (event.type === "mouseup") {
                event.preventDefault();
                clicked = false;
            } else if (event.type === "touchstart") { //mobile
                clicked = true;
                paint(this);
            } else if (event.type === "touchend") { // mobile
                clicked = false;
            }
        }
    
        function paintPixel(event) {
            if (event.type === "mouseover" & clicked === false ||padAccess === false ) {
                return;
            } else if (event.type === "mouseover" && clicked === true && padAccess === true) {
                paint(this);
            } else if (event.type === "click" && padAccess === true) {
                paint(this);
            } else if (event.type === "touchmove") {
                let touch = event.targetTouches[0];
                let touchStreak = document.elementFromPoint(touch.clientX, touch.clientY);
                if (touchStreak.hasAttribute("data-column")) {
                    paint(touchStreak);
                } else {
                    return;
                }                
            }
        }
    
        function paint(pixel) {
            if (padAccess === false) {
                return;
            }
    
            if (colorPicked === "rainbow") {
                let rainbow = (swatchColors[Math.floor(Math.random() * (9 - 3 + 1)) + 3]["color"]);
                pixel.style.backgroundColor = rainbow;
                colorPickedPalette.style.backgroundColor = rainbow;
                lastColor = rainbow;
                pixel.setAttribute("data-color", rainbow);
                return;
            } else if (colorPicked === "") {
                pixel.style.backgroundColor = colorPicked;
                pixel.removeAttribute("data-color");
                return;
            }
            pixel.style.backgroundColor = colorPicked;
            pixel.setAttribute("data-color", colorPicked);
            
        }
}
// paints the pixel (end) ----------------

// clears the sketch pad (start) -------
function clearPaint() {
    let pixels = document.querySelectorAll(".pixel-dim");
    pixels.forEach(pixel => {
        pixel.removeAttribute("style");
        pixel.removeAttribute("data-color");
    });

    addClickedClass(this);
    addEventListenersToPixels("remove", false);
    changeCursorStyle("clear");
    turnOnModeOthersOff("", true); //turns off all modes


    setTimeout(() => {
        this.classList.remove("clicked");
    }, 50);   
}
// clears the sketch pad (end) -------


let paintButton = document.querySelector("#paint");
paintButton.addEventListener("click", togglePaint);

function togglePaint() {
    if (paintMode["status"] === false) {
        turnOnModeOthersOff(paintMode, true);

        changeCursorStyle("paint");
        addClickedClass(this);
        addEventListenersToPixels("add", true);
    } else if (paintMode["status"] === true) {
        turnOnModeOthersOff(paintMode, false);

        changeCursorStyle("clear");
        this.classList.remove("clicked");
        addEventListenersToPixels("remove", false);
    }
}

// eraser (start) ---------
function toggleEraser() {

    if (eraserMode["status"] === false) {
        turnOnModeOthersOff(eraserMode, true);

        colorPicked = "";
        changeCursorStyle("erase");
        addClickedClass(this);
        addEventListenersToPixels("add", true);

    } else if (eraserMode["status"] === true) {
        turnOnModeOthersOff(eraserMode, false);

        changeCursorStyle("clear");
        this.classList.remove("clicked");
        addEventListenersToPixels("remove", false);

    }
}
// eraser (end) ---------

// //toggle rainbow mode (start) ----
let rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", toggleRainbow);

function toggleRainbow() {

    if (rainbowMode["status"] === false) {
        turnOnModeOthersOff(rainbowMode, true);

        colorPicked = "rainbow";
        changeCursorStyle("rainbow");
        addClickedClass(this);
        addEventListenersToPixels("add", true);

    } else if (rainbowMode["status"] === true) {
        turnOnModeOthersOff(rainbowMode, false);

        changeCursorStyle("clear");
        this.classList.remove("clicked");
        addEventListenersToPixels("remove", false);
    } 
}
// //toggle rainbow mode (end) ----

// toggle color fill mode (start) -------------------
let colorFillButton = document.querySelector("#fill");
colorFillButton.addEventListener("click", toggleColorFill);

function toggleColorFill() {

    if (colorFillMode["status"] === false) {
        turnOnModeOthersOff(colorFillMode, true);
        addClickedClass(this);
        changeCursorStyle("fill");
        addEventListenersToPixels("add", false); //adds color fill action but false argument disables brushing
    
    } else if (colorFillMode["status"] === true) {
        turnOnModeOthersOff(colorFillMode, false);
        this.classList.remove("clicked");
        changeCursorStyle("clear");
        addEventListenersToPixels("remove", false);
    }
}
//  fill and propagate colors on the pixels
function colorFill() {

    if (colorFillMode["status"] === true) {
        let canvasColor = this.getAttribute("data-color"); // gets the canvas color for reference

        let originRowNumber = parseInt(this.parentNode.getAttribute("data-row"));
        let originColumnNumber = parseInt(this.getAttribute("data-column"));
        
        let pointOrigin = [originRowNumber, originColumnNumber];
        let originPixelRow = document.querySelector(`[data-row="${pointOrigin[0]}"]`);
        let originPixel = originPixelRow.querySelector(`[data-column="${pointOrigin[1]}"]`);

        let originRowDiv = originPixelRow;
        let origin = originPixel;
        
        // propagate paint from origin function (start) ---------
        function propagate() {

            // variables
            originRowDiv = origin.parentNode; //the div where the origin pixel is located
            let newOriginRow = parseInt(originRowDiv.getAttribute("data-row"));
            let newOriginColumn = parseInt(origin.getAttribute("data-column"));
            pointOrigin = [newOriginRow, newOriginColumn];

            // this code area styles and set the origin fill point (start)----------
            origin.setAttribute("data-origin", "origin");
            origin.setAttribute("data-color", colorPicked); // adds data-color attribute to first point
            if (origin.hasAttribute("data-filled")) {
                origin.removeAttribute("data-filled");
            }
            origin.style.backgroundColor = colorPicked;
            // this code area styles and set the origin fill point (end)------------

            // adjacent pixels
            let posX = originRowDiv.querySelector(`[data-column="${newOriginColumn + 1}"]`);
            let negX = originRowDiv.querySelector(`[data-column="${newOriginColumn - 1}"]`);
            let posY = document.querySelector(`[data-row="${newOriginRow + 1}"]>[data-column="${newOriginColumn}"]`);
            let negY = document.querySelector(`[data-row="${newOriginRow - 1}"]>[data-column="${newOriginColumn}"]`);
            
            // checks if the adjacent pixel is a origin
            let adjacentPosXOrigin = checkAttribute(posX, "data-origin");
            let adjacentNegXOrigin = checkAttribute(negX, "data-origin");
            let adjacentPosYOrigin = checkAttribute(posY, "data-origin");
            let adjacentNegYOrigin = checkAttribute(negY, "data-origin");

            //attribute checker function
            function checkAttribute(pixel, attribute) {
                if (pixel === null) {
                    return true;
                } else {
                    return pixel.hasAttribute(attribute);
                }   
            }

            // checks if the adjacent pixel has the same color as origin
            let adjacentPosXColor = checkColorAttribute(posX);
            let adjacentNegXColor = checkColorAttribute(negX);
            let adjacentPosYColor = checkColorAttribute(posY);
            let adjacentNegYColor = checkColorAttribute(negY);

            // check adjacent pixels if they have the same canvas color
            function checkColorAttribute(pixel) {
                let originColor = canvasColor;  //get the canvas color as reference

                if (pixel === null) { return true;} // immediately stop function when pixel is out of bounds

                let pixelColor = pixel.getAttribute("data-color"); // check color of adjacent pixel

                if (originColor === colorPicked) { return true;}

                if (originColor === pixelColor) {
                    return false;
                }else {
                    return true;
                }
            }

            // paints the pixel if it passes the right conditions
            if (newOriginColumn >= 1 && 
                newOriginColumn < dimensions &&
                adjacentPosXOrigin === false &&
                adjacentPosXColor === false) {
                paintFill(posX);
            }
        
            if (newOriginColumn > 1 && 
                newOriginColumn <= dimensions &&  
                adjacentNegXOrigin === false &&
                adjacentNegXColor === false) {
                paintFill(negX); 
            }

            if (newOriginRow >= 1 && 
                newOriginRow < dimensions &&  
                adjacentPosYOrigin === false &&
                adjacentPosYColor === false) {
                paintFill(posY);    
            }
        
            if (newOriginRow > 1 && 
                newOriginRow <= dimensions &&  
                adjacentNegYOrigin === false &&
                adjacentNegYColor === false) {
                paintFill(negY);
            }

            // paints the pixel
            function paintFill(pixel) {
                pixel.style.backgroundColor = colorPicked; //paints origin
                pixel.setAttribute("data-color", colorPicked);
                pixel.setAttribute("data-filled", "fillPoint");     
            } 
        }
        // propagate paint from origin function (end) ---------  

        propagate(); // puts first point of fill using origin div

        //loops until all spaces are painted
        for(let i = 0; i < dimensions * dimensions; i++) {
            // loops the pixels with data filPoint attribute to be the next origin for propagation
            let fillPoint = document.querySelectorAll("[data-filled='fillPoint']");
            fillPoint.forEach(point => {
                origin = point;
                propagate();  
            });

            let remainingFillPoint = document.querySelectorAll("[data-filled='fillPoint']");
            if (remainingFillPoint.length === 0) {
                break; //stops the loop if no more new fillPoints to propagate 
            }

        }
        // removes origin data attribute, enables the user to refill pixels
        let usedAsOrigin =  document.querySelectorAll("[data-origin='origin']");
                usedAsOrigin.forEach(origin => {
                    origin.removeAttribute("data-origin");
                });
    }
    return;
}
// toggle color fill mode (end) -------------------

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
    } else if (action === "rainbow") {
        pixels.forEach(pixel => {
            pixel.style.cursor = `url("./cursors/rainbow.cur"), pointer`;
        });
    } else if (action === "fill") {
        pixels.forEach(pixel => {
            pixel.style.cursor = `url("./cursors/fill.cur"), pointer`;
        });
    }
}
// change cursor style (end) ------

//add styling to clicked items (start) ----
function addClickedClass(button) {

    let otherClicked = document.querySelectorAll(".clicked");

    if (button.hasAttribute("data-swatch")) {
        button.classList.add("clicked");
        if (document.querySelector("#rainbow").hasAttribute("class")) {
            document.querySelector("#rainbow").classList.remove("clicked");
        }
        return;
    }

    if (otherClicked.length > 0) {
        otherClicked.forEach(clicked => {
            clicked.classList.remove("clicked");
        });

        if (button.dataset.action === "clear" || button.dataset.action === "eraser") {
            button.classList.add("clicked");
            return;
        } else if (button.dataset.action === "rainbow"){
            document.querySelector("#color-picked-area").classList.add("clicked");
            colorPicked = "rainbow";
        } else {
            document.querySelector("#color-picked-area").classList.add("clicked");
            colorPicked = lastColor;
        }
        
    } else if (otherClicked.length === 0) {
        if (button.dataset.action === "eraser") {
            colorPicked = "";
        } else if (button.dataset.action === "rainbow"){
            document.querySelector("#color-picked-area").classList.add("clicked");
            colorPicked = "rainbow";
        } else {
            document.querySelector("#color-picked-area").classList.add("clicked");
            colorPicked = lastColor;
        }
    }
    button.classList.add("clicked");
}
//add styling to clicked items (end) ----