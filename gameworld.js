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

Platform.prototype.draw = function (ctx, cameraX, cameraY) {

    Entity.prototype.draw.call(this, ctx, cameraX, cameraY);
    this.game.ctx.drawImage(this.spritesheet,
                 this.x + cameraX, this.y - cameraY, 70, 70);
    
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

    for (var i = 690; i < 830; i += 70) {
        for (var j = 3550; j < 3900; j += 70) {
            var groundBlock = new Platform(game, j, i);
            game.addPlatform(groundBlock);
        }
    }

    for (var i = 3550; i < 4200; i += 70) {
        var groundLine = new Platform(game, i, 830);
        game.addPlatform(groundLine);
    }

    var smallBlock = new Platform(game, 4200, 500);
    var smallBlock2 = new Platform(game, 4270, 500);
    game.addPlatform(smallBlock);
    game.addPlatform(smallBlock2);

    for (var i = 4600; i < 5100; i += 70) {
        var freeLine = new Platform(game, i, 600);
        game.addPlatform(freeLine);
    }

    var connectBlock = new Platform(game, 5090, 530);
    game.addPlatform(connectBlock);

    for (var i = 5090; i < 5600; i += 70) {
        var freeLine2 = new Platform(game, i, 460);
        game.addPlatform(freeLine2);
    }

    var singleBlock = new Platform(game, 5900, 830);
    game.addPlatform(singleBlock);

    for (var i = 6300; i < 6580; i += 70) {
        var bigGap = new Platform(game, i, 830);
        game.addPlatform(bigGap);
    }

    for (var i = 690; i < 830; i += 70) {
        var gapWall = new Platform(game, 6510, i);
        game.addPlatform(gapWall);
    }

    for (var i = 530; i < 670; i += 70) {
        var snakeBridge1 = new Platform(game, 6720, i);
        game.addPlatform(snakeBridge1);
    }

    for (var i = 6720; i < 7000; i += 70) {
        var snakeBridge1 = new Platform(game, i, 530);
        game.addPlatform(snakeBridge1);
    }

    for (var i = 530; i < 670; i += 70) {
        var snakeBridge1 = new Platform(game, 7000, i);
        game.addPlatform(snakeBridge1);
    }

    for (var i = 800; i < 870; i += 70) {
        var underBridge1 = new Platform(game, 6650, i);
        game.addPlatform(underBridge1);
    }

    for (var i = 6650; i < 7150; i += 70) {
        var underBridge1 = new Platform(game, i, 830);
        game.addPlatform(underBridge1);
    }

    for (var i = 740; i < 860; i += 70) {
        var underBridge1 = new Platform(game, 7140, i);
        game.addPlatform(underBridge1);
    }

    for (var i = 7300; i < 8000; i += 70) {
        var highLine = new Platform(game, i, 350);
        game.addPlatform(highLine);
    }

    var singleBlock2 = new Platform(game, 7100, 400);
    game.addPlatform(singleBlock2);

    for (var i = 7350; i < 8000; i += 70) {
        var groundLine2 = new Platform(game, i, 830);
        game.addPlatform(groundLine2);
    }


    addEnemies(game);
}

var addEnemies = function (game) {
    var snake1 = new Snake(game, 550, 800, 10, 620);
    game.addEntity(snake1);
    var snake2 = new Snake(game, 590, 475, 580, 750);
    game.addEntity(snake2);
    var snake3 = new Snake(game, 1530, 490, 1520, 1630);
    game.addEntity(snake3);
    var snake4 = new Snake(game, 2000, 570, 1900, 2500);
    game.addEntity(snake4);
    var snake5 = new Snake(game, 3000, 650, 2750, 3200);
    game.addEntity(snake5);
    var snake6 = new Snake(game, 3500, 300, 3400, 3660);
    game.addEntity(snake6);
    var snake7 = new Snake(game, 3700, 570, 3550, 3850);
    game.addEntity(snake7);
    var snake8 = new Snake(game, 4300, 320, 4190, 4310);
    game.addEntity(snake8);
    var snake9 = new Snake(game, 6400, 800, 6290, 6475);
    game.addEntity(snake9);
    var snake10 = new Snake(game, 6750, 380, 6700, 7030);
    game.addEntity(snake10);
    var snake10 = new Snake(game, 7020, 380, 6700, 7030);
    game.addEntity(snake10);
    var snake11 = new Snake(game, 7600, 200, 7290, 7960);
    game.addEntity(snake11);
    var snake11 = new Snake(game, 7850, 200, 7500, 7960);
    game.addEntity(snake11);
    var snake11 = new Snake(game, 7400, 200, 7290, 7600);
    game.addEntity(snake11);
    var snake11 = new Snake(game, 7500, 200, 7300, 7700);
    game.addEntity(snake11);


    var bat1 = new Bat(game, 600, 450, 500, 1000);
    game.addEntity(bat1);
    var bat2 = new Bat(game, 1100, 700, 950, 1400);
    game.addEntity(bat2);
    var bat3 = new Bat(game, 1400, 300, 1300, 1850);
    game.addEntity(bat3);
    var bat4 = new Bat(game, 1650, 250, 1400, 2200);
    game.addEntity(bat4);
    var bat5 = new Bat(game, 1900, 525, 1750, 2400);
    game.addEntity(bat5);
    var bat6 = new Bat(game, 2500, 275, 2400, 2750);
    game.addEntity(bat6);
    var bat7 = new Bat(game, 3300, 550, 2750, 3300);
    game.addEntity(bat7);
    var bat8 = new Bat(game, 37500, 275, 3300, 3800);
    game.addEntity(bat8);
    var bat9 = new Bat(game, 4100, 700, 3900, 4500);
    game.addEntity(bat9);
    var bat10 = new Bat(game, 6000, 350, 5650, 6300);
    game.addEntity(bat10);
    var bat11 = new Bat(game, 5800, 750, 5500, 6200);
    game.addEntity(bat11);
    var bat12 = new Bat(game, 6500, 550, 6100, 6650);
    game.addEntity(bat12);
    var bat13 = new Bat(game, 6800, 400, 6600, 7000);
    game.addEntity(bat13);
    var bat14 = new Bat(game, 7000, 300, 6700, 7200);
    game.addEntity(bat14);
    var bat15 = new Bat(game, 7200, 225, 7000, 7900);
    game.addEntity(bat15);
}