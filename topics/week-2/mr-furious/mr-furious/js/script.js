/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

let sky = {
    fill: {
      r: 160,
      g: 180,
      b: 200
    }
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {

  // Change the colour of the sky
  sky.fill.r -= 0.5;
  sky.fill.r = constrain(sky.fill.r, 0, 255);
  sky.fill.g -= 0.5;
  sky.fill.g = constrain(sky.fill.g, 0, 255);
  sky.fill.b -= 0.5;
  sky.fill.b = constrain(sky.fill.b, 0, 255);
  
  // Set the colour of the background
  background(sky.fill.r, sky.fill.g, sky.fill.b);

  // Change the colour of Mr. Furious to red
  mrFurious.fill.g = mrFurious.fill.g - 0.5;
  mrFurious.fill.b = mrFurious.fill.b - 0.5;

  mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
  mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

  // Same thing but on less lines

  // mrFurious.fill.g = constrain(mrFurious.fill.g - 2, 0, 255);
  // mrFurious.fill.b = constrain(mrFurious.fill.b - 2, 0, 255);

  // Make Mr. Furious shake
  const x = mrFurious.x + random(-5, 5);
  const y = mrFurious.y + random(-5, 5);
  

  // Another way of doing it
  // mrFurious.x += random(-5, 5);
  // mrFurious.y += random(-5, 5);


  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(x, y, mrFurious.size);
  pop();
}