var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Fusion-Samus.png");
ASSET_MANAGER.queueDownload("./img/greySnake.png");
//ASSET_MANAGER.queueDownload("./img/forestBG.jpg");
ASSET_MANAGER.queueDownload("./img/bat.png");
ASSET_MANAGER.queueDownload("./img/cave_bg_extended.png")

var samus;
var gameEngine;
var canvas;

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    //var canvas = document.getElementById('gameWorld');
        canvas = document.getElementById('gameWorld');
    canvas.focus();
    var ctx = canvas.getContext('2d');

    //var gameEngine = new GameEngine();
        gameEngine = new GameEngine();
	
	gameEngine.init(ctx);
    gameEngine.start();
	
    //var bg = new Background(gameEngine);
    //var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/forestBG.jpg"));
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/cave_bg_extended.png"));

    //var samus = new Samus(gameEngine);
        samus = new Samus(gameEngine);
    var snake = new Snake(gameEngine);
    var bat = new Bat(gameEngine);
	
    gameEngine.addEntity(bg);
    gameEngine.addEntity(samus);
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

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function () {
    //this.ctx.drawImage(this.spritesheet,
    //             this.x, this.y, 2000, 600);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);//reset the transform matrix as it is cumulative
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
    this.ctx.drawImage(this.spritesheet, this.x, this.y, 2000, 600);

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-samus.x + canvas.width / 7, canvas.minX, canvas.maxX - canvas.width);
    var camY = clamp(-samus.y + canvas.height / 1.4, canvas.minY, canvas.maxY - canvas.height);


    this.ctx.translate(camX, camY);
};

Background.prototype.update = function () {
};


function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
} 

