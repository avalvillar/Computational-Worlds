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
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 2000, 600);
	if (this.game.startGame) {
		this.titleScreen = false;
		this.removeFromWorld = true;

		//							//
		//		START GAME NOW		//
		//							//
	} else if (this.titleScreen) {
		ctx.fillStyle = "black";
		ctx.font = '50px Courier New';
		ctx.fillText("I'm Not From Here", 390, 200);
		ctx.fillText("Press M To begin", 400 , 300);
		ctx.fillStyle = "red";
		ctx.fillText("Controls Go Here", 400 , 400);
	}
};

StartScreen.prototype.update = function() {
	// if (this.game.buttonPressed == "P") console.log(this.game.buttonPressed);
};

