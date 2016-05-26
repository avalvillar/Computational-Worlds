/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */
function ship(game, x, y) {
    this.smoking = new Animation(ASSET_MANAGER.getAsset("./img/CrashedShip.png"), 0, 0, 194, 200, .5, 2, true, false);
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 85;
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

ship.prototype = new Entity();
ship.prototype.constructor = ship;

ship.prototype.update = function () {
    Entity.prototype.update.call(this);
}

ship.prototype.draw = function (ctx) {
    this.smoking.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3.5);
    Entity.prototype.draw.call(this);
}

function shipPart(game, x, y) {
    this.smoking = new Animation(ASSET_MANAGER.getAsset("./img/ShipPart.png"), 0, 0, 33.5, 57, .2, 4, true, false);
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 85;
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

shipPart.prototype = new Entity();
shipPart.prototype.constructor = shipPart;

shipPart.prototype.update = function () {
    Entity.prototype.update.call(this);
}

shipPart.prototype.draw = function (ctx, cameraX, cameraY) {
    this.smoking.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
    Entity.prototype.draw.call(this);
}
