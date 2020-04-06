let socket = new WebSocket('ws://localhost:3000');

let table = document.body.getElementsByTagName('table')[0];
let tableCustomer = document.body.getElementsByTagName('table')[1];

let row = [];
let rowCustomer = [];

let modal = document.getElementById('phraseRedaction');
let modalCustomer = document.getElementById('customerPhraseRedaction');

let span = document.getElementsByClassName("close")[0];
let spanCustomer = document.getElementsByClassName("close")[1];

let n;

span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal){
        modal.style.display = "none";
    }
    if (event.target == modalCustomer){
        modalCustomer.style.display = "none";
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        modalCustomer.style.display = "none";
    }
});

for (let i = 2; i < table.rows.length; i++){
    row[i] = table.rows[i];
    row[i].onclick = function () {
        // alert(row[i].cells[1].innerHTML);
        modal.style.display = "block";

        let idInput = document.getElementById("id");
        let id = row[i].cells[0].innerHTML.toString();
        idInput.getElementsByTagName("input")[0].value = id;

        let textInput = document.getElementById("text");
        let text = row[i].cells[1].innerHTML.toString();
        text = text.replace(/\s+/g,' ' ); // заменить длинные пробелы одним
        textInput.getElementsByTagName("textarea")[0].value = text;
        let selectInput = document.getElementById("select");
        let select = row[i].cells[2].innerHTML.toString();
        // selectInput.getElementsByTagName("select").value = select;
        if (select == "Правильный ответ"){
            n = 0;
        }
        if (select == "Удовлетворительный ответ"){
            n = 1;
        }
        if (select == "Негативный ответ"){
            n = 2;
        }
        selectInput.getElementsByTagName("select")[0].options[n].selected = true;

        //№ этапа
        let nextInput = document.getElementById("next");
        let next = row[i].cells[3].innerHTML;
        next = next.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
            .replace(/^\s/,'')    // удалить пробелы в начале строки
            .replace(/\s$/,'');   // удалить пробелы в конце строки
        nextInput.getElementsByTagName("input")[0].value = next;
        //Разрешение ввода только цифр
        document.getElementById("nextRedaction").onkeypress = function(event){
            event = event || window.event;
            if (event.charCode && (event.charCode < 48 || event.charCode > 57) && event.charCode != 32)
                return false;
        };

        //Ввод количества очков за фразу
        let pointInput = document.getElementById("points");
        let point = row[i].cells[4].innerHTML.toString();
        pointInput.getElementsByTagName("input")[0].value = point;
        document.getElementById("pointsRedaction").onkeypress = function(event){    //Разрешение ввода только цифр
            event = event || window.event;
            if (event.charCode && (event.charCode < 48 || event.charCode > 57))
                return false;
        };

        //Получение списка существующих XML
        let mas = document.getElementsByClassName("dropdown-menu")[0].children;
        let mas1 = [];
        for (let i = 0; i < mas.length; i++){
            mas1[i] = mas[i].getElementsByTagName("a")[0].innerHTML;
            mas1[i] = mas1[i].replace(/\s+/g,' ' )
                            .replace(/^\s/,'')    // удалить пробелы в начале строки
                            .replace(/\s$/,'');   // удалить пробелы в конце строки
        }
        let selectXML = document.getElementById("selectXML");
        let step = row[i].cells[5].innerHTML.toString();
        selectXML.options[mas1.indexOf(step) + 1].selected = true;
    }
}


button.onclick = function () {
    let button = document.getElementById("button");
    let typeFrase = document.getElementById("selectRedaction").value;

    if (typeFrase == "Правильный"){
        typeFrase = "correct"
    }
    if (typeFrase == "Удовлетворительный"){
        typeFrase = "statisfaction"
    }
    if (typeFrase == "Негативный"){
        typeFrase = "negative"
    }
    let message = {
        operation: "create",
        type: "seller",
        xmlNumber: document.getElementById("buttonXML").innerHTML,
        id: document.getElementById("idRedaction").value,
        text: document.getElementById("textRedaction").value,
        point: document.getElementById("pointsRedaction").value,
        [typeFrase]: document.getElementById("nextRedaction").value,
        // step: document.getElementById("stepRedaction").value
        step: document.getElementById("selectXML").value
    };
    socket.send(JSON.stringify(message));
};

spanCustomer.onclick = function () {
    modalCustomer.style.display = "none";
};



for (let i = 3; i < tableCustomer.rows.length; i++) {
    rowCustomer[i] = tableCustomer.rows[i];
    rowCustomer[i].onclick = function () {
        // alert(row[i].cells[1].innerHTML);
        modalCustomer.style.display = "block";

        let idInput = document.getElementById("idCustomer");
        let id = rowCustomer[i].cells[0].innerHTML.toString();
        idInput.getElementsByTagName("input")[0].value = id;

        //Ввод текста
        let textInput = document.getElementById("textCustomer");
        let text = rowCustomer[i].cells[1].innerHTML.toString();
            text = text.replace(/\s+/g,' ' ); // заменить длинные пробелы одним
        textInput.getElementsByTagName("textarea")[0].value = text;

    //Выбор номера следующего шага
        let mas = document.getElementsByClassName("dropdown-menu")[0].children; //Получение всех существующих файлов с диалогами
        let mas1 = [];
        for (let i = 0; i < mas.length; i++){
            mas1[i] = mas[i].getElementsByTagName("a")[0].innerHTML;        //Формирование массива файлов с диалогами
            mas1[i] = mas1[i].replace(/\s+/g,' ' )
                .replace(/^\s/,'')    // удалить пробелы в начале строки
                .replace(/\s$/,'');   // удалить пробелы в конце строки
        }
        let stepRedaction = document.getElementById("selectXMLCustomer");
        let step = row[i].cells[5].innerHTML.toString();
        stepRedaction.options[mas1.indexOf(step) + 1].selected = true;

        //Ввод id корректного ответа
        let correctAnswer = document.getElementById("correctAnswer");
        let nextCorrect = rowCustomer[i].cells[3].innerHTML;
        nextCorrect = nextCorrect.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
            .replace(/^\s/,'')    // удалить пробелы в начале строки
            .replace(/\s$/,'');   // удалить пробелы в конце строки
        correctAnswer.value = nextCorrect;

        //Ввод id удовлетворительного ответа
        let statisfactionAnswer = document.getElementById("statisfactionAnswer");
        let nextStatisfaction = rowCustomer[i].cells[4].innerHTML;
        nextStatisfaction = nextStatisfaction.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
            .replace(/^\s/,'')    // удалить пробелы в начале строки
            .replace(/\s$/,'');   // удалить пробелы в конце строки
        statisfactionAnswer.value = nextStatisfaction;

        //Ввод id негативного ответа
        let negativeAnswer = document.getElementById("negativeAnswer");
        let nextNegative = rowCustomer[i].cells[5].innerHTML;
        nextNegative = nextNegative.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
            .replace(/^\s/,'')    // удалить пробелы в начале строки
            .replace(/\s$/,'');   // удалить пробелы в конце строки
        negativeAnswer.value = nextNegative;
    }
}

let buttonCustomer = document.getElementById("buttonCustomer");
buttonCustomer.onclick = function () {
    let message = {
        operation: "create",
        type: "customer",
        xmlNumber: document.getElementById("buttonXML").innerHTML,
        id: document.getElementById("idRedactionCustomer").value,
        text: document.getElementById("textRedactionCustomer").value,
        step: document.getElementById("selectXML").value,
        correct: document.getElementById("correctAnswer").value,
        statisfaction: document.getElementById("statisfactionAnswer").value,
        negative: document.getElementById("negativeAnswer").value
    };

    socket.send(JSON.stringify(message));
};


let deletePhraseSeller = document.getElementById("delete");
let deletePhraseCustomer = document.getElementById("deleteCustomer");

deletePhraseSeller.onclick = function () {
    socket.send(JSON.stringify({
        operation: "delete",
        type: "seller",
        xmlNumber: document.getElementById("buttonXML").innerHTML,
        id: document.getElementById("idRedaction").value
    }));
};

deletePhraseCustomer.onclick = function () {
    socket.send(JSON.stringify({
        operation: "delete",
        type: "customer",
        xmlNumber: document.getElementById("buttonXML").innerHTML,
        id: document.getElementById("idRedactionCustomer").value
    }));
};

let deleteXMLFile = document.getElementById("deleteXMLFile");
// deleteXMLFile.href = "/dialogRedaction/deleteXML/" + document.getElementById("buttonXML").innerHTML;
deleteXMLFile.onclick = function () {
    if (confirm("Вы уверены что хотите удалить шаг №" + document.getElementById("buttonXML").innerHTML)) {
        deleteXMLFile.href = "/dialogRedaction/deleteXML/" + document.getElementById("buttonXML").innerHTML;
    }
    // deleteXMLFile.href = "/dialogRedaction/deleteXML/" + document.getElementById("buttonXML").innerHTML;
};