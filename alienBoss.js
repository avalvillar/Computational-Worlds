/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */


var setupAlienBoss = function (game) {
    for (var i = 630; i < 830; i += 70) { // close player in with boss.
        var bigWall = new Platform(game, 10000, i, "cave");
        game.addPlatform(bigWall);
    }
    var boss = new Alien(game, 10750, 700);
    game.addEntity(boss);
}

/*************************************************************************************
    ALIEN
*/
function Alien(game, x, y) {
    // spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.goLeft =
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 594, 25, 142, 93, 0.18, 4, true, true);
    this.goRight =
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 1237, 25, 143, 93, 0.18, 4, true, false);
    this.deathLeft =
    new Animation(ASSET_MANAGER.getAsset("./img/alienDeath.png"), 0, 0, 146, 93, .2, 5, false, true);
    this.deadLeft =
    new Animation(ASSET_MANAGER.getAsset("./img/alienDeath.png"), 0, 0, 146, 93, 1, 1, true, true);
    this.deathRight =
    new Animation(ASSET_MANAGER.getAsset("./img/alienDeath.png"), 895, 0, 146, 93, .2, 5, false, false);
    this.deadRight =
    new Animation(ASSET_MANAGER.getAsset("./img/alienDeath.png"), 1650, 0, 146, 93, 1, 1, true, true);
    this.attackLeft =
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 1650, 0, 146, 93, 1, 1, true, true);



    this.right = false;
    this.speed = 250;
    this.health = 3;
    this.isDead = false;
    this.dying = false;
    this.dyingCount = 0;
    this.damage = 40;
    this.x = x;
    this.y = y;
    this.collisionX = this.x;
    this.collisionY = this.y;

    this.collisionWidth = 163;
    this.collisionHeight = 94;
    this.flip = true;
    this.game = game;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Alien.prototype = new Entity();
Alien.prototype.constructor = Alien;

Alien.prototype.update = function () {
    if (!this.game.startGame) return;
    if (!this.isDead && this.health <= 0) {
        this.isDead = true;
        this.dying = true;
    }
    if (!this.grounded) {
        this.y += this.game.gravity * this.game.clockTick;
    }

    if (this.x < this.game.samus.x) {
        this.right = true;
    } else {
        this.right = false;
    }

    var collideTopDown = false;

    if (this.x < this.leftBound) {
        this.right = true;
    }
    if (this.x > this.rightBound) {
        this.right = false;
    }

    for (var i = 0; i < this.game.platforms.length && !collideTopDown; i++) { // platform detection
        var plat = this.game.platforms[i];

        if (!collideTopDown && collideTop(this, plat)) {
            collideTopDown = true;
            this.ground = plat.collisionY - this.collisionHeight;
            this.grounded = true;
            this.y = this.ground;
        } else {
            this.grounded = false;
        }
    }

    this.collisionX = this.x;
    this.collisionY = this.y;

    Entity.prototype.update.call(this);
}

Alien.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;

    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    if (this.right) {
        if (this.isDead && this.dying) {
            this.deathRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 20, 1.3);
            this.dyingCount++;
            if (this.deathRight.isDone()) {
                this.dying = false;
            }
        } else if (this.isDead) {
            this.deadRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 20, 1.3);
        } else {
            this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.2);
        }
    } else {
        if (this.isDead && this.dying) {
            this.deathLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 20, 1.3);
            this.dyingCount++;
            if (this.deathLeft.isDone()) {
                this.dying = false;
            }
        } else if (this.isDead) {
            this.deadLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 20, 1.3);
        } else {
            this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.2);
        }
    }
}
