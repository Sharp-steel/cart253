/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * New feature design:
 * Add 1 to the score every time you catch a fly
 * When frog eats 50 flies, frog is full
 * 
 * New feature:
 * When the tongue catches the fly add 1 to the score
 * Make the fly move in a random direction
 * Add a game over and start screen
 * 
 * Pseudcode:
 * 
 * At the top:
 * score = 0
 * 
 * In the if-state that determines the fly was caught:
 * score = score + 1 / score += 1 / score ++
 * If score = 50, game over
 * 
 * In draw:
 * Display score in the bottom left
 * Display GameOver
 * 
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// The current score
let score = 0;

// The current state
let state = "title";

let soundEffect = undefined;

function preload() {
    soundEffect = loadSound("assets/sounds/bark.wav");
}

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    if (state === "title") {
        title();
    }
    else if (state === "gameStart") {
        gameStart();
    }
    else if (state === "gameOver") {
        gameOver();
    }
}

function title() {
    push();
    background("#008000");
    textSize(48);
    text("Frogfrogfrog", 190, 200);
    text("PRESS TO PLAY!", 140, 300);
    pop();
}

function gameStart () {
    background("#87ceeb");
    moveFly();
    moveFrog();
    moveTongue();
    checkTongueFlyOverlap();
    drawFly();
    drawFrog();
    drawScore();
    if (score === 1) {
        state = "gameOver";
    }
}

function gameOver () {
    push();
    background("#008000");
    textSize(48);
    text("FROGGY IS FULL!", 120, 200);
    text("GAME OVER!", 170, 300);
    pop();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawScore() {
    push();
    fill(0);
    noStroke();
    textSize(48);
    textAlign(LEFT, BOTTOM);
    text(score, width - 625, 480);
    pop();
}



/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Increase the score
        score = score + 1;
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed () {
    if (state === "title") {
        state = "gameStart";
        soundEffect.loop();
    }
    else if (state === "gameStart") {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";
        }
    }
    else if (state === "gameOver") {
        state = "title";
    }
}

