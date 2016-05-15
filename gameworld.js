function Platform(game, x, y) {
    this.spritesheet = ASSET_MANAGER.getAsset("./img/cave_rock.png");
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
    for (var i = 0; i < 500; i+=70) {
        var ground = new Platform(game, i, 530);
        game.addPlatform(ground);
    }

    //var plat = new Platform(game, 700, 350);
    //game.addPlatform(plat);

    for (var i = 800; i < 2000; i += 70) {
        var ground = new Platform(game, i, 530);
        game.addPlatform(ground);
    }
}