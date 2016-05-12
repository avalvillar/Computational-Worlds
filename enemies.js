/// Enemies

/*************************************************************************************
	SNAKE
*/

function Snake(game, x, y) {
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 48, 48, 48, .1, 4, true, false);
    this.speed = 150;
    this.radius = 25;
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 50;
 
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Snake.prototype = new Entity();
Snake.prototype.constructor = Snake;

Snake.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    this.y += this.game.clockTick * this.game.gravity;

    for (var i = 0; i < this.game.platforms.length; i++) { // platform detection
        var plat = this.game.platforms[i];
        if (platformCollide(this, plat)) {
            this.y -= this.game.clockTick * this.game.gravity;
            break;
        }
    }

    if (this.x < -50) {
        this.x = 1000
    }
    if (this.y > 700) {
        this.x = 1000;
        this.y = 300;
    }

    this.collisionX = this.x + 23;
    this.collisionY = this.y + 30;
    Entity.prototype.update.call(this);
}

Snake.prototype.draw = function (ctx) {
    this.goLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



/*************************************************************************************
	BAT
*/

function Bat(game, x, y) {
    // this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/AlienBatSprites.gif"), 0, 10, 133, 167, .3, 3, true, true);
    // spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/bat.png"), 0, 47, 33, 42, .3, 3, true, false);
    this.goRight = new Animation(ASSET_MANAGER.getAsset("./img/bat.png"), 0, 96, 33, 42, .3, 3, true, false);
    this.speed = 150;
    this.radius = 30;
    this.x = x;
    this.y = y;
    this.collisionX = this.x + 50;
    this.collisionY = this.y + 50;
    this.flip = true;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Bat.prototype = new Entity();
Bat.prototype.constructor = Snake;

Bat.prototype.update = function () {
   /* this.x -= this.game.clockTick * this.speed;
    if (this.x < -50) {
        this.x = 1000
    }  */
    if (this.x < 0) {
        this.flip = !this.flip;
    } else if (this.x > 950) {
        this.flip = !this.flip;
    }
    if (this.flip) {
        this.x -= this.game.clockTick * this.speed;
    } else {
        this.x += this.game.clockTick * this.speed;
    }

    this.collisionX = this.x + 30;
    this.collisionY = this.y + 35;
    Entity.prototype.update.call(this);
}

Bat.prototype.draw = function (ctx) {
    if (this.flip) {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.8);
    } else {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.8);
    }
    //this.goLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.8);
    //this.goRight.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.8);
    Entity.prototype.draw.call(this);
}
