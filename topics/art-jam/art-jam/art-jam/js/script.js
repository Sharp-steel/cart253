/**
 * Art Jam
 * Ethan Armstrong
 * 
 * An interactive thundercloud that changes from a sunny day to a thunderstorm with a lightning bolt.
 */

"use strict";

let cloud = {
    x: 250,
    y: 100,
    size: 100,
    fill: "#ffffff"
}

/**
 * Creating the canvas
*/
function setup() {
    createCanvas (500, 500);
    noCursor();
}


/**
 * Creating the scene
*/
function draw() {
    drawCloud();
    background(150, 150, 150);
    
    // Changing the colour of the sky
    if (mouseX < width/4){
        background(200, 200, 255);
    }
    else {
        background(150, 150, 150);
    }
}

function drawCloud () {
    push();
    noStroke();
    ellipse(cloud.x, cloud.y, cloud.size);
    fill(cloud.fill);
    pop();
}