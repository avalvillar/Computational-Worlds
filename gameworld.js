/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */

function Platform(game, x, y, type) {
    if (type === "cave") {
        this.spritesheet = ASSET_MANAGER.getAsset("./img/cave_rock.png");
    } else if (type === "forestMoss") {
        this.spritesheet = ASSET_MANAGER.getAsset("./img/mossyBlock.png");
    } else if (type === "wood") {
        this.spritesheet = ASSET_MANAGER.getAsset("./img/woodBlock.png");
    } else if (type === "snow") {
        this.spritesheet = ASSET_MANAGER.getAsset("./img/snowBlock.png");
    }
    this.type = type;
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

var setupWorldForest = function (game) {
    ///world creation
    for (var i = -30; i < 1800; i += 70) {
        var initialGround = new Platform(game, i, 860, "forestMoss");
        game.addPlatform(initialGround);
    }
    shipAndPlatforms(game);  //// add the ship and its platforms it sits on. 


    for (var i = 1870; i < 2015; i += 70) {
        var plat1 = new Platform(game, i, 700, "forestMoss");
        game.addPlatform(plat1);
    }
    for (var i = 2150; i < 2300; i += 70) {
        var plat2 = new Platform(game, i, 650, "forestMoss");
        game.addPlatform(plat2);
    }
    for (var i = 2470; i < 2770; i += 70) {
        var plat3 = new Platform(game, i, 600, "forestMoss");
        game.addPlatform(plat3);
    }
    for (var i = 2900; i < 4400; i += 70) {
        var ground = new Platform(game, i, 830, "forestMoss");
        game.addPlatform(ground);
    }
    for (var i = 3500; i < 3800; i += 70) {
        var step1 = new Platform(game, i, 770, "forestMoss");
        game.addPlatform(step1);
    }
    for (var i = 3750; i < 4000; i += 70) {
        var step2 = new Platform(game, i, 720, "forestMoss");
        game.addPlatform(step2);
    }
    for (var i = 3750; i < 4000; i += 70) {
        var underStep2 = new Platform(game, i, 770, "wood");
        game.addPlatform(underStep2);
    }
    for (var i = 4300; i < 4600; i += 70) {
        var highLedge1 = new Platform(game, i, 550, "forestMoss");
        game.addPlatform(highLedge1);
    }
    var topLedge1 = new Platform(game, 4650, 480, "forestMoss");
    game.addPlatform(topLedge1);
    var topLedge2 = new Platform(game, 4720, 480, "forestMoss");
    game.addPlatform(topLedge2);
    var rightLedge1 = new Platform(game, 4790, 670, "forestMoss");
    game.addPlatform(rightLedge1);
    var rightLedge2 = new Platform(game, 4860, 670, "forestMoss");
    game.addPlatform(rightLedge2);
    for (var i = 5300; i < 5800; i += 70) {
        var jumptestTop = new Platform(game, i, 450, "forestMoss");
        game.addPlatform(jumptestTop);
    }
    for (var i = 5100; i < 5800; i += 70) {
        var jumptestBottom = new Platform(game, i, 800, "forestMoss");
        game.addPlatform(jumptestBottom);
    }
    //var jumpSpot = new Platform(game, 5160, 500, "forestMoss");
    //game.addPlatform(jumpSpot);
    var jumpSpot = new Platform(game, 5230, 500, "forestMoss");
    game.addPlatform(jumpSpot);
    for (var i = 5300; i < 5800; i += 70) {
        var jumptestTop2 = new Platform(game, i, 500, "wood");
        game.addPlatform(jumptestTop2);
    }
    for (var i = 5100; i < 5800; i += 70) {
        var jumptestBottom2 = new Platform(game, i, 850, "wood");
        game.addPlatform(jumptestBottom2);
    }
    for (var i = 6100; i < 6400; i += 70) {
        var plat4 = new Platform(game, i, 600, "forestMoss");
        game.addPlatform(plat4);
    }
    for (var i = 6600; i < 6700; i += 70) {
        var plat5 = new Platform(game, i, 500, "forestMoss");
        game.addPlatform(plat5);
    }
    for (var i = 6900; i < 7300; i += 70) {
        var plat6 = new Platform(game, i, 400, "forestMoss");
        game.addPlatform(plat6);
    }
    for (var i = 7000; i < 7160; i += 70) {
        var plat6lower = new Platform(game, i, 710, "forestMoss");
        game.addPlatform(plat6lower);
    }
    var plat6lower = new Platform(game, 7000, 760, "forestMoss");
    game.addPlatform(plat6lower);
    var plat6lower = new Platform(game, 7070, 760, "wood");
    game.addPlatform(plat6lower);
    var plat6lower = new Platform(game, 7140, 760, "forestMoss");
    game.addPlatform(plat6lower);
    var plat6lower = new Platform(game, 7000, 830, "forestMoss");
    game.addPlatform(plat6lower);
    var plat6lower = new Platform(game, 7070, 830, "forestMoss");
    game.addPlatform(plat6lower);
    var plat6lower = new Platform(game, 7140, 830, "wood");
    game.addPlatform(plat6lower);

    for (var i = 7600; i < 8100; i += 70) {
        var ground2 = new Platform(game, i, 710, "forestMoss");
        game.addPlatform(ground2);
    }
    for (var i = 7500; i < 8300; i += 70) {
        var ground2_2 = new Platform(game, i, 780, "forestMoss");
        game.addPlatform(ground2_2);
    }
    for (var i = 7500; i < 8300; i += 70) {
        var ground2_3 = new Platform(game, i, 850, "wood");
        game.addPlatform(ground2_3);
    }
    var jumpAssist = new Platform(game, 8280, 550, "forestMoss");
    game.addPlatform(jumpAssist);
    var endPlat = new Platform(game, 8430, 500, "forestMoss");
    game.addPlatform(endPlat);


    for (var i = 9130; i < 9300; i += 70) {
        var endPlat2 = new Platform(game, i, 640, "forestMoss");
        game.addPlatform(endPlat2);
    }
    for (var i = 8920; i < 9100; i += 70) {
        var endPlat2 = new Platform(game, i, 570, "forestMoss");
        game.addPlatform(endPlat2);
    }

    for (var i = 8500; i < 8900; i += 70) {
        var endPlat = new Platform(game, i, 500, "forestMoss");
        game.addPlatform(endPlat);
    }

    for (var i = 0; i < 850; i += 70) {
        var initialWall = new Platform(game, -69, i, "wood");
        game.addPlatform(initialWall);
    }
    for (var i = 750; i < 900; i += 70) {
        var underPlat1 = new Platform(game, 1940, i, "wood");
        game.addPlatform(underPlat1);
    }
    for (var i = 700; i < 900; i += 70) {
        var underPlat2 = new Platform(game, 2250, i, "wood");
        game.addPlatform(underPlat2);
    }
    for (var i = 700; i < 900; i += 70) {
        var underPlat2_2 = new Platform(game, 2190, i, "wood");
        game.addPlatform(underPlat2_2);
    }
    for (var i = 670; i < 900; i += 70) {
        var underPlat3 = new Platform(game, 2535, i, "wood");
        game.addPlatform(underPlat3);
    }
    for (var i = 670; i < 900; i += 70) {
        var underPlat3_2 = new Platform(game, 2605, i, "wood");
        game.addPlatform(underPlat3_2);
    }
    for (var i = 670; i < 900; i += 70) {
        var underPlat3_3 = new Platform(game, 2675, i, "wood");
        game.addPlatform(underPlat3_3);
    }
    for (var i = 550; i < 900; i += 70) {
        var midLedge1 = new Platform(game, 4650, i, "wood");
        game.addPlatform(midLedge1);
    }
    for (var i = 550; i < 900; i += 70) {
        var midLedge2 = new Platform(game, 4720, i, "wood");
        game.addPlatform(midLedge2);
    }
    for (var i = 500; i < 900; i += 70) {
        var jumptestConnect = new Platform(game, 5790, i, "wood");
        game.addPlatform(jumptestConnect);
    }
    for (var i = 500; i < 900; i += 70) {
        var jumptestConnect2 = new Platform(game, 5720, i, "wood");
        game.addPlatform(jumptestConnect2);
    }
    
    for (var i = 640; i < 900; i += 70) {
        var underPlat4 = new Platform(game, 6210, i, "wood");
        game.addPlatform(underPlat4);
    }
    for (var i = 640; i < 900; i += 70) {
        var underPlat4_2 = new Platform(game, 6280, i, "wood");
        game.addPlatform(underPlat4_2);
    }
    for (var i = 550; i < 900; i += 70) {
        var underPlat5 = new Platform(game, 6635, i, "wood");
        game.addPlatform(underPlat5);
    }
    for (var i = 450; i < 900; i += 70) {
        var underPlat6 = new Platform(game, 6950, i, "wood");
        game.addPlatform(underPlat6);
    }
    for (var i = 450; i < 900; i += 70) {
        var underPlat6_2 = new Platform(game, 7210, i, "wood");
        game.addPlatform(underPlat6_2);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8430, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8500, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8570, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8640, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8710, i, "forestMoss");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8780, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8850, i, "wood");
        game.addPlatform(underEndPlat);
    }//
    for (var i = 570; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8920, i, "forestMoss");
        game.addPlatform(underEndPlat);
    }
    for (var i = 590; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 8990, i, "wood");
        game.addPlatform(underEndPlat);
    }
    for (var i = 600; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9060, i, "forestMoss");
        game.addPlatform(underEndPlat);
    }
    for (var i = 650; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9130, i, "forestMoss");
        game.addPlatform(underEndPlat);
    }
    for (var i = 670; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9200, i, "cave");
        game.addPlatform(underEndPlat);
    }
    for (var i = 650; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9270, i, "forestMoss");
        game.addPlatform(underEndPlat);
    }
    //  cave transistions.
    for (var i = 0; i < 475; i += 70) {
        var underEndPlat = new Platform(game, 9450, i, "cave");
        game.addPlatform(underEndPlat);
    }
    for (var i = 0; i < 500; i += 70) {
        var underEndPlat = new Platform(game, 9520, i, "cave");
        game.addPlatform(underEndPlat);
    }
    for (var i = 0; i < 525; i += 70) {
        var underEndPlat = new Platform(game, 9590, i, "cave");
        game.addPlatform(underEndPlat);
    }
    for (var i = 680; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9340, i, "cave");
        game.addPlatform(underEndPlat);
    }
    for (var i = 720; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9410, i, "wood");
        game.addPlatform(underEndPlat);
    }

    //cave ground
    for (var i = 9550; i < 10500; i += 70) {
        var caveGround = new Platform(game, i, 830, "cave");
        game.addPlatform(caveGround);
    }
    for (var i = 760; i < 900; i += 70) {
        var underEndPlat = new Platform(game, 9480, i, "cave");
        game.addPlatform(underEndPlat);
    }

    //cave ceiling block
    for (var i = 9660; i < 10500; i += 70) {
        for (var j = 0; j < 620; j += 70) {
            var caveRoof = new Platform(game, i, j, "cave");
            game.addPlatform(caveRoof);
        }
    }


    bg = new Background(game, ASSET_MANAGER.getAsset("./img/forestBG.jpg"), 2100, 900);
    game.setBackground(bg);

    addForestEnemies(game);

}

var addForestEnemies = function (game) {
    var spider1 = new Spider(game, 3800, 600, 250, 600);
    game.addEntity(spider1);
    var spider2 = new Spider(game, 4480, 700, 620, 900);
    game.addEntity(spider2);
    var spider3 = new Spider(game, 5250, 575, 570, 725);
    game.addEntity(spider3);
    var spider4 = new Spider(game, 5500, 300, 100, 400);
    game.addEntity(spider4);
    var spider5 = new Spider(game, 6620, 100, 100, 440);
    game.addEntity(spider5);
    var spider6 = new Spider(game, 7400, 500, 100, 700);
    game.addEntity(spider6);
    var spider7 = new Spider(game, 8000, 500, 200, 600);
    game.addEntity(spider7);

    var plant1 = new Plant(game, 3400, 670);
    game.addEntity(plant1);
    var plant2 = new Plant(game, 4050, 670);
    game.addEntity(plant2);
    var plant3 = new Plant(game, 4665, 320);
    game.addEntity(plant3);
    var plant4 = new Plant(game, 5550, 640);
    game.addEntity(plant4);
    var plant5 = new Plant(game, 6230, 440);
    game.addEntity(plant5);
    var plant6 = new Plant(game, 7070, 550);
    game.addEntity(plant6);
    var plant6 = new Plant(game, 7700, 550);
    game.addEntity(plant6);
}

var setupWorldCave = function (game) {
    ///world creation

    for (var i = 7350; i < 8200; i += 70) {
        var groundLine2 = new Platform(game, i, 830, "cave");
        game.addPlatform(groundLine2);
    }

    for (var i = 760; i < 840; i += 70) {
        var groundBend = new Platform(game, 8200, i, "cave");
        game.addPlatform(groundBend);
    }

    for (var i = 9500; i < 12000; i += 70) {
        var ground3 = new Platform(game, i, 830, "cave");
        game.addPlatform(ground3);
    }

    for (var i = 6600; i < 7250; i += 70) {
        var underBridge1 = new Platform(game, i, 830, "cave");
        game.addPlatform(underBridge1);
    }

    for (var i = 740; i < 860; i += 70) {
        var underBridge1 = new Platform(game, 7230, i, "cave");
        game.addPlatform(underBridge1);
    }

    for (var i = 6300; i < 6580; i += 70) {
        var bigGap = new Platform(game, i, 830, "cave");
        game.addPlatform(bigGap);
    }

    for (var i = 3550; i < 4200; i += 70) {
        var groundLine = new Platform(game, i, 830, "cave");
        game.addPlatform(groundLine);
    }

    for (var i = 2740; i < 3200; i += 70) {
        var wallBase = new Platform(game, i, 830, "cave");
        game.addPlatform(wallBase);
    }

    for (var i = 1140; i < 1400; i += 70) {
        var ground2 = new Platform(game, i, 830, "cave");
        game.addPlatform(ground2);
    }

    for (var i = -30; i < 660; i += 70) {
        var ground1 = new Platform(game, i, 830, "cave");
        game.addPlatform(ground1);
    }

    var wallMid1 = new Platform(game, 2740, 690, "cave");
    var wallMid2 = new Platform(game, 2810, 690, "cave");
    var wallMid3 = new Platform(game, 2680, 690, "cave");
    game.addPlatform(wallMid3);
    game.addPlatform(wallMid1);
    game.addPlatform(wallMid2);

    for (var i = 690; i < 830; i += 70) {
        for (var j = 3550; j < 3900; j += 70) {
            var groundBlock = new Platform(game, j, i, "cave");
            game.addPlatform(groundBlock);
        }
    }

    var bend1 = new Platform(game, 3350, 600, "cave");
    var bend2 = new Platform(game, 3420, 600, "cave");
    game.addPlatform(bend1);
    game.addPlatform(bend2);

    for (var i = 10400; i < 10600; i += 70) {
        var bossPlatform = new Platform(game, i, 600, "cave");
        game.addPlatform(bossPlatform);
    }

    for (var i = 10070; i < 10210; i += 70) {
        var bossPlatform1 = new Platform(game, i, 400, "cave");
        game.addPlatform(bossPlatform1);
    }

    for (var i = 10800; i < 11300; i += 70) {
        var bossPlatform2 = new Platform(game, i, 400, "cave");
        game.addPlatform(bossPlatform2);
    }


    for (var i = 0; i < 12000; i += 70) {
        var ceiling = new Platform(game, i, 0, "cave");
        game.addPlatform(ceiling);
    }

    for (var i = 0; i < 900; i += 70) {
        var startWall = new Platform(game, -60, i, "cave");
        game.addPlatform(startWall);
    }

    for (var i = 580; i < 790; i += 70) {
        var mid = new Platform(game, i, 610, "cave");
        game.addPlatform(mid);
    }

    var mid1 = new Platform(game, 1520, 600, "cave");
    var mid2 = new Platform(game, 1590, 600, "cave");
    game.addPlatform(mid1);
    game.addPlatform(mid2);

    var mid3 = new Platform(game, 1680, 400, "cave");
    game.addPlatform(mid3);

    for (var i = 2320; i < 2500; i += 70) {
        var midLong1 = new Platform(game, i, 630, "cave");
        game.addPlatform(midLong1);
    }

    for (var i = 1900; i < 2500; i += 70) {
        var midLong2 = new Platform(game, i, 720, "cave");
        game.addPlatform(midLong2);
    }

    for (var i = 420; i < 860; i += 70) {
        var wall1 = new Platform(game, 2670, i, "cave");
        game.addPlatform(wall1);
    }

    var bendUp = new Platform(game, 3420, 390, "cave");
    var bendUp2 = new Platform(game, 3420, 460, "cave");
    var bendUp3 = new Platform(game, 3420, 530, "cave");
    game.addPlatform(bendUp);
    game.addPlatform(bendUp2);
    game.addPlatform(bendUp3);

    for (var i = 3490; i < 3700; i += 70) {
        var bendLine = new Platform(game, i, 390, "cave");
        game.addPlatform(bendLine);
    }

    var smallBlock = new Platform(game, 4200, 500, "cave");
    var smallBlock2 = new Platform(game, 4270, 500, "cave");
    game.addPlatform(smallBlock);
    game.addPlatform(smallBlock2);

    for (var i = 4600; i < 5100; i += 70) {
        var freeLine = new Platform(game, i, 600, "cave");
        game.addPlatform(freeLine);
    }

    var connectBlock = new Platform(game, 5090, 530, "cave");
    game.addPlatform(connectBlock);

    for (var i = 5090; i < 5600; i += 70) {
        var freeLine2 = new Platform(game, i, 460, "cave");
        game.addPlatform(freeLine2);
    }

    var singleBlock = new Platform(game, 5900, 830, "cave");
    game.addPlatform(singleBlock);

    for (var i = 690; i < 830; i += 70) {
        var gapWall = new Platform(game, 6510, i, "cave");
        game.addPlatform(gapWall);
    }

    for (var i = 530; i < 670; i += 70) {
        var snakeBridge1 = new Platform(game, 6720, i, "cave");
        game.addPlatform(snakeBridge1);
    }

    for (var i = 6720; i < 7000; i += 70) {
        var snakeBridge1 = new Platform(game, i, 530, "cave");
        game.addPlatform(snakeBridge1);
    }

    for (var i = 530; i < 670; i += 70) {
        var snakeBridge1 = new Platform(game, 7000, i, "cave");
        game.addPlatform(snakeBridge1);
    }

    for (var i = 7300; i < 8000; i += 70) {
        var highLine = new Platform(game, i, 350, "cave");
        game.addPlatform(highLine);
    }

    var singleBlock2 = new Platform(game, 7100, 400, "cave");
    game.addPlatform(singleBlock2);

    var singleBlock3 = new Platform(game, 8200, 760, "cave");
    game.addPlatform(singleBlock3);
    var singleBlock4 = new Platform(game, 8200, 690, "cave");
    game.addPlatform(singleBlock4);

    for (var i = 8270; i < 8500; i += 70) {
        var groundUp = new Platform(game, i, 690, "cave");
        game.addPlatform(groundUp);
    }

    for (var i = 480; i < 760; i += 70) {
        var deadEnd = new Platform(game, 8700, i, "cave");
        game.addPlatform(deadEnd);
    }

    for (var i = 8200; i < 8420; i += 70) {
        var upperLine = new Platform(game, i, 350, "cave");
        game.addPlatform(upperLine);
    }

    for (var i = 8700; i < 9000; i += 70) {
        var upperLine2 = new Platform(game, i, 400, "cave");
        game.addPlatform(upperLine2);
    }

    for (var i = 9300; i < 9800; i += 70) {
        var blockJump = new Platform(game, i, 300, "cave");
        game.addPlatform(blockJump);
    }

    for (var i = 9300; i < 9600; i += 70) {
        var blockJump2 = new Platform(game, i, 370, "cave");
        game.addPlatform(blockJump2);
    }

    for (var i = 70; i < 600; i += 70) {
        var bigWall = new Platform(game, 10000, i, "cave");
        game.addPlatform(bigWall);
    }

    for (var i = 70; i < 900; i += 70) {
        var endWall = new Platform(game, 11030, i, "cave");
        game.addPlatform(endWall);
    }

    for (var i = 0; i < 9000; i += 325) {
        var caveLava = new Lava(game, i, 850);
        game.addDeco(caveLava);
    }

    bg = new Background(game, ASSET_MANAGER.getAsset("./img/cave-full.png"), 12000, 900);
    game.setBackground(bg);

    var caveShipPart = new shipPart(game, 10500, 660);
    game.addDeco(caveShipPart);

    addCaveEnemies(game);
}

var addCaveEnemies = function (game) {
    for (var i = 9000; i < 12000; i += 325) {
        for (var j = 1300; j >= 840; j-= 150) {
            var caveLava = new Lava(game, i, j);
            game.addEntity(caveLava);
        }
    }
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
    var bat2 = new Bat(game, 1100, 675, 950, 1400);
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

var shipAndPlatforms = function (game) {
    /// ship
    var ship1 = new ship(game, 0, 50);
    game.addDeco(ship1);
    ///ship platforms
    for (var i = 45; i < 500; i += 70) {
        var initialGround = new Platform(game, i, 640, "forestMoss");
        game.addPlatform(initialGround);
    }
    for (var i = 20; i < 525; i += 70) {
        var initialGround2 = new Platform(game, i, 690, "forestMoss");
        game.addPlatform(initialGround2);
    }
    for (var i = -10; i < 575; i += 70) {
        var initialGround3 = new Platform(game, i, 750, "forestMoss");
        game.addPlatform(initialGround3);
    }
    for (var i = -10; i < 575; i += 70) {
        var initialGround4 = new Platform(game, i, 810, "forestMoss");
        game.addPlatform(initialGround4);
    }
}

var setupWorldCaveSnowTransition = function (game) {

    //var openingSnow = new Snow(game, 10930, 700);
    //game.addEntity(openingSnow);

    for (var i = 9500; i < 10930; i += 70) {
        var ground3 = new Platform(game, i, 830, "cave");
        game.addPlatform(ground3);
    }
    for (var i = 10930; i < 12000; i += 70) {
        var ground3 = new Platform(game, i, 830, "snow");
        game.addPlatform(ground3);
    }
    for (var i = 0; i < 12000; i += 70) {
        var ceiling = new Platform(game, i, 0, "cave");
        game.addPlatform(ceiling);
    }


    for (var i = 10400; i < 10600; i += 70) {
        var bossPlatform = new Platform(game, i, 600, "cave");
        game.addPlatform(bossPlatform);
    }

    for (var i = 10070; i < 10210; i += 70) {
        var bossPlatform1 = new Platform(game, i, 400, "cave");
        game.addPlatform(bossPlatform1);
    }

    for (var i = 10800; i < 11300; i += 70) {
        var bossPlatform2 = new Platform(game, i, 400, "cave");
        game.addPlatform(bossPlatform2);
    }

    for (var i = 70; i < 900; i += 70) {
        var bigWall = new Platform(game, 10000, i, "cave");
        game.addPlatform(bigWall);
    }
    for (var i = 70; i < 690; i += 70) {
        var endWall = new Platform(game, 11030, i, "cave");
        game.addPlatform(endWall);
    }
}

var setupWorldSnow = function (game) {
    for (var i = 0; i < 500; i+=495) {
        for (var j = 0; j < 900; j+=300) {
            var snowFX = new Snow(game, i, j);
            game.addEntity(snowFX);
        }
    }

    for (var i = 0; i < 900; i += 50) {
        var initialWall = new Platform(game, -68, i, "cave");
        game.addPlatform(initialWall);
    }
    for (var i = 0; i < 150; i += 70) {
        var startPlat = new Platform(game, i, 200, "snow");
        game.addPlatform(startPlat);
    }
    for (var i = 700; i < 850; i += 70) {
        var plat2 = new Platform(game, i, 450, "snow");
        game.addPlatform(plat2);
    }
    for (var i = 1000; i < 1150; i += 70) {
        var plat3 = new Platform(game, i, 300, "snow");
        game.addPlatform(plat3);
    }
    for (var i = 1500; i < 1650; i += 70) {
        var plat4 = new Platform(game, i, 260, "snow");
        game.addPlatform(plat4);
    }
    for (var i = 2000; i < 3200; i += 70) {
        var plat5 = new Platform(game, i, 600, "snow");
        game.addPlatform(plat5);
    }
    for (var i = 2350; i < 2700; i += 70) {
        var plat6 = new Platform(game, i, 550, "snow");
        game.addPlatform(plat6);
    }
    for (var i = 2490; i < 2700; i += 70) {
        var plat7 = new Platform(game, i, 490, "snow");
        game.addPlatform(plat7);
    }

    var plat8 = new Platform(game, 3400, 400, "snow");
    game.addPlatform(plat8);
    var plat9 = new Platform(game, 3700, 300, "snow");
    game.addPlatform(plat9);
    var decoy = new Platform(game, 4150, 150, "snow");
    game.addPlatform(decoy);
    for (var i = 4400; i < 5000; i += 70) {
        var walkway = new Platform(game, i, 425, "snow");
        game.addPlatform(walkway);
    }
    for (var i = 3600; i < 5610; i += 400) {
        var hidden = new Platform(game, i, 897, "snow");
        game.addPlatform(hidden);
    }
    var singleStep = new Platform(game, 5750, 897, "snow");
    game.addPlatform(singleStep);
    for (var i = 5300; i < 5650; i += 70) {
        var backTrack1 = new Platform(game, i, 500, "snow");
        game.addPlatform(backTrack1);
    }
    for (var i = 5300; i < 6800; i += 70) {
        var largeWalk = new Platform(game, i, 250, "snow");
        game.addPlatform(largeWalk);
    }
    var backSingle = new Platform(game, 5950, 650, "snow");
    game.addPlatform(backSingle);

    

    

    bg = new Background(game, ASSET_MANAGER.getAsset("./img/snowBG.jpg"), 9000, 900)
    game.setBackground(bg);

    addSnowEnemies(game);
}

var addSnowEnemies = function (game) {
    var smallYeti1 = new smallYeti(game, 1100, 210);
    game.addEntity(smallYeti1);
    var smallYeti1 = new smallYeti(game, 1600, 170);
    game.addEntity(smallYeti1);
    var smallYeti1 = new smallYeti(game, 2345, 470);
    game.addEntity(smallYeti1);
    var smallYeti1 = new smallYeti(game, 5480, 410);
    game.addEntity(smallYeti1);
    var smallYeti1 = new smallYeti(game, 5300, 410);
    game.addEntity(smallYeti1);

    //var yeti1 = new Yeti(game, 400, 628, 150, 700);
    //game.addEntity(yeti1);

}