/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */
function Laser(game, x, y, direction) {
    this.laserRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1055, 180, 18, 50, .1, 2, true, false);
    this.laserUp = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1128, 190, 13, 16, .1, 2, true, false);
    this.laserDiagonal = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1160, 190, 18, 16, .1, 2, true, false);
    this.laserStart = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 882, 180, 16, 50, 2, 2, true, false);
    this.laserBlast = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 908, 180, 16, 50, 2, 2, true, false);

    this.laserLeft = new Animation(ASSET_MANAGER.getAsset("./img/leftLaser.png"), 166, 0, 18, 50, .1, 2, true, false);
    this.laserDiagonalLeft = new Animation(ASSET_MANAGER.getAsset("./img/leftLaser.png"), 68, 0, 18, 50, .1, 2, true, false);

    this.speed = 1000;
    this.direction = direction;
    this.count = 0;
    this.collisionHeight = 15;
    this.collisionWidth = 32;
    this.isGone = false;

    this.x = x;
    this.y = y;
    if (this.direction === "diagonal-right") {
        this.speed = 800;
        this.collisionHeight = 15;
        this.collisionWidth = 15;
        this.collisionX = this.x + 15;
        this.collisionY = this.y + 15;
    } else if (this.direction === "diagonal-left") {
        this.speed = 800;
        this.collisionHeight = 15;
        this.collisionWidth = 15;
        this.collisionX = this.x + 15;
        this.collisionY = this.y + 10;
    } else if (this.direction === "up") { // collision circle
        this.collisionX = this.x + 10;
        this.collisionY = this.y + 10;
        this.collisionHeight = 32;
        this.collisionWidth = 15;
    } else if (this.direction === "right") {
        this.collisionHeight = 15;
        this.collisionWidth = 32;
        this.collisionX = this.x + 20;
        this.collisionY = this.y + 62;
    } else if (this.direction == "left") {
        this.collisionHeight = 15;
        this.collisionWidth = 32;
        this.collisionX = this.x + 30;
        this.collisionY = this.y + 62;
    }

    this.blastDone = false;
    this.startDone = false;

    Entity.call(this, game, x, y, this.collisionX, this.collisionY);
}

Laser.prototype = new Entity();
Laser.prototype.constructor = Laser;

Laser.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Laser.prototype.collisionDetection = function (entity) {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (detectCollision(this, ent) && !ent.isDead && !this.isGone) { // kills entities that the laser collides with
            this.isGone = true;
            ent.health -= 1;
        }
    }
    for (var i = 0; i < this.game.platforms.length; i++) {
        var plat = this.game.platforms[i];
        if (detectCollision(this, plat)) {
            this.removeFromWorld = true;
        }
    }
}

Laser.prototype.update = function () {
    this.collisionDetection();
    if (this.isGone && this.blastDone) {
        this.removeFromWorld = true;
    }
    if (this.blastDone || this.game.running) {
        if (this.direction === "right") {
            this.x += this.game.clockTick * this.speed;
            //if (this.x > 1000) this.removeFromWorld = true;
        } else if (this.direction === "left") {
            this.x -= this.game.clockTick * this.speed;
           // if (this.x < -100) this.removeFromWorld = true;
        } else if (this.direction === "up") {
            this.y -= this.game.clockTick * this.speed;
            //if (this.y < -100) this.removeFromWorld = true;
        } else if (this.direction === "diagonal-right") {
            //if (this.y < -100) this.removeFromWorld = true;
            this.y -= this.game.clockTick * (this.speed);
            this.x += this.game.clockTick * (this.speed);
        } else if (this.direction === "diagonal-left") {
            //if (this.y < -100) this.removeFromWorld = true;
            this.y -= this.game.clockTick * (this.speed);
            this.x -= this.game.clockTick * (this.speed);
        }
    }
    if (this.direction === "diagonal-right") {
        this.collisionX = this.x + 15;
        this.collisionY = this.y + 15;
    } else if (this.direction === "diagonal-left") {
        this.collisionX = this.x + 15;
        this.collisionY = this.y + 10;
    } else if (this.direction === "up") { // collision circle
        this.collisionX = this.x + 10;
        this.collisionY = this.y + 10;
    } else if (this.direction === "right") {
        this.collisionX = this.x + 20;
        this.collisionY = this.y + 62;
    } else if (this.direction == "left") {
        this.collisionX = this.x + 30;
        this.collisionY = this.y + 62;
    }
    Entity.prototype.update.call(this);
}

Laser.prototype.draw = function (ctx, cameraX, cameraY) {

    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    var downOffset = 0;
    var horizOffset = 0;
    if (this.game.down) {
        downOffset = 9; //Created to make blast aligned when Samus is down
    } else if (this.game.running && (this.game.up || this.game.diagonal)) {
        downOffset = -20;
    } else if (this.game.diagonal) {
        downOffset = -20;
        if (this.game.right) {
            horizOffset = -7;
        } else {
            horizOffset = 7;
        }
    } else if (this.game.up) {
        downOffset = -9; //aligning when Samus is up
    } else {
        downOffset = 4;
    }
    if (!this.blastDone && !this.startDone) {
        if (this.count < 2) {
            this.laserStart.drawFrame(this.game.clockTick, ctx, this.x + horizOffset+ cameraX, this.y + downOffset - cameraY, 3);
            this.count++;
        } else {
            this.count = 0;
            this.startDone = true;
        }
    } else if (!this.blastDone) {
        if (this.count < 1) {
            this.laserBlast.drawFrame(this.game.clockTick, ctx, this.x + horizOffset + cameraX, this.y + downOffset - cameraY, 3);
            this.count++;
        } else {
            this.blastDone = true;
        }
    } else {
        if (this.direction === "right") {
            this.laserRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        } else if (this.direction === "left") {
            this.laserLeft.drawFrame(this.game.clockTick, ctx, this.x + 16 + cameraX, this.y - 53 - cameraY, 3);/////////
        } else if (this.direction === "up") {
            this.laserUp.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        } else if (this.direction === "diagonal-right") {
            this.laserDiagonal.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        } else if (this.direction === "diagonal-left") {
            this.laserDiagonalLeft.drawFrame(this.game.clockTick, ctx, this.x + 2 + cameraX, this.y - 87 - cameraY, 3);//////
        }
    }
    
}