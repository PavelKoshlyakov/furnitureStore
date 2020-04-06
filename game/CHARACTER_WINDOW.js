"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameObject_1 = require("./gameObject");
var DRAW_ELEMENTS_1 = require("./DRAW_ELEMENTS");
var game_1 = require("./game");
exports.characterWindow = document.getElementById("characterWindow");
var text_customer = document.getElementById("text_customer");
// characterWindow.style.left = board.width + 30 + "px";
exports.characterWindow.style.marginTop = "10px";
exports.characterWindow.innerHTML = 'Счёт игрока:   0';
exports.characterWindow.style.border = "0px";
var Draw = new DRAW_ELEMENTS_1.DrawElements();
var endGameFlag = false;
function checkGameProcess() {
    exports.characterWindow.innerHTML = 'Счёт игрока:   ' + game_1.dialog.countPlayer;
    text_customer.innerText = game_1.dialog.textCustomer;
    if (game_1.dialog.countPlayer < 0 || game_1.dialog.end == true) {
        gameOver();
        console.log("       GAME OVER");
    }
    if (endGameFlag == true) {
        exports.characterWindow.innerHTML = 'Счёт игрока:';
    }
}
exports.checkGameProcess = checkGameProcess;
function gameOver() {
    game_1.context.fillStyle = "rgba(0,0,0)";
    game_1.context.clearRect(0, 0, gameObject_1.board.width, gameObject_1.board.height);
    game_1.context.fillRect(0, 0, gameObject_1.board.width, gameObject_1.board.height);
    var text = 'Клиент ушёл, вы проиграли';
    game_1.context.font = "32pt Calibri";
    game_1.context.fillStyle = 'white';
    game_1.context.fillText(text, gameObject_1.board.width / 2 - game_1.context.measureText(text).width / 2, gameObject_1.board.height / 2);
    endGameFlag = true;
}
function endOfGame() {
    if (endGameFlag == true) {
        return true;
    }
    else {
        return false;
    }
}
exports.endOfGame = endOfGame;
