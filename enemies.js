/// Enemies

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
