/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 30;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFillR = 255;
var playerFillG = 0;
var playerFillB = 255;
// Player image
var playerImage;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 30;
var preyVX;
var preyVY;
var tx = 0;
var ty = 0;
var preyMaxSpeed = 4;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Prey image
var preyImage;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;
// lvl up random number
var lvlup;
// Background image
var bg;

//preload images
function preload() {
  playerImage = loadImage("assets/images/M.png");
  preyImage = loadImage("assets/images/H.png");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  bg = loadImage("assets/images/P.jpg");
  createCanvas(900,680);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(0,0,0);

  if (!gameOver) {
    tint(255);
    background(bg);
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    lvl();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //Sprint feature
  if(keyIsDown(SHIFT)){
    playerVX *= 2;
    playerVY *= 2;
    playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Change color
      playerFillR = random (100,255);
      playerFillG = random (100,255);
      playerFillB = random (100,255);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
      // increase prey max speed at every lvl
      preyMaxSpeed++
      lvlup = Math.floor(Math.random()*7);
      // reduce prey max preyMaxSpeed
      if (lvlup == 0){
        preyMaxSpeed--;
      }
      //increase player radius
      if (lvlup == 1){
        playerRadius++;
      }
      //increase player playerMaxSpeed
      if (lvlup == 2){
        playerMaxSpeed++;
      }
      //increase player max health
      if (lvlup == 3){
        playerMaxHealth++;
      }
      //redude prey preyRadius
      if (lvlup == 4){
        preyRadius--;
      }
      // increase the eatHealth
      if (lvlup == 5){
        eatHealth++;
      }
      // reduse prey max health
      if (lvlup == 6){
        preyMaxHealth--;
      }
    }
  }
}

function lvl(){
  // Prepare our typography
  textFont("Helvetica");
  textSize(20);
  textAlign(CENTER,CENTER);
  noStroke();
  fill(255,255,255);
  // Tell them they won!
  if (lvlup == 0){
    text("LVL: "+preyEaten+" HUMANS RUN SLOWER!",width/2,height/1.1);
  }
  //increase player radius
  if (lvlup == 1){
    text("LVL: "+preyEaten+" YOU'RE BIGGER!",width/2,height/1.1);
  }
  //increase player playerMaxSpeed
  if (lvlup == 2){
    text("LVL: "+preyEaten+" YOU GO FASTER!",width/2,height/1.1);
  }
  //increase player max health
  if (lvlup == 3){
    text("LVL: "+preyEaten+" YOU HAVE MORE HEALTH!",width/2,height/1.1);
  }
  //redude prey preyRadius
  if (lvlup == 4){
    text("LVL: "+preyEaten+" HUMANS ARE SMALLER!",width/2,height/1.1);
  }
  // increase the eatHealth
  if (lvlup == 5){
    text("LVL: "+preyEaten+" YOU EAT FASTER!",width/2,height/1.1);
  }
  // reduse prey max health
  if (lvlup == 6){
    text("LVL: "+preyEaten+" HUMANS HAVE LESS BLOOD!",width/2,height/1.1);
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {


  //use the map to convert the 0 to 1 value of noise to actual prey speed
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;
  tx += 0.01;
  ty += 0.05;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  //fill(255, 0, 0, preyHealth*1.5);
  //ellipse(preyX,preyY,preyRadius*2);
  tint(255,preyHealth*2);
  image(preyImage, preyX, preyY, preyRadius*2, preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  //fill(playerFillR, playerFillG, playerFillB, playerHealth);
  //ellipse(playerX,playerY,playerRadius*2);
  tint(255,playerHealth*2);
  image(playerImage, playerX, playerY, playerRadius*2, playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You've bitten " + preyEaten + " humans\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
