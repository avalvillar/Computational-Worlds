function Laser(game, x, y, direction) {
    this.laserRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1055, 180, 18, 50, .1, 2, true, false);
    //this.laserLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1055, 180, 18, 50, .1, 2, true, false);
    this.laserStart = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 882, 180, 16, 50, 2, 2, true, false);
    this.laserBlast = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 908, 180, 16, 50, 2, 2, true, false);

    this.speed = 1000;
    this.direction = direction;
    this.count = 0;
    this.blastDone = false;
    this.startDone = false;

    //laserLeft = null;

    Entity.call(this, game, x, y);
}

Laser.prototype = new Entity();
Laser.prototype.constructor = Laser;

Laser.prototype.update = function () {
    var that = this;
    if (this.blastDone) {
        if (that.direction === "right") {
            console.log("helloR");
            this.x += this.game.clockTick * this.speed;
            if (this.x > 800) this.removeFromWorld = true;
        } else if (that.direction === "left") {
            console.log("hello");
            this.x -= this.game.clockTick * this.speed;
            console.log(this.x);
            if (this.x < -100) this.removeFromWorld = true;
        }
    }
    Entity.prototype.update.call(this);
}

Laser.prototype.draw = function (ctx) {
    if (!this.blastDone && !this.startDone) {
        if (this.count < 8) {
            this.laserStart.drawFrame(this.game.clockTick, ctx, this.x, this.y + 4, 3);
            this.count++;
        } else {
            this.count = 0;
            this.startDone = true;
        }
    } else if (!this.blastDone) {
        if (this.count < 3) {
            this.laserBlast.drawFrame(this.game.clockTick, ctx, this.x, this.y + 4, 3);
            this.count++;
        } else {
            this.blastDone = true;
        }
    } else if (this.direction = "right") {
        this.laserRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    } else if (this.direction = "left") {
        this.laserRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, -3);
    }
    Entity.prototype.draw.call(this);
}

function Samus(game) {//add count for turns instead of boolean so we can display a few frames with turning....
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 387, 55, 40, 50, .8, 2, true, false);
    this.runningRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 431, 300, 43, 50, .1, 10, true, false);
    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 980, 0, 33.8, 55, .07, 8, false, false);
    this.turnRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 300, 55, 40, 55, 1, 1, false, false);
    this.downRight = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 120, 180, 40, 55, 1, 1, true, false);
    this.downRightTurn = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 80, 180, 40, 55, 1, 1, false, false);

    this.idleLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 142, 55, 39, 50, .8, 2, true, true);
    this.runningLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 300, 42.1, 50, .1, 10, true, false);
    this.jumpLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 733.1, 0, 31.5, 55, .07, 8, false, false);
    this.turnLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 260, 55, 40, 55, 1, 1, false, false);
    this.downLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 180, 40, 55, 1, 1, true, false);
    this.downLeftTurn = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 40, 180, 40, 55, 1, 1, false, false);

    this.running = false;
    this.lastDirection = "right";
    this.radius = 100;
    this.ground = 400;
    this.speed = 550;
    Entity.call(this, game, 300, 400);
}

Samus.prototype = new Entity();
Samus.prototype.constructor = Samus;

Samus.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.game.shooting) this.shoot = true;
    if (this.game.running) {
        this.running = true;
    }
    if (this.shoot && !this.jumping) {//spawns laser blasts
        if (this.game.right) {//shoot right
            if (this.game.down) {
                var laser = new Laser(this.game, this.x + 66, this.y + 40, "right");
                this.game.addEntity(laser);
            } else {
                var laser = new Laser(this.game, this.x + 63, this.y + 10, "right");
                this.game.addEntity(laser);
            }
            //this.shoot = false;
        } else if (!this.game.right) {//shoot left

            if (this.game.down) {
                var laser = new Laser(this.game, this.x, this.y + 40, "left");
                this.game.addEntity(laser);
            } else {
                var laser = new Laser(this.game, this.x, this.y + 10, "left");
                this.game.addEntity(laser);
            }
            //this.shoot = false;
        }
        this.shoot = false;
    } else {
        this.shoot = false;
    }
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
    if (this.running) {
        if (!this.game.running) {
            this.running = false;
        }
        if (this.game.right) {
            this.x += this.game.clockTick * this.speed;
            if (this.x > 800) this.x = -100;
        } else if (!this.game.right) {
            this.x -= this.game.clockTick * this.speed;
            if (this.x < -100) this.x = 800;
        }
    }
    Entity.prototype.update.call(this);
}

Samus.prototype.draw = function (ctx) {
    if (this.game.right) {//draw right facing sprites
        if (this.jumping) {
            this.jumpRight.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 3);
        } else if (this.game.down) {
            if (this.lastDirection === "left") {
                this.downRightTurn.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
                this.lastDirection = "right";
            } else {
                this.downRight.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
            }
        } else if (this.running) {
            if (this.lastDirection === "left") {
                this.turnRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
                this.lastDirection = "right";
            } else {
                this.runningRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
            }
        } else {
            this.idleRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    } else if (!this.game.right) {//draw left facing sprites
        if (this.jumping) {
            this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 3);
        } else if (this.game.down) {
            if (this.lastDirection === "right") {
                this.downLeftTurn.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
                this.lastDirection = "left";
            }
            this.downLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
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