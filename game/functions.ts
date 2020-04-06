
import {board, customer, buttonText, mouse} from "./gameObject";
import {DrawElements} from "./DRAW_ELEMENTS";
import {canvas, context, widthButton, yButton1, marginLeft, marginTop, lineHeight, answer, dialog} from "./game";
import {checkGameProcess, endOfGame} from "./CHARACTER_WINDOW";

let countIndex = 0;     //Счётчик индекса, который позваляет отпределить уникальный ответ для 4 кнопки
export let countPlayer = 0;    //Количество очков у игрока
let answerButton: number[] = [0, 0, 0, 0, 0];   //хранит значение очков за ответ. [0] - всегда пустой, [1] - первая кнопка, [2] - вторая кнопка ...

let Draw = new DrawElements();

export let max: number = 1;    //Максимальное значенние рандомного числа, используемового для получения случайного ответа
export let min: number = 0;

export let typeAnswer: string;
export let answerCustomer: string;
export let textCustomer = "";
export let linkNextAnswerCustomer;

export function random(min,max): number
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Перерисовывает элеенты после выбора ответа
function redrawing(canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number): void {
    let ctx = canvas.getContext('2d');
    let image = new Image();
    ctx.clearRect(x, y, width, height);

    Draw.flag = false;
    Draw.drawBoard(canvas, board.url);
    Draw.drawCustomer(canvas, customer.url, 250, 300);
    Draw.drawButton(canvas, 5, yButton1, widthButton, 90);
    Draw.drawButton(canvas, widthButton + 15, yButton1, widthButton, 90);
    Draw.drawButton(canvas, 5, yButton1 + 100, widthButton, 90);
    Draw.drawButton(canvas, widthButton + 15, yButton1 + 100, widthButton, 90);

    Draw.textIn(context, buttonText.button1, marginLeft, yButton1 + lineHeight, widthButton, lineHeight, "center");
    Draw.textIn(context, buttonText.button2, (marginLeft + widthButton + 15), yButton1 + lineHeight, widthButton, lineHeight, "center");
    Draw.textIn(context, buttonText.button3, marginLeft, yButton1 + 90 + 25, widthButton, lineHeight, "center");
    Draw.textIn(context, buttonText.button4, (marginLeft + widthButton + 15), yButton1 + 90 + 25, widthButton, lineHeight, "center");
}

//Реакция на щелчок мышки по окну игры
export function mouseCanvas() {
    canvas.addEventListener("mousedown", function (e) {

        // mouse.x = e.pageX - this.offsetLeft;
        // mouse.y = e.pageY - this.offsetTop;

        mouse.x = e.offsetX==undefined?e.layerX:e.offsetX;
        mouse.y = e.offsetY==undefined?e.layerY:e.offsetY;
        console.log('MOUSE');
        console.log( mouse.x + ' ' + mouse.y + ' !!!');
        let endGame = endOfGame();
        if (endGame == false) {
            if ((mouse.x > 5) && (mouse.x < widthButton + 5) && (mouse.y > yButton1) && (mouse.y < yButton1 + 90)) {
                // console.log('0 0 true');
                dialog.check(0);
                checkGameProcess();
                dialog.fillTextButton(dialog.linkAnswerSeller);
                redrawing(canvas, 5, yButton1, widthButton, 90);
            }
            if ((mouse.x > widthButton + 15) && (mouse.x < board.width - 5) && (mouse.y > yButton1) && (mouse.y < yButton1 + 90)) {
                // console.log('0 1 true')
                dialog.check(1);
                checkGameProcess();
                dialog.fillTextButton(dialog.linkAnswerSeller);
                redrawing(canvas, 5, yButton1, widthButton, 90);
            }
            if ((mouse.x > 5) && (mouse.x < widthButton + 5) && (mouse.y > yButton1 + 105) && (mouse.y < board.height - 5)) {
                // console.log('1 0 true');
                dialog.check(2);
                checkGameProcess();
                dialog.fillTextButton(dialog.linkAnswerSeller);
                redrawing(canvas, 5, yButton1, widthButton, 90);
            }
            if ((mouse.x > widthButton + 15) && (mouse.x < board.width - 5) && (mouse.y > yButton1 + 105) && (mouse.y < board.height - 5)) {
                // console.log('1 1 true')
                dialog.check(3);
                checkGameProcess();
                dialog.fillTextButton(dialog.linkAnswerSeller);
                redrawing(canvas, 5, yButton1, widthButton, 90);
            }
        }
        checkGameProcess();
    })

}
