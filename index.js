let dimensions = 16;
let sketchPad = document.querySelector("#sketch-pad");


// window.addEventListener("resize", resizePad);

// function resizePad() {
//     // let padArea = document.querySelector("#pad-area");
//     // let padAreaWidth = padArea.offsetWidth;
//     // padArea.style.height = `${padAreaWidth}px`;
//     // console.log(padArea.style.height);
//     let padRowWidth = document.querySelector(".pad-row").offsetWidth;
//     let pixelDim = document.querySelectorAll(".pixel-dim");
//     pixelDim.forEach(pixel => {
//         pixel.style.width = `${padRowWidth / dimensions}px`;
//         pixel.style.height = `${padRowWidth / dimensions}px`;
//     })
// }







for (let i = 0; i < dimensions; i++) {
    let padRow = document.createElement("div");
    padRow.classList.add("pad-row");       
    sketchPad.appendChild(padRow);
    
    for (let i = 0; i < dimensions; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel-dim");
        padRow.appendChild(pixel);
    }
    // let pixelDim = document.querySelectorAll(".pixel-dim");
    // pixelDim.forEach(pixel => {
    //     pixel.style.width = `${padRowWidth / dimensions}px`;
    //     pixel.style.height = `${padRowWidth / dimensions}px`;

    // });

}
