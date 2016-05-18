function Platform(game, x, y) {
    this.spritesheet = ASSET_MANAGER.getAsset("./img/cave_rock.png");
    this.isPlatform = true;
    this.x = x;
    this.y = y;
    this.collisionSize = 70;
    this.collisionWidth = 70;
    this.collisionHeight = 70;
    this.collisionX = x;
    this.collisionY = y;
    Entity.call(this, game, this.x, this.y, this.collisionX, this.collisionY);
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
}

Platform.prototype.draw = function (ctx) {
    this.game.ctx.drawImage(this.spritesheet,
                 this.x, this.y, 70, 70);

    Entity.prototype.draw.call(this);
}

var setupWorld = function (game) {

    ///world creation
    for (var i = 0; i < 900; i += 70) {
        var startWall = new Platform(game, -60, i);
        game.addPlatform(startWall);
    }

    for (var i = 0; i < 8830; i += 70) {
        var ceiling = new Platform(game, i, 0);
        game.addPlatform(ceiling);
    }

    for (var i = -30; i < 660; i += 70) {
        var ground1 = new Platform(game, i, 830);
        game.addPlatform(ground1);
    } 

    for (var i = 580; i < 790; i += 70) {
        var mid = new Platform(game, i, 610);
        game.addPlatform(mid);
    }

    for (var i = 1140; i < 1400; i += 70) {
        var ground2 = new Platform(game, i, 830);
        game.addPlatform(ground2);
    }

    var mid1 = new Platform(game, 1520, 600);
    var mid2 = new Platform(game, 1590, 600);
    game.addPlatform(mid1);
    game.addPlatform(mid2);

    var mid3 = new Platform(game, 1680, 400);
    game.addPlatform(mid3);

    for (var i = 2320; i < 2500; i += 70) {
        var midLong1 = new Platform(game, i, 630);
        game.addPlatform(midLong1);
    }

    for (var i = 1900; i < 2500; i += 70) {
        var midLong2 = new Platform(game, i, 720);
        game.addPlatform(midLong2);
    }

    for (var i = 350; i < 860; i += 70) {
        var wall1 = new Platform(game, 2670, i);
        game.addPlatform(wall1);
    }

    var wallMid1 = new Platform(game, 2740, 690);
    var wallMid2 = new Platform(game, 2810, 690);
    game.addPlatform(wallMid1);
    game.addPlatform(wallMid2);

    for (var i = 2740; i < 3200; i += 70) {
        var wallBase = new Platform(game, i, 830);
        game.addPlatform(wallBase);
    }
    addEnemies(game);
}

var addEnemies = function(game) {
    var snake = new Snake(game, 590, 500, 580, 750);
    game.addEntity(snake);

    var bat = new Bat(game, 500, 100, 50, 600);
    game.addEntity(bat);
}