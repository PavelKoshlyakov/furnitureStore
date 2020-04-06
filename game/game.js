"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DRAW_ELEMENTS_1 = require("./DRAW_ELEMENTS");
var functions_1 = require("./functions");
var gameObject_1 = require("./gameObject");
var DIALOG_1 = require("./DIALOG");
//----------------------------------------------------------------------------------------------------------------------
exports.widthButton = gameObject_1.board.width / 2 - 10;
exports.yButton1 = gameObject_1.board.height - 200 + 5;
exports.yButton2 = gameObject_1.board.height - 60 + 5;
exports.canvas = document.getElementById("gameboard");
exports.context = exports.canvas.getContext("2d");
var Draw = new DRAW_ELEMENTS_1.DrawElements();
var socket = new WebSocket('ws://localhost:3000');
var socketSendMessage = function (data) {
    if (!socket.readyState) {
        setTimeout(function () {
            socketSendMessage(data);
        }, 100);
    }
    else {
        socket.send(data);
    }
};
socketSendMessage(JSON.stringify({
    operation: "game_size",
    username: document.getElementById("username").innerText
}));
socket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    if (message.operation == "game_size") {
        console.log('----------------------');
        console.log(message);
        exports.canvas.style.height = message.height + "px";
        exports.canvas.style.width = message.width + "px;";
        exports.canvas.style.position = "absolute";
        exports.canvas.style.marginTop = '10px';
        exports.canvas.style.marginLeft = "auto";
        exports.canvas.style.marginRight = "auto";
    }
};
exports.answer = [];
exports.dialog = new DIALOG_1.Dialog();
exports.dialog.fillTextButton();
exports.lineHeight = 20; //межстрочный интервал
/*если мы знаем высоту текста, то мы можем
предположить, что высота строки должна быть именно такой*/
exports.marginLeft = 5; //отступ слева
exports.marginTop = 40;
Draw.drawBoard(exports.canvas, gameObject_1.board.url);
Draw.drawCustomer(exports.canvas, gameObject_1.customer.url, 250, 300);
Draw.drawButton(exports.canvas, 5, exports.yButton1, exports.widthButton, 90);
Draw.drawButton(exports.canvas, 5, exports.yButton1 + 100, exports.widthButton, 90);
Draw.drawButton(exports.canvas, exports.widthButton + 15, exports.yButton1, exports.widthButton, 90);
Draw.drawButton(exports.canvas, exports.widthButton + 15, exports.yButton1 + 100, exports.widthButton, 90);
// Draw.textIn(context, buttonText.button1, marginLeft, yButton1 + lineHeight, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button2, (marginLeft + widthButton + 15), yButton1 + lineHeight, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button3, marginLeft, yButton1 + 90 + 25, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button4, (marginLeft + widthButton + 15), yButton1 + 90 + 25, widthButton, lineHeight,"center");
Draw.textIn(exports.context, gameObject_1.buttonText.button1, exports.marginLeft, exports.yButton1 + exports.lineHeight, exports.widthButton, exports.lineHeight, "center");
Draw.textIn(exports.context, gameObject_1.buttonText.button2, (exports.marginLeft + exports.widthButton + 15), exports.yButton1 + exports.lineHeight, exports.widthButton, exports.lineHeight, "center");
Draw.textIn(exports.context, gameObject_1.buttonText.button3, exports.marginLeft, exports.yButton1 + 90 + 25, exports.widthButton, exports.lineHeight, "center");
Draw.textIn(exports.context, gameObject_1.buttonText.button4, (exports.marginLeft + exports.widthButton + 15), exports.yButton1 + 90 + 25, exports.widthButton, exports.lineHeight, "center");
functions_1.mouseCanvas();
var xmlTest = new XMLHttpRequest();
xmlTest.open("GET", './.xml', false);
xmlTest.open("GET", './DialogList/step' + 3 + '.xml', false);
xmlTest.send();
console.log("START " + xmlTest.responseXML.getElementsByTagName("seller")[0].getElementsByTagName("phrase")[1].getElementsByTagName("step")[0].innerHTML);
//
// aaa = xmlTest.responseXML.getElementsByTagName("phrase");
// console.log("aaa " + aaa[5].children[0].innerHTML);
