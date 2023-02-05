let dimensions = 20;
let sketchPad = document.querySelector("#sketch-pad");





for (let i = 0; i < dimensions; i++) {
    let padRow = document.createElement("div");
    padRow.classList.add("pad-row");       
    sketchPad.appendChild(padRow);

    for (let i = 0; i < dimensions; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel-dim");
        padRow.appendChild(pixel);
    }

}