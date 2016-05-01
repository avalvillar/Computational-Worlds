var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Fusion-Samus.png");
ASSET_MANAGER.queueDownload("./img/greySnake.png");
//ASSET_MANAGER.queueDownload("./img/forestBG.jpg");
ASSET_MANAGER.queueDownload("./img/bat.png");
ASSET_MANAGER.queueDownload("./img/cave-bg.png")

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    canvas.focus();
    var ctx = canvas.getContext('2d');

	var gameEngine = new GameEngine();
	var samus = new Samus(gameEngine, 200, 400);

    //var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/forestBG.jpg"));
	var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/cave-bg.png"));

	gameEngine.init(ctx, samus, bg);
    gameEngine.start();
	
    //var tester = new test(gameEngine, 100, 100);
    var snake = new Snake(gameEngine, 1000, 495);
    var bat = new Bat(gameEngine, 950, 300);

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
    ctx.drawImage(this.spritesheet,
                   this.x, this.y, 1000, 600);
};

Background.prototype.update = function () {
};