let buffer1; // 
let buffer2; // 

const damping = 0.999 // non integer between 0 and 1

// size of array
const ARRAY_WIDTH = 10;
const ARRAY_HEIGHT = 10;

// initialise arrays
// TODO byte arrays? word arrays?
buffer1 = Array(ARRAY_HEIGHT).fill().map(()=>Array(ARRAY_WIDTH).fill(0));
buffer2 = Array(ARRAY_HEIGHT).fill().map(()=>Array(ARRAY_WIDTH).fill(0));

// main loop
const processWater = () => {
    for (let x = 1; x < buffer1.length - 1; x++) {
        for (let y = 1; y < buffer1.length - 1; y++) {
            buffer2[x][y] = ( buffer1[x-1][y]
                            + buffer1[x+1][y] 
                            + buffer1[x][y+1]
                            + buffer1[x][y-1])
                            / 2
                            - buffer2[x][y];
        }
        buffer2[x][y] = buffer2[x][y] * damping;
    }
}