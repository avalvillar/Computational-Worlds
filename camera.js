// Camera object code

function Camera(game, x, y) {
    this.game = game;
    this.ctx = game.ctx;
    this.samus = game.samus;
    this.x = x;
    this.y = y;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
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
    if (this.samus.x > this.boundLeft) {
        this.right += this.samus.velocity.x;
        this.left += this.samus.velocity.x;
    } else if (this.samus.x < this.boundRight) {
        this.right -= this.samus.velocity.x;
        this.left -= this.samus.velocity.x;
    }
    if (this.samus.y > this.boundDown) {
        this.top += this.samus.velocity.y;
        this.bottom += this.samus.velocity.y;
    } else if (this.samus.y < this.samus.velocity.y) {
        this.top -= this.samus.velocity.y;
        this.bottom -= this.samus.velocity.y;
    }
}



