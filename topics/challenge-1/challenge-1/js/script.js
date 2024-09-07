/**
 * Challenge 1
 * Ethan Armstrong
 * 
 * Here is my attempt at drawing the Italian flag.
 */

"use strict";

/**
 * Setting up the canvas.
*/
function setup() {
    // A nice canvas square to work with
    createCanvas(1000, 640);
}


/**
 * Drawing the Italian Flag.
*/
function draw() {
    // A blue background
    background(0, 100, 255);

    // The green part of the flag
    push();
    fill(0, 100, 0);
    noStroke();
    rect(200, 100, 200, 400)
    pop();

    // The white part of the flag
    push();
    fill(255, 255, 255);
    noStroke();
    rect(400, 100, 200, 400);
    pop();

    // The red part of the flag
    push();
    fill(255, 0, 0);
    noStroke();
    rect(600, 100, 200, 400);
    pop();
}