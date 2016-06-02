/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 * video - https://youtu.be/s_43VZBxWXk
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
    if (!this.game.startGame) return;
    Entity.prototype.update.call(this);
}

ship.prototype.draw = function (ctx,cameraX, cameraY) {
    if (!this.game.startGame) return;
    this.smoking.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
    Entity.prototype.draw.call(this);
}

function shipPart(game, x, y) {
    this.GlowyThingy = new Animation(ASSET_MANAGER.getAsset("./img/ShipPart.png"), 0, 0, 33.5, 57, .2, 4, true, false);
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
    this.GlowyThingy.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
    Entity.prototype.draw.call(this);
}


function Lava(game, x, y) {
    this.lava = new Animation(ASSET_MANAGER.getAsset("./img/Lava.png"), 28, 0, 325, 165, .1, 8, true, false);
    this.x = x;
    this.y = y;
    this.hitCount = 0;
    this.game = game;
    this.damage = 100;
    this.collisionX = x;
    this.collisionY = y + 30;
    this.collisionWidth = 325;
    this.collisionHeight = 165;
    this.riseCount = 0;
    this.riseMax = 460;
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Lava.prototype = new Entity();
Lava.prototype.constructor = Lava;

Lava.prototype.update = function () {
    if (!this.game.startGame) return;
    if (this.game.bossReset) {
        this.y = 840;
        this.game.bossReset = false;
        this.riseCount = 0;
        this.game.alienBossHit = false;
    }
    if (this.game.alienBossHit && this.riseCount === 0) {
        this.hitCount++;
    }

    if (this.game.alienBossHit && this.riseCount < this.riseMax) {
        if (this.hitCount === 1) {
            this.y--;
            this.riseCount++;
        } else if (this.hitCount >= 2) {
            this.y -= 2;
            this.riseCount += 2;
        } 

    } else if (this.game.alienBossHit && this.riseCount >= this.riseMax) {
        this.game.alienBossHit = false;
    } else if (this.riseCount > 0) {
        this.y++;
        this.riseCount--;
    } else if (this.riseCount === 0) {
        this.game.bossHitOver = true;
    }

    this.collisionX = this.x;
    this.collisionY = this.y + 30;
    Entity.prototype.update.call(this);
}

Lava.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    this.lava.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 2);
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
}