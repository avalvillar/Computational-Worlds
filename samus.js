function distance(a, b) {
    var difX = a.collisionX - b.collisionX;
    var difY = a.collisionY - b.collisionY;
    return Math.sqrt(difX * difX + difY * difY);
};

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
    this.radius = 15;
    this.x = x;
    this.y = y;
    if (this.direction === "diagonal-right") { // collision circle
        this.collisionX = this.x + 25;
        this.collisionY = this.y + 20;
    } else if (this.direction === "diagonal-left") {
        this.collisionX = this.x + 25;
        this.collisionY = this.y + 20;
    } else if (this.direction === "up") { 
        this.collisionX = this.x + 20;
        this.collisionY = this.y + 25;
    } else {
        this.collisionX = this.x + 40;
        this.collisionY = this.y + 70;
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
        if (this.collide(ent)) { // kills entities that the laser collides with
            this.removeFromWorld = true;
            ent.removeFromWorld = true;
        }
    }
}

Laser.prototype.update = function () {
    this.collisionDetection();
    if (this.blastDone || this.game.running) {
        if (this.direction === "right") {
            this.x += this.game.clockTick * this.speed;
            if (this.x > 1000) this.removeFromWorld = true;
        } else if (this.direction === "left") {
            this.x -= this.game.clockTick * this.speed;
            if (this.x < -100) this.removeFromWorld = true;
        } else if (this.direction === "up") {
            this.y -= this.game.clockTick * this.speed;
            if (this.y < -100) this.removeFromWorld = true;
        } else if (this.direction === "diagonal-right") {
            if (this.y < -100) this.removeFromWorld = true;
            this.y -= this.game.clockTick * (this.speed);
            this.x += this.game.clockTick * (this.speed);
        } else if (this.direction === "diagonal-left") {
            if (this.y < -100) this.removeFromWorld = true;
            this.y -= this.game.clockTick * (this.speed);
            this.x -= this.game.clockTick * (this.speed);
        }
    }
    if (this.direction === "diagonal-right") {
        this.collisionX = this.x + 25;
        this.collisionY = this.y + 20;
    } else if (this.direction === "diagonal-left") {
        this.collisionX = this.x + 25;
        this.collisionY = this.y + 20;
    } else if (this.direction === "up") { // collision circle
        this.collisionX = this.x + 20;
        this.collisionY = this.y + 25;
    } else {
        this.collisionX = this.x + 40;
        this.collisionY = this.y + 70;
    }
    Entity.prototype.update.call(this);
}

Laser.prototype.draw = function (ctx) {
    
    var downOffset = 0;
    if (this.game.down) {
        downOffset = 9; //Created to make blast aligned when Samus is down
    } else if (this.game.running && this.game.up) {
        downOffset = -20;
    } else if (this.game.up) {
        downOffset = -9; //aligning when Samus is up
    } else {
        downOffset = 4;
    }
    if (!this.blastDone && !this.startDone) {
        if (this.count < 2) {
            this.laserStart.drawFrame(this.game.clockTick, ctx, this.x, this.y + downOffset, 3);
            this.count++;
        } else {
            this.count = 0;
            this.startDone = true;
        }
    } else if (!this.blastDone) {
        if (this.count < 1) {
            this.laserBlast.drawFrame(this.game.clockTick, ctx, this.x, this.y + downOffset, 3);
            this.count++;
        } else {
            this.blastDone = true;
        }
    } else {
        if (this.direction === "right") {
            this.laserRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else if (this.direction === "left") {
            this.laserLeft.drawFrame(this.game.clockTick, ctx, this.x+16, this.y-53, 3);/////////
        } else if (this.direction === "up") {
            this.laserUp.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else if (this.direction === "diagonal-right") {
            this.laserDiagonal.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else if (this.direction === "diagonal-left") {
            this.laserDiagonalLeft.drawFrame(this.game.clockTick, ctx, this.x+2, this.y-87, 3);//////
        }
    }
    Entity.prototype.draw.call(this);
}

function test(game, x, y) {
    this.laserDiagonal = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1160, 190, 18, 16, .1, 2, true, false);
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 85;
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

test.prototype = new Entity();
test.prototype.constructor = test;

test.prototype.update = function () {
    Entity.prototype.update.call(this);
}

test.prototype.draw = function (ctx) {
    this.laserDiagonal.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    Entity.prototype.draw.call(this);
}

function Samus(game, x, y) {//add count for turns instead of boolean so we can display a few frames with turning....
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 387, 55, 40, 50, .8, 2, true, false);
    this.runningRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 431, 300, 43, 50, .1, 10, true, false);
    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 980, 0, 33.8, 55, .07, 8, false, false);
    this.turnRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 300, 55, 40, 55, 1, 1, false, false);
    this.downRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 120, 180, 40, 55, 1, 1, true, false);
    this.downRightTurn = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 80, 180, 40, 55, 1, 1, false, false);
    this.upRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 725, 170, 32, 70, .8, 2, true, false);
    this.runningRightUp = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 425, 360, 43.5, 50, 0.1, 10, true, false);


    this.idleLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 142, 55, 39, 50, .8, 2, true, true);
    this.runningLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 300, 42.1, 50, .1, 10, true, false);
    this.jumpLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 733.1, 0, 31.5, 55, .07, 8, false, false);
    this.turnLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 260, 55, 40, 55, 1, 1, false, false);
    this.downLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 180, 40, 55, 1, 1, true, false);
    this.downLeftTurn = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 40, 180, 40, 55, 1, 1, false, false);
    this.upLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 484, 170, 41, 70, 1, 2, true, false);
    this.runningLeftUp = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1, 360, 42.5, 50, .1, 10, true, false);

    this.running = false;
    this.lastDirection = "right";
    this.radius = 58;
    this.ground = 400;
    this.speed = 550;
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 85;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Samus.prototype = new Entity();
Samus.prototype.constructor = Samus;

Samus.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Samus.prototype.chooseLaser = function() {
    if (this.shoot && !this.jumping) {//spawns laser blasts
        if (this.game.right) {//shoot right
            if (this.game.down) {
                var laser = new Laser(this.game, this.x + 66, this.y + 34, "right");
                this.game.addLaser(laser);
            } else if (this.game.running && this.game.up) {
                var laser = new Laser(this.game, this.x + 80, this.y + 25, "diagonal-right");
                this.game.addLaser(laser);
            } else if (this.game.running) {
                var laser = new Laser(this.game, this.x + 80, this.y - 10, "right");
                this.game.addLaser(laser);
            } else if (this.game.up) {
                var laser = new Laser(this.game, this.x + 32, this.y - 44, "up");
                this.game.addLaser(laser);
            } else {
                var laser = new Laser(this.game, this.x + 68, this.y + 11, "right");
                this.game.addLaser(laser);
            }
        } else if (!this.game.right) {//shoot left

            if (this.game.down) {
                var laser = new Laser(this.game, this.x, this.y + 34, "left");
                this.game.addLaser(laser);
            } else if (this.game.running && this.game.up) {
                var laser = new Laser(this.game, this.x + 66, this.y + 34, "diagonal-left");
                this.game.addLaser(laser);
            } else if (this.game.running) {
                var laser = new Laser(this.game, this.x, this.y - 10, "left");
                this.game.addLaser(laser);
            } else if (this.game.up) {
                var laser = new Laser(this.game, this.x + 48, this.y - 44, "up");
                this.game.addLaser(laser);
            } else {
                var laser = new Laser(this.game, this.x, this.y + 10, "left");
                this.game.addLaser(laser);
            }
        }
        this.shoot = false;
    } else {
        this.shoot = false;
    }
}

Samus.prototype.jump = function () {
    if (this.jumping) {
        if (this.jumpRight.isDone() || this.jumpLeft.isDone()) {
            this.jumpRight.elapsedTime = 0;
            this.jumpLeft.elapsedTime = 0;
            this.jumping = false;
        }
        if (this.game.right) {//jump right
            if (this.jumpLeft.elapsedTime > 0) {//enables player to switch directions while jumping
                this.jumpRight.elapsedTime += this.jumpLeft.elapsedTime;
                this.jumpLeft.elapsedTime = 0;
            }
            var jumpDistance = (this.jumpRight.elapsedTime) / this.jumpRight.totalTime;
        } else {//jump left
            if (this.jumpRight.elapsedTime > 0) {
                this.jumpLeft.elapsedTime += this.jumpRight.elapsedTime;
                this.jumpRight.elapsedTime = 0;
            }
            var jumpDistance = (this.jumpLeft.elapsedTime) / this.jumpLeft.totalTime;
        }
        var totalHeight = 200;

        if (jumpDistance > 0.5) {
            jumpDistance = 1 - jumpDistance;
        }
        var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
}

Samus.prototype.collisionDetection = function () {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this.collide(ent)) {

            //var dist = distance(this, ent);
            //var delta = this.radius + ent.radius - dist;
            //var difX = (this.collisionX - ent.collisionX) / dist;
            //var difY = (this.collisionY - ent.collisionY) / dist;

            //this.x += difX * delta / 2;
            //this.y += difY * delta / 2;
            //ent.x -= difX * delta / 2;
            //ent.y -= difY * delta / 2;
        }
    }
}

Samus.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.game.shooting) this.shoot = true;
    if (this.game.up) {
        this.up = true;
    } else {
        this.up = false;
    }
    if (this.game.running) this.running = true;

    this.chooseLaser(); // fires laser blasts

    this.jump(); // performs jump logic

    this.collisionDetection(); // performs collision detection and handling.

    if (this.running) {
        if (!this.game.running) {
            this.running = false;
        } else {
            if (this.game.right) {
                this.x += this.game.clockTick * this.speed;
                if (this.x > 1000) this.x = -100;
            } else if (!this.game.right) {
                this.x -= this.game.clockTick * this.speed;
                if (this.x < -100) this.x = 1000;
            }
        }
    }
    if (this.game.right) { // move collision box
        if (this.running) {
            this.collisionX = this.x + 50;
            this.collisionY = this.y + 70;
        } else if (this.jumping) { // collision box while jumping
            this.collisionX = this.x + 70;
            this.collisionY = this.y + 60;
        } else {
            this.collisionX = this.x + 43;
            this.collisionY = this.y + 92;
        }
    } else {
        if (this.running) {
            this.collisionX = this.x + 80;
            this.collisionY = this.y + 70;
        } else if (this.jumping) { // collision box while jumping
            this.collisionX = this.x + 50;
            this.collisionY = this.y + 60;
        } else {
            this.collisionX = this.x + 80;
            this.collisionY = this.y + 95;
        }
    }
    
    Entity.prototype.update.call(this);
}

Samus.prototype.draw = function (ctx) {
    if (this.game.right) {//draw right facing sprites
        if (this.jumping) { // right jumping
            this.jumpRight.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 3);
        } else if (this.game.down) { // down right
            if (this.lastDirection === "left") {
                this.downRightTurn.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
                this.lastDirection = "right";
            } else {
                this.downRight.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
            }
        } else if (this.up && this.running) { // diagonal right up
            this.runningRightUp.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else if (this.up) { // up right
            this.upRight.drawFrame(this.game.clockTick, ctx, this.x, this.y - 6, 3);
        } else if (this.running) { // running right
            if (this.lastDirection === "left") { // turn animation
                this.turnRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
                this.lastDirection = "right";
            } else {
                this.runningRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
            }
        } else {
            this.idleRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    } else if (!this.game.right) {//draw left facing sprites
        if (this.jumping) { // left jumping
            this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 3);
        } else if (this.game.down) { // down left
            if (this.lastDirection === "right") {
                this.downLeftTurn.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
                this.lastDirection = "left";
            }
            this.downLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
        } else if (this.up && this.running) { // diagonal right up
            this.runningLeftUp.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else if (this.up) { // up left
            this.upLeft.drawFrame(this.game.clockTick, ctx, this.x + 23, this.y - 6, 3);

        } else if (this.running) {
            if (this.lastDirection === "right") {
                this.turnLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
                this.lastDirection = "left";
            } else {
                this.runningLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
            }
        } else {
            this.idleLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    }
    Entity.prototype.draw.call(this);
}