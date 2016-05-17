/**************************************************************************
    Start Screen - allows a user to begin the game and showing them
    the controls of the game.
 */

function StartScreen(game) {
	this.titleScreen = true;
	this.controlScreen = false;
	this.game = game;
};

StartScreen.prototype = new Entity();
StartScreen.prototype.constructor = StartScreen;
console.log('making');

StartScreen.prototype.draw = function(ctx) {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 2000, 600);
	if (this.game.startGame) {
		this.titleScreen = false;
		this.removeFromWorld = true;

		//							//
		//		START GAME NOW		//
		//							//
	} else if (this.titleScreen) {
		ctx.fillStyle = "darkgrey";
		ctx.font = '50px Courier New';
		ctx.fillText("I'm Not From Here", 390, 200);
		ctx.fillStyle = "red";
		ctx.font = '40px Courier New';
		ctx.fillText("Press M To begin", 450 , 300);
		ctx.fillStyle = "grey";
		ctx.font = '25px Courier New';
		ctx.fillText("you crashed your ship landed on a strange alien planet", 270 , 400);
		ctx.fillText("you must continue to survive", 430, 450);
	}
};

StartScreen.prototype.update = function() {
};

