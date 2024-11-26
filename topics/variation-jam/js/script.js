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

/**
 * Loads the sound effect
 */
function preload() {
    soundEffect = loadSound("assets/sounds/sneakywalk.wav");
}

// Current Time for Var. 1
let time = 0;

// Current Score for Var. 2
let score = 0;

// Our guy
const guy = {
    x: 725,
    y: 375,
    size: 50,
    speedX: 3,
    speedY: 3
};

// Our critter
const critter = {
    x: 725,
    y: 400,
    size: 10,
    speedX: 3,
    speedY: 3
}

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
    text("Critters!", 650, 200);
    text("CLICK TO PLAY!", 570, 400);
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
    text("EVASION (Press E)", 675, 250);
    text("CONSUMPTION (Press C)", 655, 350);
    text("GROWTH (Press G)", 690, 450);
    pop();
}

function drawVar1() {
    background("#f27e42");
    drawGuy();
    drawCritter();
    drawTimer();
    checkVar1Overlap();
    moveGuyUp();
    moveGuyDown();
    moveGuyLeft();
    moveGuyRight();
    //If survive 30 seconds, the game ends
    if (time === 30) {
        state = "gameOver";
        soundEffect.pause();
    }
}

function drawVar2() {
    background("#f27e42");
    drawGuy();
    drawCritter();
    drawScore();
    checkVar2Overlap();
    moveGuyUp();
    moveGuyDown();
    moveGuyLeft();
    moveGuyRight();
    //If you eat 50 critters, the game ends
    if (score === 50) {
        state = "gameOver";
        soundEffect.pause();
    }
}

function drawVar3() {
    background("#f27e42");
    drawGuy();
    drawCritter();
    checkVar3Overlap();
    moveGuyUp();
    moveGuyDown();
    moveGuyLeft();
    moveGuyRight();
    //If the guy's size is over 1000, the game ends
    if (guy.size === 1000) {
        state = "gameOver";
        soundEffect.pause();
    }
}

function drawGameOver() {
    push();
    background("#008000");
    textSize(48);
    text("GAME OVER!", 250, 250);
    text("Click to go back to the title", 100, 350)
    pop();
}

/**
 * Drawing the guy
 */
function drawGuy() {
    push();
    noStroke();
    fill("#ffffff");
    ellipse(guy.x, guy.y, guy.size);
    pop();
}

/**
 * Drawing the critters
 */
function drawCritter() {
    push();
    noStroke();
    fill("#000000");
    ellipse(critter.x, critter.y, critter.size);
    pop();
}

// Moving the guy up after pressing W
function moveGuyUp() {

}

// Moving the guy left after pressing A
function moveGuyLeft() {

}

// Moving the guy down after pressing S
function moveGuyDown() {

}

// Moving the guy right after pressing D
function moveGuyRight() {

}

/**
 * Displays the score
 */
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
 * Handles the guy overlapping the critters for Var1
 */
function checkVar1Overlap() {
    // Get distance from guy to critter
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Trigger game over screen
        state = "gameOver";
    }
}

/**
 * Handles the guy overlapping the critters for Var2
 */
function checkVar2Overlap() {
    // Get distance from guy to critter
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Increase the score
        score = score + 1;
    }
}

/**
 * Handles the guy overlapping the critters for Var3
 */
function checkVar3Overlap() {
    // Get distance from guy to critter
    const d = dist(guy.x, guy.y, critter.x, critter.y);
    // Check if it's an overlap
    const eaten = (d < guy.size/2 + critter.size/2);
    if (eaten) {
        // Increase the guy's size
        guy.size = guy.size + 50;
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
    }
}

/**
 * Game Controls
 */
function keyPressed(event) {
    // Selects variation based on the key pressed
    if (state === "gameSelect") {
        if (event.key === "e") {
            state = "var1";
            soundEffect.loop();
        }
        if (event.key === "c") {
            state = "var2";
            soundEffect.loop();
        }
        if (event.key === "g") {
            state = "var3";
            soundEffect.loop();
        }
    }
    // Keys used to control our guy
    if (state === "var1" || state === "var2" || state === "var3") {
        if (event.key === "w") {
            moveGuyUp();
        }
        if (event.key === "a") {
            moveGuyLeft();
        }
        if (event.key === "s") {
            moveGuyDown();
        }
        if (event.key === "d") {
            moveGuyRight();
        }
    }
}
