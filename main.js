/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 * video - https://youtu.be/s_43VZBxWXk
 */
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/Fusion-Samus.png");
ASSET_MANAGER.queueDownload("./img/greySnake.png");
ASSET_MANAGER.queueDownload("./img/bat.png");
//ASSET_MANAGER.queueDownload("./img/cave_bg_extended.png");
ASSET_MANAGER.queueDownload("./img/cave-full.png");
ASSET_MANAGER.queueDownload("./img/leftLaser.png");
ASSET_MANAGER.queueDownload("./img/alien.png");
ASSET_MANAGER.queueDownload("./img/cave_rock.png");
ASSET_MANAGER.queueDownload("./img/ShipPart.png");
ASSET_MANAGER.queueDownload("./img/alienDeath.png");
ASSET_MANAGER.queueDownload("./img/alienAttack.png");
ASSET_MANAGER.queueDownload("./img/Lava.png");
ASSET_MANAGER.queueDownload("./img/alienJump.png");

//Forest Stuff
ASSET_MANAGER.queueDownload("./img/forestBG.jpg");
ASSET_MANAGER.queueDownload("./img/forestBG_extended.jpg");
ASSET_MANAGER.queueDownload("./img/SpiderSpriteB2.png");
ASSET_MANAGER.queueDownload("./img/podPlant.png");
ASSET_MANAGER.queueDownload("./img/mossyBlock.png");
ASSET_MANAGER.queueDownload("./img/woodBlock.png");
ASSET_MANAGER.queueDownload("./img/CrashedShip.png");

//Snow stuff
ASSET_MANAGER.queueDownload("./img/snowBG.jpg");
ASSET_MANAGER.queueDownload("./img/snowBlock.png");
ASSET_MANAGER.queueDownload("./img/yeti.png");
ASSET_MANAGER.queueDownload("./img/smallYeti.png");

var canvas;
var debugBtn;
var samus;
var bg;
var ctx;
var killcount = 0;
var deathcount = 0;

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    //var canvas = document.getElementById('gameWorld');
    canvas = document.getElementById('gameWorld');
    debugBtn = document.getElementById('debug');
    canvas.focus();
    ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    samus = new Samus(gameEngine, 625, 660); 
    //cave x = 200 // boss testing x: 9900 //forest x: 625 //snow x: 100
    //forest y:660 //cave y: 600 //snow y: 670
    bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/forestBG.jpg"), 2100, 900);

    var start = new StartScreen(gameEngine);
    gameEngine.addEntity(start);

    gameEngine.init(ctx, samus, bg, "forest", debugBtn); //forest, cave, snow
    gameEngine.start();

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

function Background(game, spritesheet, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.spritesheet = spritesheet;
    this.game = game;
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx, cameraX) {
    this.cameraX = cameraX / 10; //makes background scroll at 1/10th the speed of samus
    this.game.ctx.drawImage(this.spritesheet,
    this.x + this.cameraX, this.y, this.width, this.height);
//=======
//  this.x + this.cameraX, this.y, 2100, 900);
//>>>>>>> origin/Antonio
//=======
//                 this.x + this.cameraX, this.y, 2100, 900); /// best setting is (2100, 900)
//>>>>>>> origin/Antonio

    //ctx.setTransform(1, 0, 0, 1, 0, 0);//reset the transform matrix as it is cumulative
    //ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
    //ctx.drawImage(this.spritesheet, this.x, this.y, 9000, 900);

    ////Clamp the camera position to the world bounds while centering the camera around the player                                             
    //var camX = clamp(-this.game.samus.x + canvas.width / 7, canvas.minX, canvas.maxX - canvas.width);
    //var camY = clamp(-(this.game.samus.y + 200) + canvas.height / 1.4, canvas.minY, canvas.maxY - canvas.height);


    //ctx.translate(camX, camY);
};

Background.prototype.update = function () {
};

/************************************************************
    Health Bar
 */
function Health(game) {
    this.x = 20;
    this.y = 20;
    this.maxHealthWidth = 100;
    this.currentHealthWidth = 100;
    this.height = 25;
    this.isHealthBar = true;
    this.game = game;
};

//Health.prototype = new Entity();
//Health.prototype.constructor = Health;

Health.prototype.draw = function (ctx) {
    if (!this.game.startGame) return;
    this.game.ctx.beginPath();
    this.game.ctx.lineWidth = "3";
    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(this.x, this.y, this.maxHealthWidth * 1.5, this.height); // max health
    if (samus.health > 60) {
        this.game.ctx.fillStyle = "green";
    } else if (samus.health > 30) {
        this.game.ctx.fillStyle = "darkorange";
    } else {
        this.game.ctx.fillStyle = "red";
    }
    this.game.ctx.fillRect(this.x, this.y, this.currentHealthWidth * 1.5, this.height); // samus health
    this.game.ctx.stroke();

    ctx.font="20px Courier New";
    ctx.fillText(Math.round(samus.health) + " / 100", 180 , 38);
};

Health.prototype.update = function () {
    // console.log(samus.y);
    if (!this.game.startGame) return;
    this.currentHealthWidth = samus.health;
};

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
} 

/************************************************************
    Reset world - if samus dies, set samus back at the
    beginning of the game
 */

var resetWorld = function(game) {
// set camera back at beginning
    
    game.entities = [];
    game.addEntity(new Health(game));
    game.platforms = [];
    game.decorations = [];
    game.lasers = [];

    document.getElementById("death count").innerHTML = "Death Count: " + ++deathcount;

    if (game.alienBossActive) {
        console.log("load boss");
        samus.removeFromWorld = true;

        samus = new Samus(game, 10200, 600);
        game.init(ctx, samus, new Background(game, ASSET_MANAGER.getAsset("./img/cave-full.png"), 12000, 900), "cave", debugBtn);

    } else if (game.currentLevel === "cave") {
        samus.removeFromWorld = true;
        samus = new Samus(game, 205, 600);
        game.init(ctx, samus, new Background(game, ASSET_MANAGER.getAsset("./img/cave-full.png"), 12000, 900), "cave", debugBtn);
    } else if (game.currentLevel === "forest") {
        samus.removeFromWorld = true;
        samus = new Samus(game, 625, 660);
        game.init(ctx, samus, new Background(game, ASSET_MANAGER.getAsset("./img/forestBG.jpg"), 2100, 900), "forest", debugBtn);
    } else if (game.currentLevel === "snow") {
        samus.removeFromWorld = true;
        samus = new Samus(game, 100, 670);
        game.init(ctx, samus, new Background(game, ASSET_MANAGER.getAsset("./img/snowBG.jpg"), 2100, 900), "snow", debugBtn);
    }

// put samus back at beginning
    
    if (game.alienBossActive) {
        setupAlienBoss(game);
        game.bossReset = true;
        game.camera.restartBossFight();
    }
};

