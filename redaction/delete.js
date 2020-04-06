let path = require('path');
let fs = require('fs');

module.exports.seller = function (id, file) {
    fs.readFile(file, "utf8", function (err, data) {    //Запись в XML
        let seller = data.substr(0, data.indexOf("</seller>") + 9); //Все фразы продавца

        if (~data.indexOf('id = "' + id + '"')) {    //Такая фраза уже существует
            seller = seller.substr(data.indexOf('id = "' + id + '"') - 8);  //Начало фразы
            seller = seller.substr(0, seller.indexOf("</phrase>", 0) + 9);  //Конец фразы

            data = data.replace(seller, "");
            data = data.replace(/\n+/g,'\n');
            fs.writeFile(file, data, function (err) {
                if (err) throw err;
                console.log("Запись произошла успешно");
            });
        }
        else {
            console.log("ОШИБКА: ТАКОЙ ФРАЗЫ НЕ СУЩЕСТВУЕТ");
        }
    });
};

module.exports.customer = function (id, file) {
    fs.readFile(file, "utf8", function (err, data) {    //Запись в XML

        let customer = data.substr(data.indexOf("<customer>"));
        customer = customer.substr(0, customer.indexOf("</customer>") + 11);    //Все фразы покупателя

        if (~customer.indexOf('id = "' + id + '"')) {    //Такая фраза уже существует
            customer = customer.substr(customer.indexOf('id = "' + id + '"') - 8);
            customer = customer.substr(0, customer.indexOf("</phrase>") + 9);
            data = data.replace(customer, "");
            data = data.replace(/\n+/g,'\n');

            fs.writeFile(file, data, function (err) {
                if (err) throw err;
                console.log("Запись произошла успешно");
            });
        } else {
            console.log("ОШИБКА: ТАКОЙ ФРАЗЫ НЕ СУЩЕСТВУЕТ");
        }
    });
};