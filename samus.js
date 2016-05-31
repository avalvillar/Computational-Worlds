/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */
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
    this.rightAimDiagonal = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 240, 116, 39, 55, .8, 2, true, false);


    this.idleLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 142, 55, 39, 50, .8, 2, true, true);
    this.runningLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 300, 42.1, 50, .1, 10, true, false);
    this.jumpLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 733.1, 0, 31.8, 55, .07, 8, false, false);
    this.turnLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 260, 55, 40, 55, 1, 1, false, false);
    this.downLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 0, 180, 40, 55, 1, 1, true, false);
    this.downLeftTurn = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 40, 180, 40, 55, 1, 1, false, false);
    this.upLeft = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 484, 170, 41, 70, 1, 2, true, false);
    this.runningLeftUp = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), 1, 360, 42.5, 50, .1, 10, true, false);
    this.leftAimDiagonal = new Animation(ASSET_MANAGER.getAsset("./img/Fusion-Samus.png"), -2, 116, 39, 55, .8, 2, true, false); //A negative value works here???? lmao

    this.health = 100; // will be out of 100
    this.running = false;
    this.hitRight = false;
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
    this.damageTimer = 0;
    this.damageCooldown = 50;
    this.damageMoveCD = this.damageCooldown / 25;
    this.isDamaged = false;

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
            } else if (this.game.running && (this.diagonal ||this.game.up)) {
                var laser = new Laser(this.game, this.x + 80, this.y + 25, "diagonal-right");
                this.game.addLaser(laser);
            } else if (this.game.diagonal) {
                var laser = new Laser(this.game, this.x + 80, this.y -10, "diagonal-right");
                this.game.addLaser(laser);
            } else if (this.game.running) {
                var laser = new Laser(this.game, this.x + 80, this.y, "right");
                this.game.addLaser(laser);
            } else if (this.game.up) {
                var laser = new Laser(this.game, this.x + 32, this.y - 44, "up");
                this.game.addLaser(laser);
            }  else {
                var laser = new Laser(this.game, this.x + 68, this.y + 11, "right");
                this.game.addLaser(laser);
            }
        } else if (!this.game.right) {//shoot left

            if (this.game.down) {
                var laser = new Laser(this.game, this.x, this.y + 34, "left");
                this.game.addLaser(laser);
            } else if (this.game.running && (this.diagonal || this.game.up)) {
                var laser = new Laser(this.game, this.x + 23, this.y + 24, "diagonal-left");
                this.game.addLaser(laser);
            } else if (this.game.diagonal) {
                var laser = new Laser(this.game, this.x - 1, this.y -10, "diagonal-left");
                this.game.addLaser(laser);
            } else if (this.game.running) {
                var laser = new Laser(this.game, this.x, this.y, "left");
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
        //if (this.jumpRight.elapsedTime === 0 && this.jumpLeft.elapsedTime === 0) {
        //    this.ground = this.y;
        //}
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
    if (!this.isDamaged) {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (Math.abs(this.x - ent.x) < 400 && detectCollision(this, ent) && !ent.isDead) {
                if (ent.x > this.x) {
                    this.hitRight = true;
                    //this.velocity.x -= 100;
                    ent.x += 100;
                } else {
                    this.hitRight = false;
                    //this.velocity.x += 100;
                    ent.x -= 100;
                }
                this.platformCollision(true);
                this.health -= ent.damage;
                this.isDamaged = true;
            }
        }
    } else {
        if (this.damageTimer > this.damageCooldown) {
            this.isDamaged = false;         
            this.damageTimer = 0;
        } else {
            this.damageTimer++;
        }
    }
    if (this.isDamaged && this.damageTimer <= this.damageMoveCD) {
        if (this.hitRight) {
            this.velocity.x -= 25;
        } else {
            this.velocity.x += 25;
        }
        this.platformCollision(true)
    }
}


Samus.prototype.platformCollision = function (hitTest) {
    var isColliding = false;
    var collideTopDown = false;
    var collideSide = false;
    for (var i = 0; i < this.game.platforms.length && (!collideTopDown || !collideSide); i++) { // platform detection
        var plat = this.game.platforms[i];
        if (Math.abs(this.collisionX - plat.collisionX) < 100 && Math.abs(this.collisionY - plat.collisionY) < 150) {

            if (!hitTest && !collideTopDown && collideTop(this, plat)) {
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
                    //collidingTopDown = false;
                    //this.y = plat.collisionY - 105;
                    //this.ground = this.y;
                }
            }
            if (!hitTest && !collideTopDown && collideBottom(this, plat)) {
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
            if (!collideSide && (collideRight(this, plat) || (hitTest && collideRight({
                collisionX: this.collisionX - 25, collisionY: this.collisionY,
                collisionWidth: this.collisionWidth, collisionHeight: this.collisionHeight
                }, plat))) && ((hitTest || this.velocity.x < 0) || this.jumping)) {

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
            if (!collideSide && (collideLeft(this, plat) || (hitTest && collideLeft({
                collisionX: this.collisionX + 25, collisionY: this.collisionY, 
                collisionWidth:this.collisionWidth, collisionHeight: this.collisionHeight
            }, plat))) && ((hitTest || this.velocity.x > 0) || this.jumping)) {

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
        this.ground = this.y + this.velocity.y;
    } else {
        this.velocity.y = 0;
    }
}

Samus.prototype.update = function () {
    if (samus.y > 800) samus.health = 0;
    if (this.health <= 0) {
        resetWorld(this.game);
        return;
    }
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

    if (this.game.diagonal) {
        this.diagonal = true;
    } else {
        this.diagonal = false;
    }
    if (!this.game.debug) {
        this.collisionDetection(); // performs collision with enemy detection and handling.
    }
    if (!this.game.debug) {
        this.platformCollision(false); // performs platform collision handling
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.velocity.y >= 0 && !this.jumping) {
            this.ground.y = this.y;
        }
    } else {
        if (this.game.down) {
            this.velocity.y = 10;
        } else {
            this.velocity.y = 0;
        }
        if (this.game.up) {
            this.velocity.y = -10;
        } else if (!this.game.down) {
            this.velocity.y = 0;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.grounded = true;
    }
    

    this.chooseLaser(); // fires laser blasts

    this.jump(); // performs jump logic



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


Samus.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;

    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    if (this.game.settingUpBoss) {
        this.idleRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        return;
    }
    if (this.game.right) { // draw right facing sprites
        if (this.jumping) { // right jumping
            this.jumpRight.drawFrame(this.game.clockTick, ctx, this.x + 17 + cameraX, this.y - 34 - cameraY, 3);
        } else if (this.game.down) { // down right
            if (this.lastDirection === "left") {
                this.downRightTurn.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 23 - cameraY, 3);
                this.lastDirection = "right";
            } else {
                this.downRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 23 - cameraY, 3);
            }
        } else if (this.diagonal && !this.running) {
            this.rightAimDiagonal.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        } else if ((this.up || this.diagonal) && this.running) { // diagonal right up
            this.runningRightUp.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 15 - cameraY, 3);
        } else if (this.up) { // up right
            this.upRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - 6 - cameraY, 3);
        } else if (this.running) { // running right
            if (this.lastDirection === "left") { // turn animation
                this.turnRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 10 - cameraY, 3);
                this.lastDirection = "right";
            } else {
                this.runningRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 15 - cameraY, 3);
            }
        } else {
            this.idleRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        }
    } else if (!this.game.right) { // draw left facing sprites
        if (this.jumping) { // left jumping
            this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + 17 + cameraX, this.y - 34 - cameraY, 3);
        } else if (this.game.down) { // down left
            if (this.lastDirection === "right") {
                this.downLeftTurn.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 15 - cameraY, 3);
                this.lastDirection = "left";
            }
            this.downLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 23 - cameraY, 3);
        } else if (this.diagonal && !this.running) {
            this.leftAimDiagonal.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        } else if ((this.up || this.diagonal) && this.running) { // diagonal right up
            this.runningLeftUp.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 15 - cameraY, 3);
        } else if (this.up) { // up left
            this.upLeft.drawFrame(this.game.clockTick, ctx, this.x + 23 + cameraX, this.y - 6 - cameraY, 3);

        } else if (this.running) {
            if (this.lastDirection === "right") {
                this.turnLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
                this.lastDirection = "left";
            } else {
                this.runningLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y + 15 - cameraY, 3);
            }
        } else {
            this.idleLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3);
        }
    }
    
}