/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 */

/**************************************************************************
    Start Screen - allows a user to begin the game and shows them
    the controls of the game.
 */

function StartScreen(game) {
	this.titleScreen = true;       // show title screen
	this.controlScreen = false;    // show control screen
	this.game = game;
};

StartScreen.prototype = new Entity();
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.draw = function(ctx) {
    var width = document.getElementById("gameWorld").width;
    var height = document.getElementById("gameWorld").height;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);
	if (this.game.startGame) {
        // start game, remove start screen
		this.titleScreen = false;
		this.removeFromWorld = true;
	} else if (this.titleScreen) {
        // game not started, draw start screen
        centerText(ctx, width, height);
	}
};

StartScreen.prototype.update = function() {
};

// center start screen text on the canvas
var centerText = function (ctx, width, height) {
    ctx.textAlign="center";
    width = width / 2;
    height = height / 9;
    ctx.fillStyle = "darkgrey";
    ctx.font = '50px Courier New';
    ctx.fillText("I'm Not From Here", width, height * 3);
    ctx.fillStyle = "red";
    ctx.font = '40px Courier New';
    ctx.fillText("Press M To begin", width , height * 4);
    ctx.fillStyle = "grey";
    ctx.font = '25px Courier New';
    ctx.fillText("you crashed your ship on a strange alien planet", width , height * 5);
    ctx.fillText("you must continue to survive", width, height * 5.5);
};
