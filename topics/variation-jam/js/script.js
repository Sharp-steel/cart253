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
 * 
 * 
 * 
 **/

// let soundEffect = undefined;

// /**
//  * Loads the sound effect
//  */
// function preload() {
//     soundEffect = loadSound("assets/sounds/.wav");
// }

"use strict";

// Current Time for Var. 1
let time = 0;

// Current Score for Var. 2
let score = 0;

// Our guy
const guy = {
    x: 725,
    y: 375,
    size: 50
};

// Our critters
const critters = {
    x: undefined,
    y: undefined,
    size: 10
}

let state = "title";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(1500, 720);
}

/**
 * Draws the elements on the canvas
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
        drawGuy();
    }
    else if (state === "var2") {
        drawVar2();
        drawGuy();
    }
    else if (state === "var3") {
        drawVar3();
        drawGuy();
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
    text("AVOIDANCE", 675, 250);
    text("CONSUMPTION", 655, 350);
    text("GROWTH", 690, 450);
    pop();
}

function variationPress() {

}

function drawGuy() {
    push();
    noStroke();
    fill("#ffffff");
    ellipse(guy.x, guy.y, guy.size);
    pop();
}

// function drawAvoidanceButton() {
//     // push();
//     // noStroke();
//     // fill("#fff");
//     // rect(675, 225, 140, 30);
//     // text("AVOIDANCE", 675, 250);
//     // pop();
//     push();
//     noStroke();
//     easy.x = width / 6;
//     easy.y = (height / 6) * 5;

//     //Create a hover effect
//     if (mouseIsInsideShape(easy)) {
//         easy.hover = true;
//     } else {
//         easy.hover = false;
//     }
//     if (easy.hover) {
//         fill(easy.fillHover);
//     } else {
//         fill(easy.fill.r, easy.fill.g, easy.fill.b, easy.fill.alpha);
//     }

//     rect(easy.x, easy.y, easy.width, easy.height);

//     //text inside the button.
//     fill(255);
//     textAlign(CENTER, CENTER);
//     textSize(20);
//     text(`Avoidance`, easy.x, easy.y);
//     pop();
// }

// function drawConsumptionButton() {
//     push();
//     noStroke();
//     fill("#fff");
//     rect(655, 325, 180, 30);
//     pop();
// }

// function drawGrowthButton() {
//     push();
//     noStroke();
//     fill("#fff");
//     rect(690, 425, 110, 30);
//     pop();
// }

function drawVar1() {
    push();
    background("#f27e42");
    textSize(24);
    text("Var. 1", 650, 150);
    pop();
}

function drawVar2() {
    push();
    background("#f27e42");
    textSize(24);
    text("Var. 2", 650, 150);
    pop();
}

function drawVar3() {
    push();
    background("#f27e42");
    textSize(24);
    text("Var. 3", 650, 150);
    pop();
}

function drawGameOver() {
    push();
    background("#008000");
    textSize(48);
    text("FROGGY IS FULL!", 120, 200);
    text("GAME OVER!", 170, 300);
    pop();
}

/**
 * Drawing the critters
 */
function drawCritters() {

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
    if (event.key === "w") {
        ;
    }
    else if (event.key === "a") {
        ;
    }
    else if (event.key === "s") {
        ;
    }
    else if (event.key === "d") {
        ;
    }
}
