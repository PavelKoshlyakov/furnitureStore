import {
    checkStepPhrase,
    firstRandom,
    getAnswerCustomer,getLinkAnswerCustomer, getLinkAnswerSeller,
    getNextStep,
    getPhraseSeller, getPointsPhrase,
    getStep, getTextCustomer,
    getTextSeller
} from "./text";
import {answerCustomer, countPlayer, linkNextAnswerCustomer, random} from "./functions";
import {buttonText} from "./gameObject";

export class Dialog{
    answer: number[] = [];
    gameStep: number = 1;       //Указатель на номер дивлога
    linkStep: number = 1;
    textCustomer: string = "";  //Ответ покупателя
    linkAnswerCustomer: number[] = [];   //Ссылка на возможные ответы покупателя
    linkAnswerSeller: number[] = [];
    countPlayer: number = 0;    //Счётчик очков игрока
    points : number[] = [];
    transition: number[] = [];
    end : boolean = false;

    fillTextButton(idPhrase ?: number[]) {
        if (this.end == false) {
            console.log("       this.end    " + this.end);
            let i = 0;
            //Если функция вызвана впервые, то idPhrase неизвестно => генерируем первые фразы вручную
            if (idPhrase == undefined) {
                idPhrase = firstRandom()
            }

            // let answer: number[] = [];
            // let id = getIdSeller(this.gameStep, idPhrase); //храним массив id фраз, которые будем выводить
            // let text = getTextSeller(id);   //Получаем вопросы продавца
            // this.linkAnswerCustomer = getNextStep(id);
            // console.log('linkAnswerCustomer ' + this.linkAnswerCustomer);

            getStep(this.gameStep);
            let idPhrasesSeller = getPhraseSeller(idPhrase);
            let text = getTextSeller(idPhrasesSeller);
            this.points = getPointsPhrase(idPhrasesSeller);
            this.linkAnswerCustomer = getLinkAnswerCustomer(idPhrasesSeller);

            //Случайным образом выводим текст вопроса на кнопки
            let index = random(0, 3);
            buttonText.button1 = text[index];
            this.answer[0] = index;

            index = random(0, 3);
            buttonText.button2 = text[index];
            while (buttonText.button2 == buttonText.button1) {
                index = random(0, 3);
                buttonText.button2 = text[index];
            }
            this.answer[1] = index;

            index = random(0, 3);
            buttonText.button3 = text[index];
            while (buttonText.button3 == buttonText.button1 || buttonText.button3 == buttonText.button2) {

                index = random(0, 3);
                buttonText.button3 = text[index];
            }
            this.answer[2] = index;

            index = random(0, 3);
            buttonText.button4 = text[index];
            while (buttonText.button4 == buttonText.button1 || buttonText.button4 == buttonText.button2 || buttonText.button4 == buttonText.button3) {
                index = random(0, 3);
                buttonText.button4 = text[index];
                i += 1;
                console.log("       i " + i);
                if (i > 5000) {
                    alert("Ошибка");
                    break
                }
            }
            i = 0;
            this.answer[3] = index;
            console.log('+++ ' + this.answer);
            // return answer;  //Массив, в котором индекс - кнопка, а значение - корректность ответа
        }
    }

    check(button: number): void {
        let phrase;
        //Правильный ответ
        if (this.answer[button] == 0){
            // this.countPlayer += 2;   //увеличиваем счёт игрока
            // this.textCustomer = getAnswerCustomer(this.gameStep, "correct", this.linkAnswerCustomer[0]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "correct", this.linkAnswerCustomer[0]);
            // this.gameStep +=1;
            this.countPlayer += this.points[0];
            checkStepPhrase(0);
            phrase = getAnswerCustomer(this.linkAnswerCustomer[0]);
            console.log(phrase);
            this.textCustomer = getTextCustomer(phrase);
            this.gameStep = getNextStep(phrase);
            this.linkAnswerSeller = getLinkAnswerSeller(phrase);
        }
        //Удовлетвворительный ответ
        if (this.answer[button] == 1){
            this.countPlayer += this.points[1];
            checkStepPhrase(1);
            phrase = getAnswerCustomer(this.linkAnswerCustomer[1]);
            console.log(phrase);
            this.textCustomer = getTextCustomer(phrase);
            this.gameStep = getNextStep(phrase);
            this.linkAnswerSeller = getLinkAnswerSeller(phrase);
        }
        if (this.answer[button] == 2){
            // this.countPlayer += 1;
            // this.textCustomer = getAnswerCustomer(this.gameStep, "statisfactory", this.linkAnswerCustomer[2]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "statisfactory", this.linkAnswerCustomer[2]);
            // this.gameStep +=1;
            this.countPlayer += this.points[2];
            checkStepPhrase(2);
            phrase = getAnswerCustomer(this.linkAnswerCustomer[2]);
            console.log(phrase);
            this.textCustomer = getTextCustomer(phrase);
            this.gameStep = getNextStep(phrase);
            this.linkAnswerSeller = getLinkAnswerSeller(phrase);
        }
        if (this.answer[button] == 3){
            // this.countPlayer += -1;
            // this.textCustomer = getAnswerCustomer(this.gameStep, "negative", this.linkAnswerCustomer[3]);
            //
            // this.linkAnswerSeller = getIdAnswerSeller(this.gameStep, "negative", this.linkAnswerCustomer[3]);
            // this.gameStep +=1;
            this.countPlayer += this.points[3];
            checkStepPhrase(3);
            phrase = getAnswerCustomer(this.linkAnswerCustomer[3]);
            console.log(phrase);
            this.textCustomer = getTextCustomer(phrase);
            this.gameStep = getNextStep(phrase);
            this.linkAnswerSeller = getLinkAnswerSeller(phrase);
        }

        console.log('==== ' + button + ' ===== ' + this.textCustomer);
    }

}