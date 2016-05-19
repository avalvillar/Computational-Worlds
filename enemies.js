// Enemies

/*************************************************************************************
	SNAKE
*/

function Snake(game, x, y, leftBound, rightBound) {
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 48, 48, 48, .1, 4, true, false);
    this.goRight = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 96, 48, 48, .1, 4, true, false);

    this.speed = 150;
    this.x = x;
    this.y = y
    this.right = false;
    this.grounded = false;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.collisionWidth = 40;
    this.collisionHeight = 33;
    this.collisionX = this.x + 5;
    this.collisionY = this.y + 12;
    this.game = game;
 
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Snake.prototype = new Entity();
Snake.prototype.constructor = Snake;

Snake.prototype.update = function () {
    if (this.right) {
        this.x += this.speed * this.game.clockTick;
    } else {
        this.x -= this.speed * this.game.clockTick;
    }

    if (!this.grounded) {
        this.y += this.game.gravity * this.game.clockTick;
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
            this.ground = plat.collisionY - this.collisionHeight - 12;
            this.grounded = true;
            this.y = this.ground;
        } else {
            this.grounded = false;
        }
    }

    this.collisionX = this.x + 5;
    this.collisionY = this.y + 12;
    Entity.prototype.update.call(this);
}

Snake.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    if (this.right) {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
    } else {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
    }
    Entity.prototype.draw.call(this, cameraX, cameraY);
//=======
//Snake.prototype.draw = function (ctx, cameraX, cameraY) {

//    Entity.prototype.draw.call(this, cameraX, cameraY);
//    this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
//>>>>>>> origin/andyLaptop
}


/*************************************************************************************
	BAT
*/

function Bat(game, x, y, leftBound, rightBound) {
    // this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/AlienBatSprites.gif"), 0, 10, 133, 167, .3, 3, true, true);
    // spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/bat.png"), 0, 47, 33, 42, .3, 3, true, false);
    this.goRight = new Animation(ASSET_MANAGER.getAsset("./img/bat.png"), 0, 96, 33, 42, .3, 3, true, false);
    this.speed = 150;
    this.x = x;
    this.y = y;
    this.rightBound = rightBound;
    this.leftBound = leftBound;
    this.collisionHeight = 40;
    this.collisionWidth = 40;
    this.collisionX = this.x + 5;
    this.collisionY = this.y + 20;
    this.flip = true;
    this.game = game;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Bat.prototype = new Entity();
Bat.prototype.constructor = Snake;

Bat.prototype.update = function () {
    if (!this.game.startGame) return;
   /* this.x -= this.game.clockTick * this.speed;
    if (this.x < -50) {
        this.x = 1000
    }  */
    if (this.x < this.leftBound) {
        this.flip = !this.flip;
        this.x = this.leftBound;
    } else if (this.x > this.rightBound) {
        this.flip = !this.flip;
        this.x = this.x - (this.x - this.rightBound);
    }
    if (this.flip) {
        this.x -= this.game.clockTick * this.speed;
    } else {
        this.x += this.game.clockTick * this.speed;
    }

    this.collisionX = this.x + 5;
    this.collisionY = this.y + 20;
    Entity.prototype.update.call(this);
}

Bat.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    Entity.prototype.draw.call(this, cameraX, cameraY);
    if (this.flip) {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.8);
    } else {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.8);
    }
}


/*************************************************************************************
    ALIEN
*/
function Alien(game, x, y) {
    // spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.goLeft = 
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 594, 25, 142, 93, 0.18, 4, true, true);
    this.goRight = 
    new Animation(ASSET_MANAGER.getAsset("./img/alien.png"), 581, 25, 142, 93, 0.18, 4, true, true);
    this.speed = 250;
    // this.radius = 88;
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
    // if (this.x < 0) {
    //     this.flip = !this.flip;
    // } else if (this.x > 950) {
    //     this.flip = !this.flip;
    // }
    // if (this.flip) {
    //     this.x -= this.game.clockTick * this.speed;
    // } else {
    //     this.x += this.game.clockTick * this.speed;
    // }

    this.collisionX = this.x;
    this.collisionY = this.y;

    this.x -= this.game.clockTick * this.speed;
    this.y += this.game.clockTick * this.game.gravity;

    for (var i = 0; i < this.game.platforms.length; i++) { // platform detection
        var plat = this.game.platforms[i];
        if (detectCollision(this, plat)) {
            this.y -= this.game.clockTick * this.game.gravity;
            break;
        }
    }

    //if (this.x < -50) {
    //    this.x = 1000
    //}
    //if (this.y > 700) {
    //    this.x = 1000;
    //    this.y = 300;
    //}

    Entity.prototype.update.call(this);
}

Alien.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;

    Entity.prototype.draw.call(this, cameraX, cameraY);
    if (this.flip) {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.2);
    } else {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.2);
    }
}
