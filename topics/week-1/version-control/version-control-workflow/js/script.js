/**
 * Title of the Project (Git Workflow Example)
 * Your Name (Ethan Armstrong)
 * 
 * Description of the Project: 
 * Some sample code for playing with version control.
 * Draws a pyramid in the centre of the canvas and a
 * red circle at the user's mouse position.
 */

"use strict";

/**
 * Create a canvas, hides the cursor
*/
function setup() {
    // A 640x480 canvas
    createCanvas(400, 400);

    // Don't show the cursor
    noCursor();
}

/**
 * Draws a top-down view of a pyramid and also a red circle
 * at the position of the user's cursor
*/
function draw() {
    // Make the background black (specified as RGB)
    background(100, 100, 100);

    // Draw a pyramid
    // How many levels for the pyramid
    const levels = 50;
    // Loop through every level (backwards)
    for (let level = levels; level > 0; level--) {
        // Draw this layer
        push();
        // Set the grey shade of the level based on its number
        // e.g. level 1 will get a shade of 10 (dark gray), 
        // level 10 will be 255(white)
        const shade = map(level, 1, levels, 10, 255);
        // No line around the levels
        noStroke();
        // Set the fill colour to our shade (RGB)
        fill(shade, shade, 0);
        // Draw rectangles from the centre
        rectMode(CENTER);
        // Draw the rectangle in the centre of the canvas
        // (320, 320) with a size based on the level
        // e.g. level 1 will be a 48x48 rectangle and
        // level 10 will be a 480x480 rectangle
        rect(320, 320, level * 48, level * 48);
        pop();
    }

    // Draw a red circle at the position of the mouse
    push();
    // No line around the shape
    noStroke();
    // Make it red (RGB)
    fill(255, 0, 0);
    // Draw a 100x100 circle at the mouse position
    ellipse(mouseX, mouseY, 100, 100);
    pop();
}