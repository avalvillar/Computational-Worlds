var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Fusion-Samus.png");
ASSET_MANAGER.queueDownload("./img/greySnake.png");
//ASSET_MANAGER.queueDownload("./img/forestBG.jpg");
ASSET_MANAGER.queueDownload("./img/bat.png");
ASSET_MANAGER.queueDownload("./img/cave_bg_extended.png");
ASSET_MANAGER.queueDownload("./img/leftLaser.png");
ASSET_MANAGER.queueDownload("./img/alien.png");
ASSET_MANAGER.queueDownload("./img/cave_rock.png");

//var samus;
//var gameEngine;
var canvas;

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    //var canvas = document.getElementById('gameWorld');
    canvas = document.getElementById('gameWorld');
    canvas.focus();
    var ctx = canvas.getContext('2d');

	var gameEngine = new GameEngine();
	var samus = new Samus(gameEngine, 200, 200);

    //var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/forestBG.jpg"));
	var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/cave_bg_extended.png"));

	gameEngine.init(ctx, samus, bg);
	gameEngine.start();

	setupWorld(gameEngine);
	
    //var tester = new test(gameEngine, 100, 100);
    var snake = new Snake(gameEngine, 1000, 300);//y =495
    var bat = new Bat(gameEngine, 950, 100);

    var alien = new Alien(gameEngine, 900, 438);
    gameEngine.addEntity(alien);

    //gameEngine.addEntity(tester);
    gameEngine.addEntity(snake);
    gameEngine.addEntity(bat);
    
});

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
    this.game.ctx.drawImage(this.spritesheet,
                 this.x, this.y, 2000, 600);

    //ctx.setTransform(1, 0, 0, 1, 0, 0);//reset the transform matrix as it is cumulative
    //ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
    //ctx.drawImage(this.spritesheet, this.x, this.y, 2000, 600);

    ////Clamp the camera position to the world bounds while centering the camera around the player                                             
    //var camX = clamp(-this.game.samus.x + canvas.width / 7, canvas.minX, canvas.maxX - canvas.width);
    //var camY = clamp(-this.game.samus.y + canvas.height / 1.4, canvas.minY, canvas.maxY - canvas.height);


    //ctx.translate(camX, camY);
};

Background.prototype.update = function () {
};

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
} 