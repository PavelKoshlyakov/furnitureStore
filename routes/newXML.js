//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------ДОБАВЛЕНИЕ НОВОЙ СТРАНИЦЫ С ДИАЛОГОМ----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let path = require('path');
let fs = require('fs');
let dirName;    //Вывод номера названия диалога

let xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" +
              "<sale>\n" +
            "\t<seller>\n\t</seller>\n\n" +
            "\t<customer>\n\t</customer>\n" +
            "</sale>";

module.exports.create = function (req, res, next) {
    fs.readdir(path.resolve('game', 'DialogList'), function (err, files) {
        if (err) return callback(err);

        fs.writeFile(path.resolve('game', 'DialogList') + "/step" + files.length + ".xml", xmlData, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Файл " + "step" + files.length + ".xml" + " создан в директории " + path.resolve('game', 'DialogList'));
            }
        });

        console.log("URL " + req.url);
        res.redirect('/dialogRedaction/' + files.length);
    });
};

//Удаляем выбранный шаг диалога
module.exports.delete = function (req, res, next) {
    fs.unlinkSync(path.resolve('game', 'DialogList') + "/step" + req.params.id + ".xml", function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Файл " + "step" + req.params.id + ".xml" + " удалён из директории " + path.resolve('game', 'DialogList'));
        }
    });
    res.redirect('/dialogRedaction/' + (req.params.id - 1));
};