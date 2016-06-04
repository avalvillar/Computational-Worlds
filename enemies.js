/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */

/*************************************************************************************
	PLANT
*/

function Plant(game, x, y) {
    this.movement = new Animation(ASSET_MANAGER.getAsset("./img/podPlant.png"), 112, 0, 56, 80, 1, 4, true, false);
    this.health = 1;
    this.static = true;
    this.damage = 30;
    this.x = x;
    this.y = y
    this.collisionWidth = 65;
    this.collisionHeight = 50;
    this.collisionX = this.x + 25;
    this.collisionY = this.y + 105;
    this.game = game;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Plant.prototype = new Entity();
Plant.prototype.constructor = Plant;

Plant.prototype.update = function () {
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
    Entity.prototype.update.call(this);
}

Plant.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    this.movement.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 2);
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
}

/*************************************************************************************
	SPIDER
*/

function Spider(game, x, y, topBound, bottomBound) {
    this.movement = new Animation(ASSET_MANAGER.getAsset("./img/SpiderSpriteB2.png"), 0, 0, 40, 30, .1, 3, true, false);
    this.health = 1;
    this.static = true;
    this.damage = 30;
    this.speed = 150;
    this.x = x;
    this.y = y
    this.up = false;
    this.topBound = topBound;
    this.bottomBound = bottomBound;
    this.collisionWidth = 75;
    this.collisionHeight = 50;
    this.collisionX = this.x + 5;
    this.collisionY = this.y + 12;
    this.game = game;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Spider.prototype = new Entity();
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
    if (this.up) {
        this.y += this.speed * this.game.clockTick;
    } else {
        this.y -= this.speed * this.game.clockTick;
    }

    var collideTopDown = false;

    if (this.y < this.topBound) {
        this.up = true;
    }
    if (this.y > this.bottomBound) {
        this.up = false;
    }

    this.collisionX = this.x + 5;
    this.collisionY = this.y + 12;
    Entity.prototype.update.call(this);
}

Spider.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    this.movement.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 2);
    ctx.strokeStyle = "silver";
    ctx.beginPath();
    ctx.moveTo(this.x + 40 + cameraX, this.topBound - cameraY);
    ctx.lineTo(this.x + 40 + cameraX, this.y + 5 - cameraY);
    ctx.stroke();
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
}

/*************************************************************************************
	SNAKE
*/

function Snake(game, x, y, leftBound, rightBound) {
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 48, 48, 48, .1, 4, true, false);
    this.goRight = new Animation(ASSET_MANAGER.getAsset("./img/greySnake.png"), 0, 96, 48, 48, .1, 4, true, false);
    this.health = 1;
    this.damage = 30;
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
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
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
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
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
    this.health = 1;
    this.damage = 30;
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
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
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
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    if (this.flip) {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.8);
    } else {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 1.8);
    }
}

/*************************************************************************************
	SMALL YETI
*/

function smallYeti(game, x, y) {
    this.up = new Animation(ASSET_MANAGER.getAsset("./img/smallYeti.png"), 20, 30, 118, 115, 1, 4, true, false);
    this.down = new Animation(ASSET_MANAGER.getAsset("./img/smallYeti.png"), 20, 384, 118, 115, 1, 4, true, false);
    this.static = true;
    this.health = 1;
    this.count = 0;
    this.damage = 40;
    this.flip = false;
    this.x = x;
    this.y = y
    this.collisionWidth = 65;
    this.collisionHeight = 40;
    this.collisionX = this.x + 30;
    this.collisionY = this.y + 60;
    this.game = game;

    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

smallYeti.prototype = new Entity();
smallYeti.prototype.constructor = smallYeti;

smallYeti.prototype.update = function () {
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
    Entity.prototype.update.call(this);
}

smallYeti.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    //if (this.count % 4 === 0) {
    //    this.flip = !this.flip;
    //} 
    //if (this.flip) {
    //    this.up.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
    //    this.count++;
    //} else {
    //    this.down.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
    //    this.count++;
    //}
    this.up.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY);
    
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
}

/*************************************************************************************
	YETI
*/

function Yeti(game, x, y, leftBound, rightBound) {
    this.goLeft = new Animation(ASSET_MANAGER.getAsset("./img/yeti.png"), 0, 76, 75, 76, .3, 4, true, false);
    this.goRight = new Animation(ASSET_MANAGER.getAsset("./img/yeti.png"), 0, 0, 75, 76, .3, 4, true, false);
    this.health = 1;
    this.damage = 50;
    this.speed = 100;
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

Yeti.prototype = new Entity();
Yeti.prototype.constructor = Yeti;

Yeti.prototype.update = function () {
    if (!this.game.startGame) return;
    if (this.health <= 0) {
        this.removeFromWorld = true;
        killcount++;
    }
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

Yeti.prototype.draw = function (ctx, cameraX, cameraY) {
    if (!this.game.startGame) return;
    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    if (this.flip) {
        this.goLeft.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3.5);
    } else {
        this.goRight.drawFrame(this.game.clockTick, ctx, this.x + cameraX, this.y - cameraY, 3.5);
    }
}