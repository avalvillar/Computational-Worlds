/*
 * Red Three - Spring 2016
 * Antonio Alvillar - Andy Bleich - Bethany Eastman - Gabriel Houle
 * video - https://youtu.be/s_43VZBxWXk
 */

/**************************************************************************
    Level Complete - screen pops up after boss battle.
 */


 // add debug button

 // add kill count element

 // add death count element

 // FINAL EXAM
 // 20 short answer , from the sides
 // 3 long answer
 // animation - calculate sprite sheet
 // collision detection - true false , do elements collide
 // saving a state 

var levelOneText = function (ctx) {
    var textX = (document.getElementById("gameWorld").width / 2);
    var textY = (document.getElementById("gameWorld").height / 2);
    ctx.font = "60pt Courier new";
    ctx.textAlign= "center";
    ctx.lineWidth = 4;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.strokeText("LEVEL COMPLETE", textX, textY);
    ctx.fillText("LEVEL COMPLETE", textX, textY);
};