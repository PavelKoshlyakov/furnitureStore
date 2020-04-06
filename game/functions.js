"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameObject_1 = require("./gameObject");
var DRAW_ELEMENTS_1 = require("./DRAW_ELEMENTS");
var game_1 = require("./game");
var CHARACTER_WINDOW_1 = require("./CHARACTER_WINDOW");
var countIndex = 0; //Счётчик индекса, который позваляет отпределить уникальный ответ для 4 кнопки
exports.countPlayer = 0; //Количество очков у игрока
var answerButton = [0, 0, 0, 0, 0]; //хранит значение очков за ответ. [0] - всегда пустой, [1] - первая кнопка, [2] - вторая кнопка ...
var Draw = new DRAW_ELEMENTS_1.DrawElements();
exports.max = 1; //Максимальное значенние рандомного числа, используемового для получения случайного ответа
exports.min = 0;
exports.textCustomer = "";
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.random = random;
//Перерисовывает элеенты после выбора ответа
function redrawing(canvas, x, y, width, height) {
    var ctx = canvas.getContext('2d');
    var image = new Image();
    ctx.clearRect(x, y, width, height);
    Draw.flag = false;
    Draw.drawBoard(canvas, gameObject_1.board.url);
    Draw.drawCustomer(canvas, gameObject_1.customer.url, 250, 300);
    Draw.drawButton(canvas, 5, game_1.yButton1, game_1.widthButton, 90);
    Draw.drawButton(canvas, game_1.widthButton + 15, game_1.yButton1, game_1.widthButton, 90);
    Draw.drawButton(canvas, 5, game_1.yButton1 + 100, game_1.widthButton, 90);
    Draw.drawButton(canvas, game_1.widthButton + 15, game_1.yButton1 + 100, game_1.widthButton, 90);
    Draw.textIn(game_1.context, gameObject_1.buttonText.button1, game_1.marginLeft, game_1.yButton1 + game_1.lineHeight, game_1.widthButton, game_1.lineHeight, "center");
    Draw.textIn(game_1.context, gameObject_1.buttonText.button2, (game_1.marginLeft + game_1.widthButton + 15), game_1.yButton1 + game_1.lineHeight, game_1.widthButton, game_1.lineHeight, "center");
    Draw.textIn(game_1.context, gameObject_1.buttonText.button3, game_1.marginLeft, game_1.yButton1 + 90 + 25, game_1.widthButton, game_1.lineHeight, "center");
    Draw.textIn(game_1.context, gameObject_1.buttonText.button4, (game_1.marginLeft + game_1.widthButton + 15), game_1.yButton1 + 90 + 25, game_1.widthButton, game_1.lineHeight, "center");
}
//Реакция на щелчок мышки по окну игры
function mouseCanvas() {
    game_1.canvas.addEventListener("mousedown", function (e) {
        // mouse.x = e.pageX - this.offsetLeft;
        // mouse.y = e.pageY - this.offsetTop;
        gameObject_1.mouse.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        gameObject_1.mouse.y = e.offsetY == undefined ? e.layerY : e.offsetY;
        console.log('MOUSE');
        console.log(gameObject_1.mouse.x + ' ' + gameObject_1.mouse.y + ' !!!');
        var endGame = CHARACTER_WINDOW_1.endOfGame();
        if (endGame == false) {
            if ((gameObject_1.mouse.x > 5) && (gameObject_1.mouse.x < game_1.widthButton + 5) && (gameObject_1.mouse.y > game_1.yButton1) && (gameObject_1.mouse.y < game_1.yButton1 + 90)) {
                // console.log('0 0 true');
                game_1.dialog.check(0);
                CHARACTER_WINDOW_1.checkGameProcess();
                game_1.dialog.fillTextButton(game_1.dialog.linkAnswerSeller);
                redrawing(game_1.canvas, 5, game_1.yButton1, game_1.widthButton, 90);
            }
            if ((gameObject_1.mouse.x > game_1.widthButton + 15) && (gameObject_1.mouse.x < gameObject_1.board.width - 5) && (gameObject_1.mouse.y > game_1.yButton1) && (gameObject_1.mouse.y < game_1.yButton1 + 90)) {
                // console.log('0 1 true')
                game_1.dialog.check(1);
                CHARACTER_WINDOW_1.checkGameProcess();
                game_1.dialog.fillTextButton(game_1.dialog.linkAnswerSeller);
                redrawing(game_1.canvas, 5, game_1.yButton1, game_1.widthButton, 90);
            }
            if ((gameObject_1.mouse.x > 5) && (gameObject_1.mouse.x < game_1.widthButton + 5) && (gameObject_1.mouse.y > game_1.yButton1 + 105) && (gameObject_1.mouse.y < gameObject_1.board.height - 5)) {
                // console.log('1 0 true');
                game_1.dialog.check(2);
                CHARACTER_WINDOW_1.checkGameProcess();
                game_1.dialog.fillTextButton(game_1.dialog.linkAnswerSeller);
                redrawing(game_1.canvas, 5, game_1.yButton1, game_1.widthButton, 90);
            }
            if ((gameObject_1.mouse.x > game_1.widthButton + 15) && (gameObject_1.mouse.x < gameObject_1.board.width - 5) && (gameObject_1.mouse.y > game_1.yButton1 + 105) && (gameObject_1.mouse.y < gameObject_1.board.height - 5)) {
                // console.log('1 1 true')
                game_1.dialog.check(3);
                CHARACTER_WINDOW_1.checkGameProcess();
                game_1.dialog.fillTextButton(game_1.dialog.linkAnswerSeller);
                redrawing(game_1.canvas, 5, game_1.yButton1, game_1.widthButton, 90);
            }
        }
        CHARACTER_WINDOW_1.checkGameProcess();
    });
}
exports.mouseCanvas = mouseCanvas;
