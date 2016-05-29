// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

window.addEventListener("gamepadconnected", function (e) {
    //For connecting a gamepad
    console.log("gamepad connected", e.gamepad);
});

window.addEventListener("gamepaddisconnected", function (e) {
    //disconnected gamepad
    console.log("Gamepad " + e.gamepad.index + " disconnected.", e.gamepad);
});

function buttonPressed(b) {
    if (typeof (b) === "object") {
        return b.pressed;
    }
}

var detectCollision = function (ent1, ent2) {
    if (ent1.collisionX < ent2.collisionX + ent2.collisionWidth &&
        ent1.collisionX + ent1.collisionWidth > ent2.collisionX &&
        ent1.collisionY < ent2.collisionY + ent2.collisionHeight &&
        ent1.collisionHeight + ent1.collisionY > ent2.collisionY) {
        return true;
    }
    return false;
}

// These methods are for detecting where an entity is colliding with a platform.
// Detects if ent is colliding with small boxes lining platform
var collideTop = function (ent, plat) {
    if (detectCollision(ent,
        { collisionWidth: plat.collisionWidth, collisionHeight: 5,
            collisionX: plat.collisionX, collisionY: plat.collisionY - 5
        })) {
        return true;
    } else {
        return false;
    }
}

var collideLeft = function (ent, plat) {
    var right = ent.collisionX + ent.collisionWidth;
    if (detectCollision(ent, {
        collisionWidth: 5, collisionHeight: plat.collisionHeight,
        collisionX: plat.collisionX - 5, collisionY: plat.collisionY
    })) {
        return true;
    } else {
        return false;
    }
}

var collideBottom = function (ent, plat) {
    if (detectCollision(ent, {
        collisionWidth: plat.collisionWidth, collisionHeight: 5,
        collisionX: plat.collisionX, collisionY: plat.collisionY + plat.collisionHeight
    })) {
        return true;
    } else {
        return false;
    }
}

var collideRight = function (ent, plat) {
    if (detectCollision(ent, {
        collisionWidth: 5, collisionHeight: plat.collisionHeight,
        collisionX: plat.collisionX + plat.collisionWidth, collisionY: plat.collisionY
    })) {
        return true;
    } else {
        return false;
    }
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.currentLevel = null;
    this.entities = [];
    this.lasers = [];
    this.platforms = [];
    this.decorations = [];
    this.alienBossActive = false;
    this.alienBossHit = false;
    this.settingUpBoss = false;
    this.bossReset = false;
    this.bossHitOver = false;
    this.alienBoss = null;
    this.samus = null;
    this.background = null;
    this.camera = null;
    this.debug = false; // set true to make samus not collide with anything
    this.showOutlines = false; // make false to hide collision boxes
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.healthBar = null;
    this.button0Held = false; //Added to prevent holding of buttons and siliness. 
    this.button1Held = false;
    this.button9Held = false;
    this.inputInitialized = false; // calling init on reset sets up a new keydown listener, every time
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.gravity = 900;
    this.startGame = false;
}

GameEngine.prototype.init = function (ctx, samus, background, level) {
    this.currentLevel = level;
    this.ctx = ctx;
    this.samus = samus;
    this.background = background;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.healthBar = new Health(this);
    this.paused = false;
    if (!this.inputInitialized) {
        this.startInput();
        this.inputInitialized = true;
    }
    this.timer = new Timer();
    this.camera = new Camera(this);
    if (this.currentLevel === "forest") {
        setupWorldForest(this);
    } else if (this.currentLevel === "cave") {
        setupWorldCave(this);
    }
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    this.right = true;
    this.down = false;
    this.up = false;
    this.shooting = false;
    this.diagonal = false;
    var that = this;
    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.which === 27) {
            that.pause();
        }
        if (String.fromCharCode(e.which) === 'M') {
            that.startGame = true;
            // e.preventDefault();
        }
        if (String.fromCharCode(e.which) === 'Q') {
            that.diagonal = true;
        }
        if (String.fromCharCode(e.which) === 'E') {
            that.diagonal = true;
        }
        if (String.fromCharCode(e.which) === ' ') {
            that.space = true;
            e.preventDefault();
        }
        if (String.fromCharCode(e.which) === 'D') {
            if (!that.down) {
                that.running = true;
            }
            that.right = true;
        }
        if (String.fromCharCode(e.which) === 'W') {
            that.up = true;
        }
        if (String.fromCharCode(e.which) === 'A') {
            if (!that.down) {
                that.running = true;
            }
            that.right = false;
        }

        if (String.fromCharCode(e.which) === 'S') {
            that.running = false;
            that.down = true;
        }
        if (String.fromCharCode(e.which) === "\r") {
            that.shooting = true;
        }
    }, false);
    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (String.fromCharCode(e.which) === 'W') {
            that.up = false;
        }
        if (String.fromCharCode(e.which) === 'E') {
            that.diagonal = false;
        }
        if (String.fromCharCode(e.which) === 'Q') {
            that.diagonal = false;
        }
        if (String.fromCharCode(e.which) === 'D') {
            that.running = false;
        } else if (String.fromCharCode(e.which) === 'A') {
            that.running = false;
        } else if (String.fromCharCode(e.which) === 'S') {
            that.down = false;
        }

    }, false);

    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
}

GameEngine.prototype.addDeco = function (entity) {
    this.decorations.push(entity);
}

GameEngine.prototype.addLaser = function (entity) {
    this.lasers.push(entity);
}

GameEngine.prototype.setBackground = function (entity) {
    this.background = entity;
}

GameEngine.prototype.addPlatform = function (entity) {
    this.platforms.push(entity);
}

GameEngine.prototype.addAlienBoss = function (entity) {
    this.entities.push(entity);
}

GameEngine.prototype.pause = function () {
    if (!this.paused) {
        this.paused = true;
    } else {
        this.paused = false;
    }
}


GameEngine.prototype.draw = function () {
    this.ctx.save();
    var cameraX = this.camera.x;
    var cameraY = this.camera.y;

    //this.ctx.translate(this.offsetX, this.offsetY);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    /* This is for translation of the viewpoint. 
       I need to figure out how to translate the camera offset onto these
       translations. */
    this.background.draw(this.ctx, cameraX);
    
    for (var i = 0; i < this.platforms.length; i++) {
        if (this.onCamera(this.platforms[i])) {
            this.platforms[i].draw(this.ctx, cameraX, cameraY);
        }
    }

    for (var i = 0; i < this.decorations.length; i++) {
        if (this.onCamera(this.decorations[i])) {
            this.decorations[i].draw(this.ctx, cameraX, cameraY);
        }
    }

    this.samus.draw(this.ctx, cameraX, cameraY);
    for (var i = 0; i < this.entities.length; i++) {
        if (this.onCamera(this.entities[i])) {
            this.entities[i].draw(this.ctx, cameraX, cameraY);
        }
    }
    for (var i = 0; i < this.lasers.length; i++) {
        if (this.onCamera(this.lasers[i])) {
            this.lasers[i].draw(this.ctx, cameraX, cameraY);
        }
    }


    this.healthBar.draw(this.ctx);
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    if (!this.samus.removeFromWorld) {
        this.samus.update();
    }
    //if (this.alienBossActive) {
    //    //this.alien.update();
    //}
    this.camera.update();
    this.background.update();
    this.healthBar.update();
    var entitiesCount = this.entities.length;
    var laserCount = this.lasers.length;

    //console.log(this.currentLevel);
    if (this.currentLevel === "forest" && this.samus.x >= 8000) {
        this.currentLevel = "cave";
        this.platforms = [];
        this.entities = [];
        this.decorations = [];
        this.addEntity(new Health(this));
        this.samus.x = 200;
        this.samus.y = 600;
        setupWorldCave(this);
    }

    if (this.currentLevel === "cave" && this.samus.x >= 10070 && !this.alienBossActive) { // activate boss!
        this.alienBossActive = true;
        setupAlienBoss(this);
    }
    //if (this.alienBossActive && ) {

    //}

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = 0; i < laserCount; i++) {
        var entity = this.lasers[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
    for (var i = this.lasers.length - 1; i >= 0; --i) {
        if (this.lasers[i].removeFromWorld) {
            this.lasers.splice(i, 1);
        }
    }
    
}

GameEngine.prototype.gamepadInput = function () {
    //poll gamepad
    var that = this;
    var gp = navigator.getGamepads()[0]; //only need gamepad 0, single player game
    if (gp) {

        if (buttonPressed(gp.buttons[0])) {
            if (!that.button0Held && that.startGame) {
                that.space = true;
                that.button0Held = true;
            }
            if (!that.startGame) {
                that.startGame = true;
            }
        } else {
            that.button0Held = false;
        }
        if (buttonPressed(gp.buttons[1])) {
            if (!that.button1Held) {
                that.shooting = true;
                that.button1Held = true;
            }
        } else {
            that.button1Held = false;
        }
        if (buttonPressed(gp.buttons[6])) {
            that.diagonal = true;
        } else {
            that.diagonal = false;
        }
        if (buttonPressed(gp.buttons[7])) {
            that.diagonal = true;
        } else {
            that.diagonal = false;
        }
        if (buttonPressed(gp.buttons[9])) {
            if (!that.button9Held) {
                that.pause();
                that.button9Held = true;
            }
        } else {
            that.button9Held = false;
        }
        if (gp.axes[0] > 0.5) {
            if (!that.down) {
                that.running = true;
            }
            that.right = true;
        } else if (gp.axes[0] < -0.5) {
            if (!that.down) {
                that.running = true;
            }
            that.right = false;
        } else {
            that.running = false;
        }
        if (gp.axes[1] > 0.5) {
            that.down = true;
            that.running = false;
        } else if (gp.axes[1] < -0.5) {
            that.up = true;
        } else {
            that.up = false;
            that.down = false;
        }
    }
}

GameEngine.prototype.loop = function () {
    this.gamepadInput();
    if (!this.paused) {
        this.clockTick = this.timer.tick();
        if (this.settingUpBoss) {
            this.camera.update();
        } else {
            this.update();
        }
        this.draw();
        this.space = false;
        this.shooting = false;
    }

    if (this.paused) {
        var textX = (this.ctx.canvas.width / 3);
        var textY = (this.ctx.canvas.height / 2);
        this.ctx.font = "80pt Impact";
        this.ctx.lineWidth = 4;
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.strokeText("PAUSED", textX, textY);
        this.ctx.fillText("PAUSED", textX, textY);
        

    }
}

GameEngine.prototype.setSamusIdle = function () {
    this.right = true;
    this.down = false;
    this.up = false;
    this.shooting = false;
    this.diagonal = false;
}

GameEngine.prototype.onCamera = function (entity) {
    var visible = true;
    // shows what is within 200 pixels of the view
    var viewXRight = this.camera.x - 200;
    var viewXLeft = this.camera + 200;

    if (this.camera.x === 0 - 100) {
        if (entity.x < 0) {
            visible = false;
        }
        if (entity.x > this.ctx.canvas.width + 100) {
            visible = false;
        }
    } else {
        if (entity.x < (-1 * viewXLeft)) {
            visible = false;
        }
        if (entity.x > (-1 * viewXRight) + this.ctx.canvas.width) {
            visible = false;
        }
    }
    //!!!! No change in y coordinates right now, so no need to check that. 
    //Will need to be fixed to vertical camera introduced
    return visible;
    
}

function Entity(game, x, y, CX, CY) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.collisionX = CX;
    this.collisionY = CY;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx, cameraX, cameraY) {

    if (this.game.showOutlines && this.collisionWidth && this.collisionHeight) {
        this.game.ctx.beginPath();
        this.game.ctx.lineWidth = "1";
        this.game.ctx.strokeStyle = "red";
        this.game.ctx.rect(this.collisionX + cameraX, this.collisionY - cameraY, this.collisionWidth, this.collisionHeight);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
    if (this.game.showOutlines && this.isPlatform) {
        this.game.ctx.beginPath(); //collide top boxes
        this.game.ctx.lineWidth = "1";
        this.game.ctx.strokeStyle = "orange";
        this.game.ctx.rect(this.collisionX + cameraX, this.collisionY - 5 - cameraY, this.collisionWidth, 5);
        this.game.ctx.rect(this.collisionX + this.collisionWidth + cameraX, this.collisionY - cameraY, 5, this.collisionHeight);
        this.game.ctx.rect(this.collisionX - 5 + cameraX, this.collisionY - cameraY, 5, this.collisionHeight);
        this.game.ctx.rect(this.collisionX + cameraX, this.collisionY + this.collisionHeight - cameraY, this.collisionWidth, 5);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}