import {random} from "./functions";
import {dialog} from "./game";

let xml = new XMLHttpRequest();
// xml.open("GET", './dialog.xml', false);
// xml.send();
// let count = xml.responseXML.getElementsByTagName("seller")[0].childElementCount;
// console.log('count ' + count);
let sellerText: string;
let customerText: string;


export function getStep(step: number){
    console.log('getStep start');
    if (step != 100) {
        xml.open("GET", './DialogList/step' + step + '.xml', false);
        xml.send();
        console.log('   gameStep ' + step);
    }

    console.log('getStep end ');
    console.log(' ');
}

//Возвращает фразы с заданным ID
export function getPhraseSeller(idPhrases : number[]) {
    console.log('getPhraseSeller start');
    let phrases = xml.responseXML.getElementsByTagName("seller")[0].children; //Получаем все фразы соответствующего типа на заданном шаге
    let phrasesResult: any[] = [];
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < phrases.length; j++){
            if (Number(phrases[j].id) == idPhrases[i]){
                phrasesResult[i] = phrases[j];
            }
        }
    }
    console.log(phrasesResult);
    console.log('getPhraseSeller end ');
    console.log(' ');
    return phrasesResult;
}

//Возвращает количество очков за фразу
export function getPointsPhrase(phrases: HTMLElement[]): number[]{
    console.log('getPointsPhrase start');
    let points: number[] = [];
    for (let i = 0; i < phrases.length; i ++){
        points[i] = Number(phrases[i].getElementsByTagName("point")[0].innerHTML);    //Выводим количество очков за фразу
    }
    console.log('   points: ' + points);
    console.log('getPointsPhrase end ');
    console.log(' ');
    return points;
}

export function getTextSeller(phrases: HTMLElement[]){
    console.log('getTextSeller start');
    let question: any[] = [];
    for (let i = 0; i < phrases.length; i ++){
        question[i] = phrases[i].getElementsByTagName("text")[0].innerHTML;    //Выводим текст вопроса
    }
    console.log('getTextSeller end ');
    console.log(' ');
    return question;
}

//Возвращает ID ответа покупателя
export function getLinkAnswerCustomer(phrases: HTMLElement[]){
    console.log('getLinkAnswerCustomer start');
    let next;
    let linkAnswerCustomer: number[] = [];
    for (let i = 0; i < phrases.length; i ++){
        if (phrases[i].getElementsByTagName("step").length != 0) {
            if (Number(phrases[i].getElementsByTagName("step")[0].innerHTML) != 100) {
                dialog.transition[i] = Number(phrases[i].getElementsByTagName("step")[0].innerHTML);
            } else {
                dialog.transition[i] = null;
            }
        }
        next = phrases[i].getElementsByTagName("next")[0];
        linkAnswerCustomer[i] = Number(next.children[random(0, next.children.length - 1)].innerHTML);
    }
    console.log('   ' + linkAnswerCustomer + " dialog.transition " + dialog.transition);
    console.log('getLinkAnswerCustomer end ');
    console.log(' ');
    return linkAnswerCustomer
}

//Возвращает фразу покупателя
export function getAnswerCustomer(id: number){
    console.log('getAnswerCustomer start');
    let phrasesCustomer = xml.responseXML.getElementsByTagName("customer")[0].children;
    let phraseCustomer;
    for (let i = 0; i < phrasesCustomer.length; i++){
        if (Number(phrasesCustomer[i].id) == id){
            phraseCustomer = phrasesCustomer[i];
        }
    }
    console.log('getLinkAnswerCustomer end ');
    console.log(' ');
    return phraseCustomer;
}

export function getTextCustomer(phrase: HTMLElement){
    return phrase.getElementsByTagName("text")[0].innerHTML;
}

export function getNextStep(phrase: HTMLElement){
    let nextStep: number;
    console.log('getNextStep start');
    //Если ссылка на страницу диалога не задана, то переходим к следующей странице
    if (Number(phrase.getElementsByTagName("step")[0].innerHTML) == 0){
        nextStep = dialog.gameStep + 1;
        console.log('   ' + nextStep);
    }else{
        nextStep = Number(phrase.getElementsByTagName("step")[0].innerHTML);
        console.log('   ' + nextStep);
    }
    console.log("STEP " + phrase.getElementsByTagName("step")[0].innerHTML);
    //Если ссылка на окно диалога = 100, то конец игры
    if (Number(phrase.getElementsByTagName("step")[0].innerHTML) == 100){
        console.log("           end");
        dialog.end = true;
        return null;
    }
    console.log('getNextStep end ');
    console.log(' ');
    return nextStep;
}

export function getLinkAnswerSeller(phrase: HTMLElement){
    console.log('getLinkAnswerSeller start');
    let link: number[] = [];
    if (dialog.end == true){
        return null
    }

    link[0] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("correct")[random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("correct").length - 1)].innerHTML);
    link[1] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    link[2] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    while (link[2] == link[1]){
        link[2] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    }
    link[3] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("negative")[random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("negative").length - 1)].innerHTML);
    console.log('   link: ' + link);
    console.log('getLinkAnswerSeller end ');
    console.log(' ');
    console.log(' ');
    console.log(' ');
    console.log(' ');
    console.log(' ');
    console.log(' ');
    return link;
}

export function firstRandom(){
    console.log('firstRandom start');
    xml.open("GET", './DialogList/step1.xml', false);
    xml.send();
    let link:number[] = [];

    let phrases = xml.responseXML.getElementsByTagName("seller")[0].getElementsByTagName("phrase");
    let phrase = phrases[random(0, phrases.length - 1)];
    let type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    while (type != "correct"){
        phrase = phrases[random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[0] = Number(phrase.id);
    }
    link[0] = Number(phrase.id);
    while (type != "statisfaction"){
        phrase = phrases[random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[1] = Number(phrase.id)
    }
    link[1] = Number(phrase.id);

    phrase = phrases[random(0, phrases.length - 1)];
    type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    console.log ("type " + type + " " + (type != "statisfaction" && link[1] == link[2]));
    let flag = true;
    while (flag == true) {
        phrase = phrases[random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[2] = Number(phrase.id);
        console.log("ss " + link[1] + ' ' + link[2] + ' ' + type + ' ' + (type != "statisfaction" && link[1] == link[2]));
        if ((type == "statisfaction") && (link[1] != link[2])){
            flag = false;
        }
    }

    phrase = phrases[random(0, phrases.length - 1)];
    type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    while (type != "negative"){
        phrase = phrases[random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[3] = Number(phrase.id);
    }
    link[3] = Number(phrase.id);
    console.log(link);
    console.log('firstRandom end');
    console.log(' ');
    return link;
}

//Ссылается на номер диалога, если в фразе продавца задана ссылка
export function checkStepPhrase(id: number){
    console.log('checkStepPhrase start');
    if (dialog.transition[id] != null){
        if (dialog.transition[id] != 0) {
            xml.open("GET", './DialogList/step' + dialog.transition[id] + '.xml', false);
            xml.send();
            dialog.gameStep = dialog.transition[id];
        }
    }
    console.log('   checkStepPhrase ' + dialog.transition[id]);
    console.log('checkStepPhrase end ');
    console.log(' ');
}

