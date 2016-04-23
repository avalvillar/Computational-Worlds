/// Enemies

/*************************************************************************************
	SNAKE
*/

function Snake(game) {
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 48, 48, 48, .1, 4, true, false);

    this.speed = 150;
 
    Entity.call(this, game, 1000, 495);
}

Snake.prototype = new Entity();
Snake.prototype.constructor = Snake;

Snake.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
}

Snake.prototype.draw = function (ctx) {
    this.goLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



/*************************************************************************************
	BAT
*/

function Bat(game) {
    // this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/AlienBatSprites.gif"), 0, 10, 133, 167, .3, 3, true, true);
    // spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/bat.png"), 0, 47, 33, 42, .3, 3, true, false);
    this.speed = 150;
 
    Entity.call(this, game, 1000, 300);
}

Bat.prototype = new Entity();
Bat.prototype.constructor = Snake;

Bat.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
}

Bat.prototype.draw = function (ctx) {
    this.goLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.8);
    Entity.prototype.draw.call(this);
}
