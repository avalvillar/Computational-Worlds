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
  /*  for (var i = 0; i < 400; i+=70) {
        var ground = new Platform(game, i, 530);
        game.addPlatform(ground);
    }

    for (var i = 600; i > 0; i -= 70) {
        var wall = new Platform(game, 1000, i);
        game.addPlatform(wall);
    }

    var plat = new Platform(game, 700, 350);
    var plat2 = new Platform(game, 770, 350);
    game.addPlatform(plat);
    game.addPlatform(plat2);

    var plat = new Platform(game, 550, 200);
    var plat2 = new Platform(game, 480, 200);
    game.addPlatform(plat);
    game.addPlatform(plat2);

    var plat = new Platform(game, 400, 350);
    var plat2 = new Platform(game, 330, 350);
    game.addPlatform(plat);
    game.addPlatform(plat2);

    for (var i = 800; i < 2000; i += 70) {
        var ground = new Platform(game, i, 530);
        game.addPlatform(ground);
    }

    for (var i = 0; i < 2000; i += 70) {
        var ceiling = new Platform(game, i, -60);
        game.addPlatform(ceiling);
    } */


    ///world creation
    for (var i = 0; i < 830; i += 70) {
        var startWall = new Platform(game, -60, i);
        game.addPlatform(startWall);
    }

    for (var i = 0; i < 8830; i += 70) {
        var ceiling = new Platform(game, i, 0);
        game.addPlatform(ceiling);
    }

    for (var i = 0; i < 630; i += 70) {
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

    var bend1 = new Platform(game, 3350, 600);
    var bend2 = new Platform(game, 3420, 600);
    game.addPlatform(bend1);
    game.addPlatform(bend2);

    var bendUp = new Platform(game, 3420, 390);
    var bendUp2 = new Platform(game, 3420, 460);
    var bendUp3 = new Platform(game, 3420, 530);
    game.addPlatform(bendUp);
    game.addPlatform(bendUp2);
    game.addPlatform(bendUp3);

    for (var i = 3490; i < 3700; i += 70) {
        var bendLine = new Platform(game, i, 390);
        game.addPlatform(bendLine);
    }

}