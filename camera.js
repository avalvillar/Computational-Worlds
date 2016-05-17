// Camera object code

function Camera(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.samus = game.samus;
    this.x = 0;
    this.y = 0;
    //this.dx = 0;
    //this.dy = 0;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
    this.boundLeft = this.width + 100;
    this.boundRight = this.width - 100; //setting bounds on the screen to where it will move
    this.boundUp = this.height + 50;
    this.boundDown = this.height - 50;
}


Camera.prototype.setXandY = function(x, y) {
    this.x = x;
    this.y = y;
}

Camera.prototype.update = function () {
    this.dx = (this.width / 2) - this.samus.x;
    this.dy = this.samus.y - (this.height / 2);
  /*  if (this.samus.x > this.boundLeft) {
        this.dx += this.samus.velocity.x;
    } else if (this.samus.x < this.boundRight) {
        this.dx -= this.samus.velocity.x;
    } 
    if (this.samus.y < this.boundDown) {
        this.dy += this.samus.velocity.y;
    } else if (this.samus.y > this.samus.velocity.y) {
        this.dy -= this.samus.velocity.y;
    }*/
    this.x = this.dx;
    this.y = this.dy;
    console.log(this.x);
}



