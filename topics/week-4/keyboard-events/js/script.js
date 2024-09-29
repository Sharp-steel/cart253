/**
 * Keyboard Events
 * Pippin Barr
 * 
 * A chance to experiment with keyboard events in a simple setting.
*/

"use strict";

// Our ball
const ball = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 50,
    // fill
    fill: "#ffffff",
    // fills
    fills: {
        white: "#ffffff",
        red: "#ff0000",
        blue: "#0000ff"
    }
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the ball
 */
function draw() {
    background(0);

    // Draw the ball
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}

/**
 * Handle keypress:
 * - r = make the ball red
 * - b = make the ball blue
 */
function keyPressed(event) {
    if (event.key === "r") {
        ball.fill = ball.fills.red;
    }
    else if (event.key === "b") {
        ball.fill = ball.fills.blue;
    }
}

/**
 * Handle keyreleased:
 * - r or b = Set the ball back to default
 */
function keyReleased(event) {
    if (event.key === "r" || event.key === "b") {
        ball.fill = ball.fills.white;
    }
}