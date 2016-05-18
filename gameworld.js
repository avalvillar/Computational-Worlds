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

    Entity.prototype.draw.call(this, cameraX, cameraY);
    this.game.ctx.drawImage(this.spritesheet,
                 this.x + cameraX, this.y - cameraY, 70, 70);
    
}

var setupWorld = function (game) {
    for (var i = 0; i < 400; i+=70) {
        var ground = new Platform(game, i, 530);
        game.addPlatform(ground);
    }
    
    for (var i = 600; i > 0; i -= 70) {
        var wall = new Platform(game, 0, i);
        game.addPlatform(wall);
    }
   /* for (var i = 600; i > 0; i -= 70) {
        var wall = new Platform(game, 1000, i);
        game.addPlatform(wall);
    }*/

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
    }
}