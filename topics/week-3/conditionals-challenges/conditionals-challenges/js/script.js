/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const puck = {
  x: 350,
  y: 350,
  size: 100,
  fill: "#ff0000"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
     
  // Move user circle
  moveUser();
  movePuck();
  
  // Draw the user and puck
  drawUser();
  drawPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function movePuck() {
// Check Overlap
const d = dist(user.x, user.y, puck.x, puck.y);
const overlap = (d < user.size/2 + puck.size/2);
if (overlap) {
  // Check distance (magnitude)
  const dx =  user.x - puck.x;
  const dy = user.y - puck.y;
  if (abs(dx) < abs(dy)) {
    // Check relative position
    if (dx < 0) {
      puck.x += 10;
    }
    else if (dx > 0) {
      puck.x -= 10;
    }
  }
  else if (abs(dy) < abs(dx)) {
    if (dy < 0) {
      puck.y += 10;
    }
    else if (dy > 0) {
      puck.y -= 10;
    }
  }
} 
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}