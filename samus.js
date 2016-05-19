function distance(a, b) {
    var difX = a.collisionX - b.collisionX;
    var difY = a.collisionY - b.collisionY;
    return Math.sqrt(difX * difX + difY * difY);
};

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
    this.speed = 550;
    this.x = x;
    this.y = y;
    this.laserCooldown = 20;
    this.laserTimer = 0;
    this.velocity = { x: 0, y: 0 };
    this.collisionHeight = 105;
    this.collisionWidth = 70;
    this.ground = this.y;
    this.grounded = false;
    this.collisionX = this.x + 150;
    this.collisionY = this.y + 150;
    this.jumpCount = 0;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Samus.prototype = new Entity();
Samus.prototype.constructor = Samus;

Samus.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Samus.prototype.chooseLaser = function() {
    if (this.shoot && !this.jumping && this.laserTimer >= this.laserCooldown) { // spawns laser blasts
        this.laserTimer = 0;
        if (this.game.right) { // shoot right
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
        if (this.jumpRight.elapsedTime === 0 && this.jumpLeft.elapsedTime === 0) {
            this.ground = this.y;
        }
        this.grounded = false;
        if (this.jumpRight.isDone() || this.jumpLeft.isDone()) {
            this.jumpRight.elapsedTime = 0;
            this.jumpLeft.elapsedTime = 0;
            this.jumping = false;
        }
        if (this.game.right) { // jump right
            if (this.jumpLeft.elapsedTime > 0) { // enables player to switch directions while jumping
                this.jumpRight.elapsedTime += this.jumpLeft.elapsedTime;
                this.jumpLeft.elapsedTime = 0;
            }
            var jumpDistance = (this.jumpRight.elapsedTime) / this.jumpRight.totalTime;
        } else { // jump left
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
        //this.velocityY = this.ground - totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance)) - 15;
        this.y = this.ground - height - 15;
        //this.velocity.y = this.ground - height - 15;

    }
}

Samus.prototype.collisionDetection = function () {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (Math.abs(this.x - ent.x) < 400 && this.collide(ent)) {

        }
    }

}

Samus.prototype.platformCollision = function () {
    var isColliding = false;
    var collideTopDown = false;
    var collideSide = false;
    for (var i = 0; i < this.game.platforms.length && (!collideTopDown || !collideSide); i++) { // platform detection
        var plat = this.game.platforms[i];
        if (Math.abs(this.collisionX - plat.collisionX) < 100 && Math.abs(this.collisionY - plat.collisionY) < 150) {

            if (!collideTopDown && collideTop(this, plat)) {
                //console.log("hit top");
                collideTopDown = true;
                isColliding = true;
                this.jumpCount = 0;
                //this.ground = this.y;
                this.ground = plat.collisionY - 140; // for some reason 140 just works...

                this.grounded = true;
                this.y = this.ground;
                if (this.jumping && (this.jumpRight.elapsedTime > 1 || this.jumpLeft.elapsedTime > 1)) {

                    this.jumpRight.elapsedTime = 0;
                    this.jumpLeft.elapsedTime = 0;
                    this.jumping = false;
                    collidingTopDown = false;
                    //this.y = plat.collisionY - 105;
                    //this.ground = this.y;
                }
            }
            if (!collideTopDown && collideBottom(this, plat)) {
                //console.log("hit bottom :( ");
                this.grounded = false;
                collideTopDown = true;
                //this.y = plat.collisionY + plat.collisionHeight;
                //this.ground = this.y;
                this.ground = plat.collisionY;
                if (this.jumping) {
                    this.jumping = false;
                    this.jumpRight.elapsedTime = 0;
                    this.jumpLeft.elapsedTime = 0;
                    //this.y = plat.collisionY + plat.collisionHeight;
                    this.velocity.y = 0;
                }
            }
            if (!collideSide && collideRight(this, plat) && (this.velocity.x < 0 || this.jumping)) {
                //console.log("hit right");
                this.x = plat.collisionX + plat.collisionWidth - 30;
                this.velocity.x = 0;
                collideSide = true;
                if (this.jumping) {
                    this.jumping = false;
                    this.jumpRight.elapsedTime = 0;
                    this.jumpLeft.elapsedTime = 0;
                }
            }
            if (!collideSide && collideLeft(this, plat) && (this.velocity.x > 0 || this.jumping)) {
                //console.log("hit left");
                this.x = plat.collisionX - this.collisionWidth - 30;
                this.velocity.x = 0;
                collideSide = true;
                if (this.jumping) {
                    this.jumping = false;
                    this.jumpRight.elapsedTime = 0;
                    this.jumpLeft.elapsedTime = 0;
                }
            }
        }
    }

    if ((!this.grounded || !isColliding) && !this.jumping) {
        this.velocity.y = this.game.clockTick * this.game.gravity;
        //this.ground = this.y + this.velocity;
    } else {
        this.velocity.y = 0;
    }
}

Samus.prototype.update = function () {
    if (!this.game.startGame) return;
    this.laserTimer++;
    
    if (this.game.space && this.jumpCount === 0) {
        this.jumping = true;
    }
    if (this.jumping && !this.grounded) {
        this.jumpCount = 1;
    }
    if (this.game.shooting) this.shoot = true;
    if (this.game.up) {
        this.up = true;
    } else {
        this.up = false;
    }
    if (this.game.running) this.running = true;

    
    this.platformCollision(); // performs platform collision handling
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.velocity.y > 0 && !this.jumping) {
        this.ground.y = this.y;
    }

    this.chooseLaser(); // fires laser blasts

    this.jump(); // performs jump logic

    this.collisionDetection(); // performs collision with enemy detection and handling.

    if (this.running) {
        if (!this.game.running) {
            this.running = false;
        } else {
            if (this.game.right) {
                if (this.grounded || this.jumping) {
                    this.velocity.x = this.game.clockTick * this.speed;
                } else {
                    this.velocity.x = this.game.clockTick * this.speed / 2;
                } 
            } else if (!this.game.right) {
                if (this.grounded || this.jumping) {
                    this.velocity.x = -(this.game.clockTick * this.speed);
                } else {
                    this.velocity.x = -(this.game.clockTick * this.speed / 2);
                }
            }
        }
    } else {
        this.velocity.x = 0;
    }
    if (this.game.right) { // move collision box
        if (this.jumping) {
            this.collisionX = this.x + 25;
            this.collisionY = this.y + 20;
            this.collisionHeight = 75;
            this.collisionWidth = 60;//85
        } else if (this.running) {
            this.collisionHeight = 105;
            this.collisionWidth = 85;
            this.collisionX = this.x + 30;
            this.collisionY = this.y + 35;
        } else if (this.game.down) {
            this.collisionHeight = 80;
            this.collisionWidth = 80;
            this.collisionX = this.x + 10;
            this.collisionY = this.y + 60;
        } else {
            this.collisionHeight = 105;
            this.collisionWidth = 60;
            this.collisionX = this.x + 12;
            this.collisionY = this.y + 35;
        }
    } else {
        if (this.jumping) {
            this.collisionX = this.x + 40;
            this.collisionY = this.y + 20;
            this.collisionHeight = 75;
            this.collisionWidth = 60;//85
        } else if (this.running) {
            this.collisionHeight = 105;
            this.collisionWidth = 85;
            this.collisionX = this.x + 30;
            this.collisionY = this.y + 35;
        } else if (this.game.down) {
            this.collisionHeight = 80;
            this.collisionWidth = 80;
            this.collisionX = this.x + 30;
            this.collisionY = this.y + 60;
        } else {
            this.collisionHeight = 105;
            this.collisionWidth = 60;
            this.collisionX = this.x + 55;
            this.collisionY = this.y + 35;
        }
    }
    
    Entity.prototype.update.call(this);
}

Samus.prototype.draw = function (ctx) {
    if (!this.game.startGame) return;
    if (this.game.right) { // draw right facing sprites
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
            this.runningRightUp.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
        } else if (this.up) { // up right
            this.upRight.drawFrame(this.game.clockTick, ctx, this.x, this.y - 6, 3);
        } else if (this.running) { // running right
            if (this.lastDirection === "left") { // turn animation
                this.turnRight.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
                this.lastDirection = "right";
            } else {
                this.runningRight.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
            }
        } else {
            this.idleRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    } else if (!this.game.right) { // draw left facing sprites
        if (this.jumping) { // left jumping
            this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34, 3);
        } else if (this.game.down) { // down left
            if (this.lastDirection === "right") {
                this.downLeftTurn.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
                this.lastDirection = "left";
            }
            this.downLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
        } else if (this.up && this.running) { // diagonal right up
            this.runningLeftUp.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
        } else if (this.up) { // up left
            this.upLeft.drawFrame(this.game.clockTick, ctx, this.x + 23, this.y - 6, 3);

        } else if (this.running) {
            if (this.lastDirection === "right") {
                this.turnLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
                this.lastDirection = "left";
            } else {
                this.runningLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 15, 3);
            }
        } else {
            this.idleLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    }
    Entity.prototype.draw.call(this);
}