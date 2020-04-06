import {board} from "./gameObject";
import {DrawElements} from "./DRAW_ELEMENTS";
import {canvas, context, dialog} from "./game";

export let characterWindow = document.getElementById("characterWindow");
let text_customer = document.getElementById("text_customer");
// characterWindow.style.left = board.width + 30 + "px";
characterWindow.style.marginTop = "10px";
characterWindow.innerHTML = 'Счёт игрока:   0';
characterWindow.style.border = "0px";

let Draw = new DrawElements();
let endGameFlag = false;

export function checkGameProcess(): void {
    characterWindow.innerHTML = 'Счёт игрока:   ' + dialog.countPlayer;
    text_customer.innerText = dialog.textCustomer;

    if (dialog.countPlayer < 0 || dialog.end == true){
        gameOver();
        console.log("       GAME OVER");
    }
    if (endGameFlag == true){
        characterWindow.innerHTML = 'Счёт игрока:';
    }
}
function gameOver(): void {
    context.fillStyle = "rgba(0,0,0)";
    context.clearRect(0, 0, board.width, board.height);
    context.fillRect(0, 0, board.width, board.height);
    let text: string = 'Клиент ушёл, вы проиграли';
    context.font = "32pt Calibri";
    context.fillStyle = 'white';
    context.fillText(text, board.width/2 - context.measureText(text).width/2, board.height/2);

    endGameFlag = true;
}
export function endOfGame() {
    if (endGameFlag == true){
        return true;
    }
    else {
        return false;
    }
}