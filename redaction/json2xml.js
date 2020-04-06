

let path = require('path');
let fs = require('fs');

module.exports.seller = function (message, file) {
    let mes = JSON.parse(message.utf8Data);

    if (mes.type == "seller"){
        let text = "\n\t<text>" + mes.text.replace(/\s$/,'') + "</text>";
        let step = "\n\t<step>" + mes.step + "</step>";
        let point = "\n\t<point>" + mes.point + "</point>";
        let type = "";
        if (mes.correct){
            for (let i = 0; i < mes.correct.split(' ').length; i++){
                type += "\n\t\t<correct>" + mes.correct.split(' ')[i] + "</correct>"
            }
        }
        if (mes.statisfaction){
            for (let i = 0; i < mes.statisfaction.split(' ').length; i = i + 2){
                type += "\n\t\t<statisfaction>" + mes.statisfaction.split(' ')[i] + "</statisfaction>"
            }
        }
        if (mes.negative){
            for (let i = 0; i < mes.negative.split(' ').length; i = i + 2){
                type += "\n\t\t<negative>" + mes.negative.split(' ')[i] + "</negative>"
            }
        }
        let next = "\n\t<next>" + type + "\n\t</next>";
        let phrase = '\n<phrase id = "' + mes.id + '">' + text + step + point + next + "\n</phrase>";

        // console.log("WEBSOCKET MESSAGE ", phrase);

        fs.readFile(file, "utf8", function (err, data){    //Запись в XML
            let seller = data.substr(0, data.indexOf("</seller>") + 9); //Все фразы продавца

            if (~data.indexOf('id = "' + mes.id + '"')){    //Такая фраза уже существует
                console.log("Совпадение есть " + mes.id);
                seller = seller.substr(data.indexOf('id = "' + mes.id + '"') - 8);
                seller = seller.substr(0, seller.indexOf("</phrase>", 0) + 9);
                data = data.replace(seller, phrase);
                data = data.replace(/\n+/g,'\n');
                fs.writeFile(file, data, function (err) {
                    if (err) throw err;
                    console.log("Запись произошла успешно");
                });

            }else {                                         //Данной фразы не существует
                console.log("Совпадения нет");
                // let pos = 0;
                //
                // while(true){
                //
                //     let foundPos = seller.indexOf("</phrase>", pos);      //Поиск последней фразы в продавце
                //     // console.log(foundPos);
                //     if (foundPos == -1){
                //         data = data.substr(0, pos + 8) + phrase + data.substr(pos + 8); //Добавление фразы
                //         // console.log(data);
                //         fs.writeFile(file, data, function (err) {
                //             if (err) throw err;
                //             console.log("Запись произошла успешно");
                //         });
                //
                //         break;
                //     }
                //
                //     pos = foundPos + 1; // продолжить поиск со следующей
                // }
                data = data.substr(0, data.indexOf("</seller>")) + phrase + "\n" + data.substr(data.indexOf("</seller>"));
                fs.writeFile(file, data, function (err) {
                    if (err) throw err;
                    console.log("Запись произошла успешно");
                });
            }
        });

    }
};

module.exports.customer = function (message, file){
    let mes = JSON.parse(message.utf8Data);

    if (mes.type == "customer"){
        let text = "\n\t<text>" + mes.text + "</text>";
        let nextStep = "\n\t<step>" + mes.step + "</step>";

        let correct = "";
        let statisfaction = "";
        let negative = "";

        for (let i = 0; i < mes.correct.split(' ').length; i++){
            correct += "\n\t\t<correct>" + mes.correct.split(' ')[i] + "</correct>";
        }
        for (let i = 0; i < mes.statisfaction.split(' ').length; i++){
            statisfaction += "\n\t\t<statisfaction>" + mes.statisfaction.split(' ')[i] + "</statisfaction>";
        }
        for (let i = 0; i < mes.negative.split(' ').length; i++){
            negative = "\n\t\t<negative>" + mes.negative.split(' ')[i] + "</negative>";
        }

        let next = "\n\t<next>" + correct + statisfaction + negative + "\n\t</next>";

        let phrase = '\n<phrase id = "' + mes.id + '">' + text + nextStep + next +"\n</phrase>";

        fs.readFile(file, "utf8", function (err, data) {    //Запись в XML

            let customer = data.substr(data.indexOf("<customer>"));
            customer = customer.substr(0, customer.indexOf("</customer>") + 11);    //Все фразы покупателя

            if (~customer.indexOf('id = "' + mes.id + '"')) {    //Такая фраза уже существует
                console.log("Совпадение есть " + mes.id);
                customer = customer.substr(customer.indexOf('id = "' + mes.id + '"') - 8);
                customer = customer.substr(0, customer.indexOf("</phrase>") + 9);
                data = data.replace(customer, phrase);
                data = data.replace(/\n+/g,'\n');

                fs.writeFile(file, data, function (err) {
                    if (err) throw err;
                    console.log("Запись произошла успешно");
                });
            } else {
                data = data.substr(0, data.indexOf("</customer>")) + phrase + "\n" + data.substr(data.indexOf("</customer>"));
                fs.writeFile(file, data, function (err) {
                    if (err) throw err;
                    console.log("Запись произошла успешно");
                });
            }
        });

        // console.log("WEBSOCKET MESSAGE ",phrase);
    }
};
