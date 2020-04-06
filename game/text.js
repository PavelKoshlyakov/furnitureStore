"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var game_1 = require("./game");
var xml = new XMLHttpRequest();
// xml.open("GET", './dialog.xml', false);
// xml.send();
// let count = xml.responseXML.getElementsByTagName("seller")[0].childElementCount;
// console.log('count ' + count);
var sellerText;
var customerText;
function getStep(step) {
    console.log('getStep start');
    if (step != 100) {
        xml.open("GET", './DialogList/step' + step + '.xml', false);
        xml.send();
        console.log('   gameStep ' + step);
    }
    console.log('getStep end ');
    console.log(' ');
}
exports.getStep = getStep;
//Возвращает фразы с заданным ID
function getPhraseSeller(idPhrases) {
    console.log('getPhraseSeller start');
    var phrases = xml.responseXML.getElementsByTagName("seller")[0].children; //Получаем все фразы соответствующего типа на заданном шаге
    var phrasesResult = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < phrases.length; j++) {
            if (Number(phrases[j].id) == idPhrases[i]) {
                phrasesResult[i] = phrases[j];
            }
        }
    }
    console.log(phrasesResult);
    console.log('getPhraseSeller end ');
    console.log(' ');
    return phrasesResult;
}
exports.getPhraseSeller = getPhraseSeller;
//Возвращает количество очков за фразу
function getPointsPhrase(phrases) {
    console.log('getPointsPhrase start');
    var points = [];
    for (var i = 0; i < phrases.length; i++) {
        points[i] = Number(phrases[i].getElementsByTagName("point")[0].innerHTML); //Выводим количество очков за фразу
    }
    console.log('   points: ' + points);
    console.log('getPointsPhrase end ');
    console.log(' ');
    return points;
}
exports.getPointsPhrase = getPointsPhrase;
function getTextSeller(phrases) {
    console.log('getTextSeller start');
    var question = [];
    for (var i = 0; i < phrases.length; i++) {
        question[i] = phrases[i].getElementsByTagName("text")[0].innerHTML; //Выводим текст вопроса
    }
    console.log('getTextSeller end ');
    console.log(' ');
    return question;
}
exports.getTextSeller = getTextSeller;
//Возвращает ID ответа покупателя
function getLinkAnswerCustomer(phrases) {
    console.log('getLinkAnswerCustomer start');
    var next;
    var linkAnswerCustomer = [];
    for (var i = 0; i < phrases.length; i++) {
        if (phrases[i].getElementsByTagName("step").length != 0) {
            if (Number(phrases[i].getElementsByTagName("step")[0].innerHTML) != 100) {
                game_1.dialog.transition[i] = Number(phrases[i].getElementsByTagName("step")[0].innerHTML);
            }
            else {
                game_1.dialog.transition[i] = null;
            }
        }
        next = phrases[i].getElementsByTagName("next")[0];
        linkAnswerCustomer[i] = Number(next.children[functions_1.random(0, next.children.length - 1)].innerHTML);
    }
    console.log('   ' + linkAnswerCustomer + " dialog.transition " + game_1.dialog.transition);
    console.log('getLinkAnswerCustomer end ');
    console.log(' ');
    return linkAnswerCustomer;
}
exports.getLinkAnswerCustomer = getLinkAnswerCustomer;
//Возвращает фразу покупателя
function getAnswerCustomer(id) {
    console.log('getAnswerCustomer start');
    var phrasesCustomer = xml.responseXML.getElementsByTagName("customer")[0].children;
    var phraseCustomer;
    for (var i = 0; i < phrasesCustomer.length; i++) {
        if (Number(phrasesCustomer[i].id) == id) {
            phraseCustomer = phrasesCustomer[i];
        }
    }
    console.log('getLinkAnswerCustomer end ');
    console.log(' ');
    return phraseCustomer;
}
exports.getAnswerCustomer = getAnswerCustomer;
function getTextCustomer(phrase) {
    return phrase.getElementsByTagName("text")[0].innerHTML;
}
exports.getTextCustomer = getTextCustomer;
function getNextStep(phrase) {
    var nextStep;
    console.log('getNextStep start');
    //Если ссылка на страницу диалога не задана, то переходим к следующей странице
    if (Number(phrase.getElementsByTagName("step")[0].innerHTML) == 0) {
        nextStep = game_1.dialog.gameStep + 1;
        console.log('   ' + nextStep);
    }
    else {
        nextStep = Number(phrase.getElementsByTagName("step")[0].innerHTML);
        console.log('   ' + nextStep);
    }
    console.log("STEP " + phrase.getElementsByTagName("step")[0].innerHTML);
    //Если ссылка на окно диалога = 100, то конец игры
    if (Number(phrase.getElementsByTagName("step")[0].innerHTML) == 100) {
        console.log("           end");
        game_1.dialog.end = true;
        return null;
    }
    console.log('getNextStep end ');
    console.log(' ');
    return nextStep;
}
exports.getNextStep = getNextStep;
function getLinkAnswerSeller(phrase) {
    console.log('getLinkAnswerSeller start');
    var link = [];
    if (game_1.dialog.end == true) {
        return null;
    }
    link[0] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("correct")[functions_1.random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("correct").length - 1)].innerHTML);
    link[1] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[functions_1.random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    link[2] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[functions_1.random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    while (link[2] == link[1]) {
        link[2] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction")[functions_1.random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("statisfaction").length - 1)].innerHTML);
    }
    link[3] = Number(phrase.getElementsByTagName("next")[0].getElementsByTagName("negative")[functions_1.random(0, phrase.getElementsByTagName("next")[0].getElementsByTagName("negative").length - 1)].innerHTML);
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
exports.getLinkAnswerSeller = getLinkAnswerSeller;
function firstRandom() {
    console.log('firstRandom start');
    xml.open("GET", './DialogList/step1.xml', false);
    xml.send();
    var link = [];
    var phrases = xml.responseXML.getElementsByTagName("seller")[0].getElementsByTagName("phrase");
    var phrase = phrases[functions_1.random(0, phrases.length - 1)];
    var type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    while (type != "correct") {
        phrase = phrases[functions_1.random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[0] = Number(phrase.id);
    }
    link[0] = Number(phrase.id);
    while (type != "statisfaction") {
        phrase = phrases[functions_1.random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[1] = Number(phrase.id);
    }
    link[1] = Number(phrase.id);
    phrase = phrases[functions_1.random(0, phrases.length - 1)];
    type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    console.log("type " + type + " " + (type != "statisfaction" && link[1] == link[2]));
    var flag = true;
    while (flag == true) {
        phrase = phrases[functions_1.random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[2] = Number(phrase.id);
        console.log("ss " + link[1] + ' ' + link[2] + ' ' + type + ' ' + (type != "statisfaction" && link[1] == link[2]));
        if ((type == "statisfaction") && (link[1] != link[2])) {
            flag = false;
        }
    }
    phrase = phrases[functions_1.random(0, phrases.length - 1)];
    type = phrase.getElementsByTagName("next")[0].children[0].tagName;
    while (type != "negative") {
        phrase = phrases[functions_1.random(0, phrases.length - 1)];
        type = phrase.getElementsByTagName("next")[0].children[0].tagName;
        link[3] = Number(phrase.id);
    }
    link[3] = Number(phrase.id);
    console.log(link);
    console.log('firstRandom end');
    console.log(' ');
    return link;
}
exports.firstRandom = firstRandom;
//Ссылается на номер диалога, если в фразе продавца задана ссылка
function checkStepPhrase(id) {
    console.log('checkStepPhrase start');
    if (game_1.dialog.transition[id] != null) {
        if (game_1.dialog.transition[id] != 0) {
            xml.open("GET", './DialogList/step' + game_1.dialog.transition[id] + '.xml', false);
            xml.send();
            game_1.dialog.gameStep = game_1.dialog.transition[id];
        }
    }
    console.log('   checkStepPhrase ' + game_1.dialog.transition[id]);
    console.log('checkStepPhrase end ');
    console.log(' ');
}
exports.checkStepPhrase = checkStepPhrase;
