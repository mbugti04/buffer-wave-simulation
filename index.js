// two buffers (array of all pixels) are needed in order to calculate the wave movement
let buffer1;
let buffer2;

// decay of wave
// non-integer between 0 and 1
const damping = .999;

// size of array
const arrWidth = 400;
const arrHeight = 400;

// size of canvas
//

// emittor location
const emittorX = 200;
const emittorY = 25;
// emitting interval (ms)
const emittorInterval = 1000;

// emitting length (ms)
// leave -1 for limitless
const emittingLength = 5000;

// frame rate
const fr = 30;

// opacity of wave*?
const waveValue = 5000;

function setup() {
    // Sets the pixel scaling for high pixel density displays
    pixelDensity(1);
    createCanvas(arrWidth, arrHeight);
    // frame rate
    frameRate(fr)

    // initialise arrays
    // TODO byte arrays? word arrays?
    buffer1 = Array(arrWidth).fill(0).map(()=>Array(arrHeight).fill(0));
    buffer2 = Array(arrWidth).fill(0).map(()=>Array(arrHeight).fill(0));
}  

function mouseClicked() {
    // create source of wave at click of mouse
    buffer1[mouseX][mouseY] = waveValue;
}

function draw() {
    // wave emittor
    if (frameCount < fr * emittingLength / 1000 || emittingLength == -1 ) {
        if (frameCount % (fr * emittorInterval/1000) === 0) {
            buffer1[emittorX][emittorY] = waveValue;
        }
    }


    // needed for pixel modification
    loadPixels();
    // main loop
    for (let x = 1; x < buffer1.length - 1; x++) {
        for (let y = 1; y < buffer1.length - 1; y++) {
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
            let index = (x + y * arrWidth) * 4;

            // RGBA value of wave 
            pixels[index + 0] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 255;
            pixels[index + 3] = b2;
        }
        
    }
    updatePixels();
    //*
    let temp = buffer1;
	buffer1 = buffer2;
	buffer2 = temp;

    // time passed in seconds
    // stroke(0);
    fill(0);
    let timePassed = Math.round((frameCount / fr) * 10) / 10;
    text(timePassed, width / 2, height / 2);

    // draw wave emittor circle
    noStroke();
    fill(255,0,0);
    ellipse(emittorX, emittorY, 5, 5);

    // draw reciever triangles
    

}