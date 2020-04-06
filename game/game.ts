import {DrawElements} from "./DRAW_ELEMENTS";
import {mouseCanvas, random} from "./functions";
import {board, customer, buttonText} from "./gameObject";
import {checkGameProcess} from "./CHARACTER_WINDOW";
import {Dialog} from "./DIALOG";



//----------------------------------------------------------------------------------------------------------------------

export let widthButton = board.width/2 - 10;
export let yButton1 = board.height - 200 + 5;
export let yButton2 = board.height - 60 + 5;

export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("gameboard");
export let context = canvas.getContext("2d");
let Draw = new DrawElements();

let socket = new WebSocket('ws://localhost:3000');

let socketSendMessage = function (data) {
    if (!socket.readyState) {
        setTimeout(function () {
            socketSendMessage(data);
        }, 100);
    } else {
        socket.send(data);
    }
};

socketSendMessage(JSON.stringify({
    operation: "game_size",
    username: document.getElementById("username").innerText
}));

socket.onmessage = function (event) {
    let message = JSON.parse(event.data);
    if (message.operation == "game_size"){
        console.log('----------------------');
        console.log(message);
        canvas.style.height = message.height + "px";
        canvas.style.width = message.width + "px;";
        canvas.style.position = "absolute";
        canvas.style.marginTop = '10px';
        canvas.style.marginLeft = "auto";
        canvas.style.marginRight = "auto";
    }
};






export let answer: number[] = [];

export let dialog = new Dialog();
dialog.fillTextButton();

export let lineHeight = 20;    //межстрочный интервал
/*если мы знаем высоту текста, то мы можем
предположить, что высота строки должна быть именно такой*/
export let marginLeft = 5;    //отступ слева
export let marginTop = 40;


Draw.drawBoard(canvas, board.url);
Draw.drawCustomer(canvas, customer.url, 250, 300);
Draw.drawButton(canvas, 5, yButton1, widthButton, 90);
Draw.drawButton(canvas, 5, yButton1 + 100, widthButton, 90);
Draw.drawButton(canvas, widthButton + 15, yButton1, widthButton, 90);
Draw.drawButton(canvas, widthButton + 15, yButton1 + 100, widthButton, 90);

// Draw.textIn(context, buttonText.button1, marginLeft, yButton1 + lineHeight, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button2, (marginLeft + widthButton + 15), yButton1 + lineHeight, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button3, marginLeft, yButton1 + 90 + 25, widthButton, lineHeight,"center");
// Draw.textIn(context, buttonText.button4, (marginLeft + widthButton + 15), yButton1 + 90 + 25, widthButton, lineHeight,"center");
Draw.textIn(context, buttonText.button1, marginLeft, yButton1 + lineHeight, widthButton, lineHeight, "center");
Draw.textIn(context, buttonText.button2, (marginLeft + widthButton + 15), yButton1 + lineHeight, widthButton, lineHeight, "center");
Draw.textIn(context, buttonText.button3, marginLeft, yButton1 + 90 + 25, widthButton, lineHeight, "center");
Draw.textIn(context, buttonText.button4, (marginLeft + widthButton + 15), yButton1 + 90 + 25, widthButton, lineHeight, "center");
mouseCanvas();


let xmlTest = new XMLHttpRequest();
xmlTest.open("GET", './.xml', false);
xmlTest.open("GET", './DialogList/step' + 3 + '.xml', false);
xmlTest.send();
console.log("START " + xmlTest.responseXML.getElementsByTagName("seller")[0].getElementsByTagName("phrase")[1].getElementsByTagName("step")[0].innerHTML);
//
// aaa = xmlTest.responseXML.getElementsByTagName("phrase");
// console.log("aaa " + aaa[5].children[0].innerHTML);