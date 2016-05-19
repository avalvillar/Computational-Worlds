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
    this.entities = [];
    this.lasers = [];
    this.platforms = [];
    this.samus = null;
    this.background = null;
    this.camera = null;
    this.showOutlines = false; // make false to hide collision boxes
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.button0Held = false; //Added to prevent holding of buttons and siliness. 
    this.button1Held = false;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.gravity = 900;
    this.startGame = false;
}

GameEngine.prototype.init = function (ctx, samus, background) {
    this.ctx = ctx;
    this.samus = samus;
    this.background = background;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    this.camera = new Camera(this);
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
    var that = this;

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which) === 'M') {
            that.startGame = true;
            // e.preventDefault();
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

GameEngine.prototype.addLaser = function (entity) {
    this.lasers.push(entity);
}

GameEngine.prototype.setBackground = function (entity) {
    this.background = entity;
}

GameEngine.prototype.addPlatform = function (entity) {
    this.platforms.push(entity);
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
    this.background.draw(this.ctx);
    for (var i = 0; i < this.platforms.length; i++) {
        this.platforms[i].draw(this.ctx, cameraX, cameraY);
    }
    this.samus.draw(this.ctx, cameraX, cameraY);
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx, cameraX, cameraY);
    }
    for (var i = 0; i < this.lasers.length; i++) {
        this.lasers[i].draw(this.ctx, cameraX, cameraY);
    }
    
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    //poll gamepad
    var that = this;
    var gp = navigator.getGamepads()[0]; //only need gamnepad 0, single player game
    if (gp) {
        
        if (buttonPressed(gp.buttons[0])) {
            if (!that.button0Held) {
                that.space = true;
                that.button0Held = true;
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
    if (!this.samus.removeFromWorld) {
        this.samus.update();
    }
    this.camera.update();
    this.background.update();
    var entitiesCount = this.entities.length;
    var laserCount = this.lasers.length;

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

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = false;
    this.shooting = false;
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
   // this.x -= this.game.camera.x;
   // this.y += this.game.camera.y;
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "red";
        this.game.ctx.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }

    if (this.game.showOutlines && this.collisionWidth && this.collisionHeight) {
        this.game.ctx.beginPath();
        this.game.ctx.lineWidth = "1";
        this.game.ctx.strokeStyle = "red";
        this.game.ctx.rect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);
        this.game.ctx.stroke(); 
    }
    if (this.game.showOutlines && this.isPlatform) {
        this.game.ctx.beginPath(); //collide top boxes
        this.game.ctx.lineWidth = "1";
        this.game.ctx.strokeStyle = "orange";
        this.game.ctx.rect(this.collisionX, this.collisionY - 5, this.collisionWidth, 5);
        this.game.ctx.rect(this.collisionX + this.collisionWidth, this.collisionY, 5, this.collisionHeight);
        this.game.ctx.rect(this.collisionX - 5, this.collisionY, 5, this.collisionHeight);
        this.game.ctx.rect(this.collisionX, this.collisionY + this.collisionHeight, this.collisionWidth, 5);
        this.game.ctx.stroke();
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