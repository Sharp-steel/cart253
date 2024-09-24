/**
 * Art Jam
 * Ethan Armstrong
 * 
 * An interactive thundercloud that changes from a sunny day to a thunderstorm with a lightning bolt.
 */

"use strict";
/**
 * Creating the cloud
 */
let cloud = {
    x: 250,
    y: 100,
    size: 250,
    fill: "#ffffff"
}
/**
 * Creating the thunderbolt
 */
let thunderbolt = {
    x: 250,
    y: 250,
    size: 50,
    width: 50,
    height: 280,
    //Transparent Thunderbolt
    fill: {r: 255, g: 255, b: 0, a: 0}
}
/**
 * Creating the rain
 */
let rain = {
    x: 200,
    y: 200,
    size: 10,
    width: 10,
    height: 60,
    fill: "#0000ff"
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
    //Grey Background
    background(150, 150, 150);
    
    // Changing the colour of the sky
    if (mouseX < width){
        background(200, 200, 255);
    }
    else {
        background(150, 150, 150);
    }
    if (mouseY < height){
        background(200, 200, 255);
    }
    else {
        background(200, 200, 255);
    }
    //Calling the thunderbolt
    drawThunderbolt();
    //Calling the cloud
    drawCloud();
    //Calling the rain
    drawRain();
}

/** 
 * Creating the function for the cloud to show up
*/
function drawCloud () {
    push();
    noStroke();
    fill(cloud.fill);
    ellipse(cloud.x, cloud.y, cloud.size);
    ellipse(cloud.x - cloud.size/2, cloud.y, cloud.size/1.25);
    ellipse(cloud.x + cloud.size/2, cloud.y, cloud.size/1.25);
    pop();
}

/**
 * Creating the function for the thunderbolt to show up
 */
function drawThunderbolt () {
    push();
    noStroke();
    fill(thunderbolt.fill.r, thunderbolt.fill.g, thunderbolt.fill.b, thunderbolt.fill.a);
    rect(thunderbolt.x - 25, thunderbolt.y -30, thunderbolt.size, thunderbolt.height);
    pop();
}

/**
 * Creating the function for the rain to show up
 */
function drawRain () {
    push();
    noStroke();
    fill(rain.fill);
    rect(rain.x - 50, rain.y + 200, rain.size, rain.height);
    rect(rain.x + 215, rain.y + 150, rain.size, rain.height);
    rect(rain.x - 20, rain.y + 40, rain.size, rain.height);
    rect(rain.x - 120, rain.y + 120, rain.size, rain.height);
    rect(rain.x + 160, rain.y + 20, rain.size, rain.height);
    rect(rain.x + 125, rain.y + 175, rain.size, rain.height);
    pop();
}

/**
 * When the mouse is pressed, display thunderbolt
 */
function mousePressed () {
    if (thunderbolt.fill.a === 0) {
        thunderbolt.fill.a = 255;
    }
    else if (thunderbolt.fill.a === 255) {
        thunderbolt.fill.a = 0;
    }
}