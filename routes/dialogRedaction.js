//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------РЕНДЕР СТРАНИЦЫ РЕДАКТИРОВАНИЯ ДИАЛОГОВ-------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let path = require('path');
let fs = require('fs');
let xml2js = require('xml2js');

let parser = new xml2js.Parser();

let dirName;    //Вывод номера названия диалога
let dirNumber = [];  //Ссылка на диалог (:idStep)
const WebSocket = require('ws');

module.exports.get = function (req, res, next) {

    fs.readdir(path.resolve('game', 'DialogList'), function (err, files) {
        if (err) return callback(err);

        files[files.length] = files[1];
        files.splice(1,1);


        for (let i = 0; i< files.length; i++){
            files[i] = files[i].substr(4);
            files[i] = files[i].replace('.xml', '');
            dirNumber[i] = files[i];
            if (files[i] == 100){
                files[i] = 'Окончание диалога';
            }

        }
        dirName = files;

    });
    module.exports.dirName = dirName;

    fs.readFile(path.resolve('game', 'DialogList', 'step' + req.params.idStep + '.xml'), function(err, data) {

        parser.parseString(data, function (err, result) {

            console.log('Done');
            res.render('dialogRedaction', {phrase: result, dirNumber: dirNumber, dirName: dirName, idStep: req.params.idStep});
        });
    });
};

module.exports.post = function (req, res, next) {

};