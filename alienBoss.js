/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */


var setupAlienBoss = function (game) {
    for (var i = 630; i < 830; i += 70) { // close player in with boss.
        var bigWall = new Platform(game, 10000, i, "cave");
        game.addPlatform(bigWall);
    }
    game.settingUpBoss = true;
    game.setSamusIdle();
    game.camera.setBossFight();
    var boss = new Alien(game, 10700, 670);
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
    new Animation(ASSET_MANAGER.getAsset("./img/alienAttack.png"), 0, 5, 200, 150, .1, 9, true, false);
    this.attackRight =
    new Animation(ASSET_MANAGER.getAsset("./img/alienAttack.png"), 1900, 5, 200, 150, .1, 9, true, true);
    this.startAnimation =
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 400, 895, 146, 93, 2, 3, false, true);
    this.jumpLeft = new Animation(ASSET_MANAGER.getAsset("./img/alienJump.png"), 0, 20, 200, 100, 1, 1, true, true);
    this.pounceLeft = new Animation(ASSET_MANAGER.getAsset("./img/alienJump.png"), 200, 20, 200, 100, 1, 1, true, true);
    this.crouchLeft = new Animation(ASSET_MANAGER.getAsset("./img/alienJump.png"), 400, 20, 200, 100, 1, 1, true, true);

    this.right = false;
    this.attacking = false;
    this.jumping = true;
    this.jumpCount = 0;
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
    this.lastHealth = this.health;

    this.collisionWidth = 280;
    this.collisionHeight = 155;
    this.flip = true;
    this.game = game;
    this.lastHitBool = false;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Alien.prototype = new Entity();
Alien.prototype.constructor = Alien;

Alien.prototype.attack = function () {
    attackDistance = 0;
    if (this.x > this.game.samus.x + this.game.samus.collisionWidth) {
        if (this.game.right) {
            attackDistance = 75;
        } else {
            attackDistance = 105;
        }
    } else {
        if (this.game.right) {
            attackDistance = 200;
        } else {
            attackDistance = 160;
        }
    }
    if (Math.abs(this.x - this.game.samus.x) < attackDistance) {
        this.attacking = true;
        this.jumping = false;
    } else if (this.attack && (this.attackLeft.isDone() || this.attackRight.isDone)) {
        this.attacking = false;
        this.attackLeft.elapsedTime = 0;
        this.attackRight.elapsedTime = 0;
    }
}

Alien.prototype.move = function () {

    if (this.x < this.game.samus.x) {
        this.right = true;
    } else {
        this.right = false;
    }
    if (!this.attacking && !this.right && !this.jumping) {
        this.x -= this.speed * this.game.clockTick;
    } else if (!this.right && this.jumping && this.jumpCount > 50) {
        this.x -= (this.speed + 400) * this.game.clockTick;
    } else if (!this.attacking && this.right) {
        this.x += this.speed * this.game.clockTick;
    } else if (this.right && this.jumping && this.jumpCount > 50) {
        this.x += (this.speed + 400) * this.game.clockTick;
    }
}

Alien.prototype.update = function () {
    if (!this.game.startGame || this.isDead) return;
    if (!this.isDead && this.health <= 0) {
        this.game.alienBossDead = true;
        this.isDead = true;
        this.dying = true;
        killcount++;
    }
    if (!this.grounded) {
        this.y += this.game.gravity * this.game.clockTick;
    }

    if (this.jumping) {
        if (this.jumpCount < 100) {
            this.jumpCount++;
        } else {
            this.jumpCount = 0;
            this.jumping = false;
        }
    }

    if (Math.abs(this.x - this.game.samus.x) > 400) {
        this.jumping = true;
    }

    if (this.health !== 0 && this.lastHealth !== this.health) {
        this.game.alienBossHit = true;
        this.game.bossHitOver = false;
        this.lastHitBool = true;
        this.speed += 50;
        this.lastHealth = this.health;
    }

    if (this.game.alienBossHit) {
        this.x = 12000;
        this.lastHitBool = true;
    } else if (this.game.bossHitOver && this.lastHitBool) {
        this.x = 10750;
        this.lastHitBool = false;
        this.game.bossHitOver = false;
    } else if (this.lastHitBool) {
        this.x = 12000;
    }
    this.attack();

    this.move();

    var collideTopDown = false;

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

    //this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 15, 2);
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    if (this.right) {
        if (this.isDead && this.dying) {
            this.deathRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
            this.dyingCount++;
            if (this.deathRight.isDone()) {
                this.dying = false;
            }
        } else if (this.isDead) {
            this.deadRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
        } else if (this.attacking) {
            this.attackRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 55, 2);
        } else {
            this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 2);
        }
    } else {
        if(this.isDead && this.dying) {
            this.deathLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
            this.dyingCount++;
            if (this.deathLeft.isDone()) {
                this.dying = false;
            }
        } else if (this.isDead) {
            this.deadLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
        }  else if (this.jumping) {
            if (this.jumpCount < 10) {
                this.crouchLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
            } else if (this.jumpCount < 50) {
                this.pounceLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
            } else {
                this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 25, 2);
            }
            
        } else if (this.attacking) {
            if (this.attackLeft.isDone()) {

            }
            this.attackLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY - 55, 2);
        } else {
            this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 2);
        }
    }
}
