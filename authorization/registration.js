let login = document.getElementById("loginIn");
let password = document.getElementById("password");

//Ввод только букв и цифр
document.getElementById("password").onkeypress = function(event){    //Разрешение ввода только цифр
    event = event || window.event;
    if (event.charCode && (event.charCode < 48 || event.charCode > 57) && (event.charCode < 65 || event.charCode > 90) && (event.charCode < 97 || event.charCode > 122) && event.charCode != 46)
        return false;
};
