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
 * Creating the sun
 */
let sun = {
    x: 430,
    y: 70,
    size: 120,
    fill: "orange"
}

/**
 * Creating the clouds in the sun
 */
let sunnyCloud = {
    x: 250,
    y: 100,
    size: 150,
    fill: "#ffffff"
}

/**
 * Creating the airplane
 */
let airplane = {
    x: 0,
    y: 500,
    size: 50,
    fill: "gray",
    velocity: {
        x: 3,
        y: -1
    },
    minVelocity: {
        x: -3,
        y: -1.5
    },
    maxVelocity: {
        x: 3,
        y: 1.5
    },
    acceleration: {
        x: 0.1,
        y: -0.08
    }    
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
    // When hovering over the canvas, change the weather from sunny to rainy
    const mouseIsOverCanvas = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
    if (mouseIsOverCanvas) {
        rainyDay()
    }
    else {
        sunnyDay()
    }
}

/**
 * Creating the function for the rain to show up
 */
function drawRain () {
    rain.y = map(mouseY, height/4, 7*height/4, 0, height, true);
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
 * Creating the function for the sun to show up
 */
function drawSun () {
    push();
    noStroke();
    fill(sun.fill);
    ellipse(sun.x, sun.y, sun.size);
    pop();
}

/**
 * Creating the function for the sunny clouds to show up
 */
function drawSunnyCloud () {
    push();
    noStroke();
    fill(sunnyCloud.fill);
    //First cloud
    ellipse(sunnyCloud.x - 100, sunnyCloud.y + 25, sunnyCloud.size/1.25);
    ellipse(sunnyCloud.x - sunnyCloud.size/2 - 80, sunnyCloud.y + 25, sunnyCloud.size/1.75);
    ellipse(sunnyCloud.x + sunnyCloud.size/2 - 120, sunnyCloud.y + 25, sunnyCloud.size/1.75);
    //Second cloud
    ellipse(sunnyCloud.x + 20, sunnyCloud.y + 200, sunnyCloud.size);
    ellipse(sunnyCloud.x - sunnyCloud.size/2 + 20, sunnyCloud.y + 200, sunnyCloud.size/1.25);
    ellipse(sunnyCloud.x + sunnyCloud.size/2 + 20, sunnyCloud.y + 200, sunnyCloud.size/1.25);
    //Third cloud
    ellipse(sunnyCloud.x + 140, sunnyCloud.y + 340, sunnyCloud.size/2);
    ellipse(sunnyCloud.x - sunnyCloud.size/2 + 180, sunnyCloud.y + 340, sunnyCloud.size/2.75);
    ellipse(sunnyCloud.x + sunnyCloud.size/2 + 100, sunnyCloud.y + 340, sunnyCloud.size/2.75);
    //Fourth cloud
    ellipse(sunnyCloud.x - 140, sunnyCloud.y + 330, sunnyCloud.size/2);
    ellipse(sunnyCloud.x - sunnyCloud.size/2 - 100, sunnyCloud.y + 330, sunnyCloud.size/2.75);
    ellipse(sunnyCloud.x + sunnyCloud.size/2 - 180, sunnyCloud.y + 330, sunnyCloud.size/2.75);
    pop();
}

/**
 * Creating the function for the airplane to show up
 */
function drawAirplane () {
    push();
    noStroke();
    fill(airplane.fill);
    //Borrowed example code from the Variables in Practice: Movement exercise
    airplane.velocity.x += airplane.acceleration.x;
    airplane.velocity.y += airplane.acceleration.y;
    airplane.velocity.x = constrain(airplane.velocity.x, airplane.minVelocity.x, airplane.maxVelocity.x);
    airplane.velocity.y = constrain(airplane.velocity.y, airplane.minVelocity.y, airplane.maxVelocity.y);
    airplane.x += airplane.velocity.x;
    airplane.y += airplane.velocity.y;
    ellipse(airplane.x, airplane.y, airplane.size);
    triangle(airplane.x, airplane.y + 20, airplane.x, airplane.y - 20, airplane.x - 60, airplane.y);
    triangle(airplane.x, airplane.y - 20, airplane.x, airplane.y + 20, airplane.x + 60, airplane.y);
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

/**
 * When the mouse is released, vanish the thunderbolt
 */
function mouseReleased () {
    if (thunderbolt.fill.a === 255) {
        thunderbolt.fill.a = 0;
    }
    else if (thunderbolt.fill.a === 0) {
        thunderbolt.fill.a = 255;
    }
}

/**
 * Adding the rainy elements
 */
function rainyDay () {
    //Rainy Background
    background(150, 150, 150);
    //Calling the thunderbolt
    drawThunderbolt();
    //Calling the rain
    drawRain();
    //Calling the cloud
    drawCloud();
}

/**
 * Adding the sunny elements
 */
function sunnyDay () {
    //Sunny Background
    background(200, 200, 255);
    //Calling the sun
    drawSun();
    //Calling the smaller clouds
    drawSunnyCloud();
    //Calling the airplane
    drawAirplane();
}