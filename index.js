// two buffers (array of all pixels) are needed in order to calculate the wave movement
let buffer1;
let buffer2;

// decay of wave
// non-integer between 0 and 1
let damping = .999;



// size of array
const arrWidth = 400;
const arrHeight = 400   ;

// size of canvas
//

// emitter location
const emitterX = Math.round(arrWidth / 2);
const emitterY = Math.round(arrHeight / 8);
// emitting interval (ms)
const emitterInterval = 500;

// emitting length (ms)
// leave -1 for limitless
const emittingLength = 5000;

// frame rate
const fr = 30;

// opacity of wave*?
const waveValue = 5000;

let scene1;
let scene2;

function setup() {
    // Sets the pixel scaling for high pixel density displays
    pixelDensity(1);
    let myCanvas = createCanvas(arrWidth * 2, arrHeight);
    myCanvas.parent('main-div');

    // Create both off-screen graphics buffers
    scene1 = createGraphics(arrWidth, arrHeight);
    // scene1.background(255);
    scene2 = createGraphics(arrWidth, arrHeight);
    // frame rate
    frameRate(fr)

    // initialise arrays
    // TODO byte arrays? word arrays?
    buffer1 = Array(arrWidth).fill(0).map(()=>Array(arrHeight).fill(0));
    buffer2 = Array(arrWidth).fill(0).map(()=>Array(arrHeight).fill(0));
}  

function mouseClicked() {
    // create source of wave at click of mouse
    let x = Math.floor(mouseX);
    let y = Math.floor(mouseY);

    buffer1[x][y] = waveValue;
    // console.log("test", mouseX, mouseY, buffer1[mouseX][mouseY]);
    // createemitter(mouseX, mouseY);
}

function createemitter(emX, emY) {
    // // console.log("hey");
    // frameNow = frameCount;
    // console.log(frameNow);
    // if (frameCount - frameNow < fr * emittingLength / 1000 || emittingLength == -1 ) {
    //     if (frameNow % (fr * emitterInterval/1000) === 0) {
    //         buffer1[emX][emY] = waveValue;
    //     }
    // }
}

function draw() {
    // Draw on buffers
    drawScene1();
    drawScene2();
    // Paint off-screen buffers onto the main canvas
    image(scene1, 0, 0);
    image(scene2, arrWidth, 0);

    drawUI();
}

function drawUI() {
    // UI
    line(arrWidth, 0, arrWidth, arrHeight);
    textSize(24);
    // time passed in seconds
    textAlign(LEFT);
    text("Time: " + (Math.round(frameCount / fr * 10) / 10) + " s", 5, scene1.height - 5);
    // text("Time", );
    textAlign(CENTER);
    text("Horizontal distance X", scene1.width * 1.5, scene1.height - 5);
    
    let angle2 = radians(270);
    rotate(angle2);
    // Draw the letter to the screen
    text("Time (s)", -scene2.width / 2, scene2.height * 1.05);
    text("Depth Z", -scene1.width / 2, scene1.height / 20);

}

function drawScene1() {
    // background(220);
    // wave emitter
    if (frameCount < fr * emittingLength / 1000 || emittingLength == -1 ) {
        if (frameCount % (fr * emitterInterval/1000) === 0) {
            buffer1[emitterX][emitterY] = waveValue;
        }
    }

    // needed for pixel modification
    loadPixels();
    // main loop
    for (let x = 1; x < buffer1.length - 1; x+=1) {
        for (let y = 1; y < buffer1[0].length - 1; y+=1) {
            // explain*
            buffer2[x][y] = ( buffer1[x-1][y]
                            + buffer1[x+1][y] 
                            + buffer1[x][y+1]
                            + buffer1[x][y-1])
                            / 2
                            - buffer2[x][y];

            // explain*
            buffer2[x][y] = buffer2[x][y] * damping;

            let b2 = buffer2[x][y];
            // the * 2 makes it work with two screens
            let index = (x + y * arrWidth * 2) * 4;

            // pixels[index + 0] = 255;
            // pixels[index + 1] = 255;
            // pixels[index + 2] = 255;
            // pixels[index + 3] = 255;

            // RGBA value of wave 
            pixels[index + 0] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 255;
            pixels[index + 3] = b2/500 * 255;
        }
        
    }
    updatePixels();
    //*
    let temp = buffer1;
	buffer1 = buffer2;
	buffer2 = temp;

    // draw wave emitter circle
    scene1.noStroke();
    scene1.fill(255,0,0);
    scene1.ellipse(emitterX, emitterY, 5, 5);

    // draw reciever triangles
}

function drawScene2() {
    loadPixels();
    yStart = Math.floor(frameCount % arrHeight);
    for (let x = 1; x < buffer2.length - 1; x++) {
        for (let y = yStart; y < yStart + 1; y++) { // buffer2.length - 1 //  y = arrHeight * ((frameCount / fr) / dataDrawTime
            // y = Math.round(arrHeight * ((frameCount / fr) / dataDrawTime));
            // console.log(arrHeight * ((frameCount / frameRate) / dataDrawTime));
            // console.log(fr);
            // console.log(Math.round(arrHeight * ((frameCount / fr) / dataDrawTime)));
            let b2 = buffer2[x][1];
            // the * 2 makes it work with two screens
            let index = (x + arrWidth + (y) * arrWidth * 2) * 4;

            // pixels[index + 0] = 255;
            // pixels[index + 1] = 255;
            // pixels[index + 2] = 255;
            // pixels[index + 3] = 255;

            // RGBA value of wave 
            pixels[index + 0] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 255;
            pixels[index + 3] = b2/500 * 255;
        }
    }

    updatePixels();

}

// let rangeInput = document.getElementById('damping');
// rangeInput.addEventListener('input', function() {
//     damping = rangeInput.value;
//     console.log(damping);
//   });

// const value = document.querySelector("#value")
// const input = document.querySelector("#pi_input")
// value.textContent = input.value
// input.addEventListener("input", (event) => {
//   value.textContent = event.target.value
// })

// html buttons

let button;
let description;

window.addEventListener("DOMContentLoaded", (event) => {
    button = document.getElementById('button');
    description = document.getElementById('description');
    if (button) {
      button.addEventListener('click', updateButton);
    }
});

function updateButton() {
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(arrWidth);
        let y = getRandomInt(arrHeight);
        buffer1[x][y] = waveValue;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
