/**
 * Critters!
 * Ethan Armstrong
 * 
 * A game where you have to avoid contact with the critters at all cost! Or maybe you want to kill all of the critters?
 * Ultimately the decision is up to you!
 *
 * Instructions: 
 * - Move with W, A, S, D
 * - Run away from the critters (or kill them it's up to you how you want to play the game!)
 * - Survive for 30 seconds (or kill 20 critters)
 * 
 * Features:
 * - Start Screen with variations listed
 * - Click on variation you'd like to play
 * - Play 1 of 3 variations (change of event)
 * - 
 * - If you lose or win, go back to start screen (boolean)
 * 
 * Pseudocode:
 * - score = 0
 * - time = 0
 * 
 * - Display title screen (draw function)
 * - Click on variations (function mousePressed)
 * - Play games (event changes)
 * - If win/lose, go back to start screen (boolean)
 * 
 **/

"use strict";

// Sound Effect
let soundEffect = undefined;

// Ant Image
let antImg = undefined;

/**
 * Loads the sound effect
 */
function preload() {
    soundEffect = loadSound("assets/sounds/sneakywalk.wav");
    antImg = loadImage("assets/images/ant1.png");
}

// Current Time for Var. 1
let time = 0;

// Current Score for Var. 2
let score = 0;

// Our guy
let guy = {
    x: 725,
    y: 375,
    size: 50,
    speed: 3,
    velocity: {
        x: 0,
        y: 0
    }
};

// Critters array
let critters = [];

let state = "title";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(1500, 720);
}

/**
 * Draws the elements and the current state on the canvas
*/
function draw() {
    if (state === "title") {
        drawTitle();
    }
    else if (state === "instructions") {
        drawInstructions();
    }
    else if (state === "gameSelect") {
        drawGameSelect();
    }
    else if (state === "var1") {
        drawVar1();
        time++;
    }
    else if (state === "var2") {
        drawVar2();
    }
    else if (state === "var3") {
        drawVar3();
    }
    else if (state === "gameOver") {
        drawGameOver();
    }
}

/**
 * Setting the different game states
 */
function drawTitle() {
    push();
    background("#f27e42");
    textSize(40);
    text("Critters!", 650, 250);
    text("CLICK TO PLAY!", 570, 350);
    pop();
}

function drawInstructions() {
    push();
    background("#f27e42");
    textSize(24);
    text("Instructions:", 660, 200);
    text("Use the keyboard to move your character.", 500, 300);
    text("W for going up, A for going left, S for going down, and D for going right!", 350, 400);
    pop();
}

function drawGameSelect() {
    push();
    noStroke();
    background("#f27e42");
    textSize(24);
    text("Select your Variation!", 630, 150);
    text("EVASION (Press E)", 640, 250);
    text("CONSUMPTION (Press C)", 605, 350);
    text("GROWTH (Press G)", 640, 450);
    pop();
}

function drawVar1() {
    background("#f27e42");
    drawGuy();
    while (critters.length < 5) {
        addCritter();
    }
    console.log(state);
    for (let critter of critters) {
        moveCritter(critter);
        drawCritter(critter);
        checkVar1Overlap(critter);
    };
    drawTimer();
    moveGuy();
    //If survive 30 seconds, the game ends
    if (time === 300) {
        state = "gameOver";
        soundEffect.pause();
    }
    //If you overlap with a critter, the game ends
}

function drawVar2() {
    background("#f27e42");
    drawGuy();
    while (critters.length < 50) {
        addCritter();
    }
    for (let critter of critters) {
        moveCritter(critter);
        drawCritter(critter);
        checkVar2Overlap(critter);
    };
    drawScore();
    moveGuy();
    //If you eat 50 critters, the game ends
    if (score === 50) {
        state = "gameOver";
        soundEffect.pause();
    }
}

function drawVar3() {
    background("#f27e42");
    drawGuy();
    while (critters.length < 5) {
        addCritter();
    }
    for (let critter of critters) {
        moveCritter(critter);
        drawCritter(critter);
        checkVar3Overlap(critter);
    };
    moveGuy();
    //If the guy's size is equal to 800, the game ends
    if (guy.size === 800) {
        state = "gameOver";
        soundEffect.pause();
    }
}

function drawGameOver() {
    push();
    background("#f27e42");
    textSize(48);
    text("GAME OVER!", 575, 250);
    text("Click to go back to the title", 450, 350)
    pop();
}

/**
 * Drawing the guy
 */
function drawGuy() {
    push();
    fill("#ffffff");
    noStroke();
    ellipse(guy.x, guy.y, guy.size);
    pop();
}

/**
 * Moving the guy
 */
function moveGuy() {
    guy.x += guy.velocity.x;
    guy.y += guy.velocity.y;
    guy.x = constrain(guy.x, 0, width);
    guy.y = constrain(guy.y, 0, height);
}

/**
 * Adding a critter to the array
 */
function addCritter() {
    const critter = createCritter();
    critters.push(critter);
}

/**
 * Creating the critters
 */
function createCritter() {
    const critter = {
        x: random(0, width),
        y: random(0, height),
        velocity: {
            x: random(-5, 5),
            y: random(-5, 5),
        },
        size: 10
    };
    return critter;
}

/**
 * Drawing the critters
 */
function drawCritter(critter) {
    push();
    fill("#000000");
    noStroke();
    ellipse(critter.x, critter.y, critter.size);
    pop();
}

/**
 * Moves the critter according to its velocity
 */
function moveCritter(critter) {
    critter.x += critter.velocity.x;
    critter.y += critter.velocity.y;
    if (critter.x <= 0 || critter.x >= width) {
        critter.velocity.x = -critter.velocity.x;
    }
    if (critter.y <= 0 || critter.y >= height) {
        critter.velocity.y = -critter.velocity.y;
    }
}

// Moving the guy up after pressing W
function moveGuyUp() {
    guy.velocity.y = -guy.speed;
}

// Moving the guy left after pressing A
function moveGuyLeft() {
    guy.velocity.x = -guy.speed;
}

// Moving the guy down after pressing S
function moveGuyDown() {
    guy.velocity.y = +guy.speed;
}

// Moving the guy right after pressing D
function moveGuyRight() {
    guy.velocity.x = +guy.speed;
}

/**
 * Display the Score
 */
function drawScore() {
    push();
    fill(0);
    noStroke();
    textSize(48);
    textAlign(RIGHT, BOTTOM);
    text(score, width - 20, 700);
    pop();
}

/**
 * Display the Timer
 */
function drawTimer() {
    push();
    fill(0);
    noStroke();
    textSize(48);
    textAlign(RIGHT, BOTTOM);
    text(floor(time/60), width - 20, 700);
    pop();
}

/**
 * Handles the guy overlapping the critters for Var1
 */
function checkVar1Overlap(critter) {
    // Get distance from guy to critter
    console.log(critter);
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Trigger game over screen
        state = "gameOver";
        soundEffect.pause();
    }
}

/**
 * Handles the guy overlapping the critters for Var2
 */
function checkVar2Overlap(critter) {
    // Get distance from guy to critter
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Increase the score
        score = score + 1;
        const index = critters.indexOf(critter);
        critters.splice(index, 1);
    }
}

/**
 * Handles the guy overlapping the critters for Var3
 */
function checkVar3Overlap(critter) {
    // Get distance from guy to critter
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Increase the guy's size
        guy.size = guy.size + 50;
        const index = critters.indexOf(critter);
        critters.splice(index, 1);
    }
}

/**
 * Switching game states when mouse is pressed
 */
function mousePressed() {
    if (state === "title") {
        state = "instructions";
    }
    else if (state === "instructions") {
        state = "gameSelect";
    }
    else if (state === "gameOver") {
        state = "title";
        score = 0;
        time = 0;
        guy.size = 50;
        guy.x = 725;
        guy.y = 375;
    }
}

/**
 * Game Controls
 */
function keyPressed(event) {
    // Selects variation based on the key pressed
    if (state === "gameSelect") {
        if (event.key === "e" || event.key === "E") {
            state = "var1";
            soundEffect.loop();
        }
        if (event.key === "c" || event.key === "C") {
            state = "var2";
            soundEffect.loop();
        }
        if (event.key === "g" || event.key === "G") {
            state = "var3";
            soundEffect.loop();
        }
    }
    // Keys used to control our guy upon key pressed
    if (state === "var1" || state === "var2" || state === "var3") {
        if (event.key === "w" || event.key === "W") {
            moveGuyUp();
        }
        if (event.key === "a" || event.key === "A") {
            moveGuyLeft();
        }
        if (event.key === "s" || event.key === "S") {
            moveGuyDown();
        }
        if (event.key === "d" || event.key === "D") {
            moveGuyRight();
        }
    }
}

function keyReleased(event) {
    // Keys used to control our guy upon key release
    if (state === "var1" || state === "var2" || state === "var3") {
        if (event.key === "w" || event.key === "W" && guy.velocity.y < 0) {
            guy.velocity.y = 0;
        }
        if (event.key === "a" || event.key === "A" && guy.velocity.x < 0) {
            guy.velocity.x = 0;
        }
        if (event.key === "s" || event.key === "S" && guy.velocity.y > 0) {
            guy.velocity.y = 0;
        }
        if (event.key === "d" || event.key === "D" && guy.velocity.x > 0) {
            guy.velocity.x = 0;
        }
    }
}