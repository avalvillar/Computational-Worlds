/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */

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
    this.bossfight = false;
    this.bossfightScroll = 0;
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

Camera.prototype.restartBossFight = function () {
    this.dx = -10046.125000000015; //Value found from original setup, a bit odd
    this.x = this.dx;
    this.bossfightScroll = 470;
    this.bossfight = true;
}
Camera.prototype.setBossFight = function () {
    //this.dx =  this.x - 470; //magic value is 470
    //this.x = this.dx;
    this.bossfightScroll = 0;
    this.bossfight = true;
}

Camera.prototype.update = function () {
    if (!this.bossfight) {
        this.dx = (this.width / 2) - this.samus.x;
        this.dy = /*this.samus.y - (this.height / 2);*/0;
    } else if (this.bossfight && this.bossfightScroll < 470) {
        this.dx = (this.width / 2) - this.samus.x - this.bossfightScroll;
        this.dy = 0;
        this.bossfightScroll += (this.game.clockTick * 150);
    } else {
        this.dx = this.x;
        this.dy = 0;
    }
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

    //TODO: add to this logic, if we get to the end of the world. 
    if (this.samus.x <= (this.width / 2)) {
        this.dx = 0;
    }
    if (this.bossfightScroll >= 470) {
        this.game.settingUpBoss = false;
    }
    /*if (this.bossfight && this.x > -10046.125000000015) {
        this.x -= (this.game.timer.clockTick * 10);
        this.dx = this.x;
        console.log("this is stuck");
    }
    if (this.bossfight && this.x <= -10046.125000000015) {
        this.dx = -10046.125000000015;
        this.game.settingUpBoss = false;
        console.log("this message was reached.");
    }*/
    //console.log(this.x);
    this.x = this.dx;
    this.y = this.dy;
    //console.log(this.x);
}



