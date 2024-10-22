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
        x: 320,
        y: 480,
        size: 20,
        speed: 20,
        speedX: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

let pond = {
    x: 320,
    y: 240,
    size: 500
}

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
    x: 600,
    y: 200, // Will be random
    size: 10,
    speedX: 3,
    speedY: 3
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
    else if (state === "instructions") {
        instructions();
    }
    else if (state === "gameOver") {
        gameOver();
    }
}

/**
 * Setting the different game states
 */
function title() {
    push();
    background("#008000");
    textSize(48);
    text("Frogfrogfrog", 190, 200);
    text("PRESS TO PLAY!", 140, 300);
    pop();
}

function gameStart () {
    background("#008000");
    drawPond();
    moveFly();
    moveTongueUp();
    moveTongueLeft();
    moveTongueRight();
    checkTongueFlyOverlap();
    drawFly();
    drawFrog();
    drawScore();
    if (score === 10) {
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

function instructions () {
    push();
    background("#008000");
    textSize(24);
    text("Instructions:", 250, 100);
    text("Use the keyboard to move the tongue.", 130, 200);
    text("W for going up, A for going left and D for going right!", 50, 300);
    pop();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speedX;
    fly.y += fly.speedY;
    let percentage = random();
    if (percentage <= 0.1) {
        fly.speedX = random(-6, 6);
        fly.speedY = random(-6, 6);
    }
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
 * Handles moving the tongue based on its state
 */
function moveTongueUp() {
    // Tongue matches the frog's x
    // frog.tongue.x = frog.body.x;
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

function moveTongueLeft() {
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    else if (frog.tongue.state === "leftoutbound") {
        frog.tongue.x += -frog.tongue.speedX;
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.x <= 0 || frog.tongue.y <= 0) {
            frog.tongue.state = "leftinbound";
        }
        console.log(frog.tongue.speedX);
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "leftinbound") {
        frog.tongue.x += frog.tongue.speedX;
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

function moveTongueRight() {
// If the tongue is idle, it doesn't do anything
if (frog.tongue.state === "idle") {
    // Do nothing
}
else if (frog.tongue.state === "rightoutbound") {
    frog.tongue.x += frog.tongue.speedX;
    frog.tongue.y += -frog.tongue.speed;
    // The tongue bounces back if it hits the top
    if (frog.tongue.x >= width || frog.tongue.y <= 0) {
        frog.tongue.state = "rightinbound";
    }
    console.log(frog.tongue.speedX);
}
// If the tongue is inbound, it moves down
else if (frog.tongue.state === "rightinbound") {
    frog.tongue.x += -frog.tongue.speedX;
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

function drawPond () {
    push();
    fill("#87ceeb");
    noStroke();
    ellipse(pond.x, pond.y, pond.size);
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
        if (frog.tongue.state === "outbound") {
            frog.tongue.state = "inbound";
        }
        else if (frog.tongue.state === "leftoutbound") {
            frog.tongue.state = "leftinbound";
        }
        else {
            frog.tongue.state = "rightinbound";
        }
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (state === "title") {
        state = "instructions";
        soundEffect.loop();
    }
    else if (state === "instructions") {
        state = "gameStart";
    }
    else if (state === "gameOver") {
        state = "title";
        score = 0;
    }
}

function keyPressed(event) {
    if (frog.tongue.state === "idle") {
        if (event.key === "w") {
            moveTongueUp();
            frog.tongue.state = "outbound";
        }
        if (event.key === "a") {
            moveTongueLeft();
            frog.tongue.state = "leftoutbound";
        }
        if (event.key === "d") {
            moveTongueRight();
            frog.tongue.state = "rightoutbound";
        }
    }
}