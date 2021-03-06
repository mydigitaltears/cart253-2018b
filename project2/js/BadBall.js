////// NEW //////
// BadBall

// BadBall constructor
//
// Sets the properties with the provided arguments
function BadBall(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
BadBall.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    // while loop so the ball doesn't go straight up
    while(Math.abs(this.vx)<0.5){
      // vx go random from -2 to 2 so the ball can go behind
      this.vx = this.vx*random(-2,2)
    }
    // this is to put some kind of random bounce on the badballs without it going go fast or too slow
    if (Math.abs(this.vy) < 1 ){
      this.vy = -this.vy*random(2,3);
      console.log(this.vy+"f1");
    }
    else if (Math.abs(this.vy) > 2){
      this.vy = -this.vy*random(0.2,0.5);
      console.log(this.vy+"f2");
    }
    else {
      this.vy = -this.vy*random(0.5,1.5);
      console.log(this.vy+"f3");
    }
  }
}


// isOffScreen()
//
// Checks if the Badball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
BadBall.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  // when the badball is off screen it goes to the other side
  if (this.x + this.size < 0) {
    this.x = width;
  }
  else if (this.x > width){
    this.x = 0;
  }
}

// display()
//
// Draw the Badball as a rectangle on the screen
BadBall.prototype.display = function () {
  fill(255,0,0);
  ellipse(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this Badball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
// I puted a boolean trigger for the collision so it works like the ballOffscreen function
BadBall.prototype.handleCollision = function(paddle) {
  // Check if the Badball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the Badball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move Badball back to previous position (by subtracting current velocity)
      return true;
    }
  }
  else {
    return false;
  }
}

// middle wall collision so the badball bounce on the middle wall
BadBall.prototype.middleWallCollision = function(middlewall) {
  if (this.x + this.size > middlewall.x && this.x < middlewall.x + middlewall.w) {
    // Check if the Badball overlaps the paddle on y axis
    if (this.y + this.size > middlewall.y && this.y < middlewall.y + middlewall.h) {
      this.x -= this.vx;
      this.y -= this.vy;
      this.vx = -this.vx;
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
BadBall.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  // reset vx speed
  this.speed = -this.speed;
  this.vx = this.speed;
}
////// END NEW //////
