"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("./text");
var functions_1 = require("./functions");
var gameObject_1 = require("./gameObject");
var Dialog = /** @class */ (function () {
    function Dialog() {
        this.answer = [];
        this.gameStep = 1; //Указатель на номер дивлога
        this.linkStep = 1;
        this.textCustomer = ""; //Ответ покупателя
        this.linkAnswerCustomer = []; //Ссылка на возможные ответы покупателя
        this.linkAnswerSeller = [];
        this.countPlayer = 0; //Счётчик очков игрока
        this.points = [];
        this.transition = [];
        this.end = false;
    }
    Dialog.prototype.fillTextButton = function (idPhrase) {
        if (this.end == false) {
            console.log("       this.end    " + this.end);
            var i = 0;
            //Если функция вызвана впервые, то idPhrase неизвестно => генерируем первые фразы вручную
            if (idPhrase == undefined) {
                idPhrase = text_1.firstRandom();
            }
            // let answer: number[] = [];
            // let id = getIdSeller(this.gameStep, idPhrase); //храним массив id фраз, которые будем выводить
            // let text = getTextSeller(id);   //Получаем вопросы продавца
            // this.linkAnswerCustomer = getNextStep(id);
            // console.log('linkAnswerCustomer ' + this.linkAnswerCustomer);
            text_1.getStep(this.gameStep);
            var idPhrasesSeller = text_1.getPhraseSeller(idPhrase);
            var text = text_1.getTextSeller(idPhrasesSeller);
            this.points = text_1.getPointsPhrase(idPhrasesSeller);
            this.linkAnswerCustomer = text_1.getLinkAnswerCustomer(idPhrasesSeller);
            //Случайным образом выводим текст вопроса на кнопки
            var index = functions_1.random(0, 3);
            gameObject_1.buttonText.button1 = text[index];
            this.answer[0] = index;
            index = functions_1.random(0, 3);
            gameObject_1.buttonText.button2 = text[index];
            while (gameObject_1.buttonText.button2 == gameObject_1.buttonText.button1) {
                index = functions_1.random(0, 3);
                gameObject_1.buttonText.button2 = text[index];
            }
            this.answer[1] = index;
            index = functions_1.random(0, 3);
            gameObject_1.buttonText.button3 = text[index];
            while (gameObject_1.buttonText.button3 == gameObject_1.buttonText.button1 || gameObject_1.buttonText.button3 == gameObject_1.buttonText.button2) {
                index = functions_1.random(0, 3);
                gameObject_1.buttonText.button3 = text[index];
            }
            this.answer[2] = index;
            index = functions_1.random(0, 3);
            gameObject_1.buttonText.button4 = text[index];
            while (gameObject_1.buttonText.button4 == gameObject_1.buttonText.button1 || gameObject_1.buttonText.button4 == gameObject_1.buttonText.button2 || gameObject_1.buttonText.button4 == gameObject_1.buttonText.button3) {
                index = functions_1.random(0, 3);
                gameObject_1.buttonText.button4 = text[index];
                i += 1;
                console.log("       i " + i);
                if (i > 5000) {
                    alert("Ошибка");
                    break;
                }
            }
            i = 0;
            this.answer[3] = index;
            console.log('+++ ' + this.answer);
            // return answer;  //Массив, в котором индекс - кнопка, а значение - корректность ответа
        }
    };
    Dialog.prototype.check = function (button) {
        var phrase;
        //Правильный ответ
        if (this.answer[button] == 0) {
            // this.countPlayer += 2;   //увеличиваем счёт игрока
            // this.textCustomer = getAnswerCustomer(this.gameStep, "correct", this.linkAnswerCustomer[0]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "correct", this.linkAnswerCustomer[0]);
            // this.gameStep +=1;
            this.countPlayer += this.points[0];
            text_1.checkStepPhrase(0);
            phrase = text_1.getAnswerCustomer(this.linkAnswerCustomer[0]);
            console.log(phrase);
            this.textCustomer = text_1.getTextCustomer(phrase);
            this.gameStep = text_1.getNextStep(phrase);
            this.linkAnswerSeller = text_1.getLinkAnswerSeller(phrase);
        }
        //Удовлетвворительный ответ
        if (this.answer[button] == 1) {
            this.countPlayer += this.points[1];
            text_1.checkStepPhrase(1);
            phrase = text_1.getAnswerCustomer(this.linkAnswerCustomer[1]);
            console.log(phrase);
            this.textCustomer = text_1.getTextCustomer(phrase);
            this.gameStep = text_1.getNextStep(phrase);
            this.linkAnswerSeller = text_1.getLinkAnswerSeller(phrase);
        }
        if (this.answer[button] == 2) {
            // this.countPlayer += 1;
            // this.textCustomer = getAnswerCustomer(this.gameStep, "statisfactory", this.linkAnswerCustomer[2]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "statisfactory", this.linkAnswerCustomer[2]);
            // this.gameStep +=1;
            this.countPlayer += this.points[2];
            text_1.checkStepPhrase(2);
            phrase = text_1.getAnswerCustomer(this.linkAnswerCustomer[2]);
            console.log(phrase);
            this.textCustomer = text_1.getTextCustomer(phrase);
            this.gameStep = text_1.getNextStep(phrase);
            this.linkAnswerSeller = text_1.getLinkAnswerSeller(phrase);
        }
        if (this.answer[button] == 3) {
            // this.countPlayer += -1;
            // this.textCustomer = getAnswerCustomer(this.gameStep, "negative", this.linkAnswerCustomer[3]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "negative", this.linkAnswerCustomer[3]);
            // this.gameStep +=1;
            this.countPlayer += this.points[3];
            text_1.checkStepPhrase(3);
            phrase = text_1.getAnswerCustomer(this.linkAnswerCustomer[3]);
            console.log(phrase);
            this.textCustomer = text_1.getTextCustomer(phrase);
            this.gameStep = text_1.getNextStep(phrase);
            this.linkAnswerSeller = text_1.getLinkAnswerSeller(phrase);
        }
        console.log('==== ' + button + ' ===== ' + this.textCustomer);
    };
    return Dialog;
}());
exports.Dialog = Dialog;
