"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrawElements = /** @class */ (function () {
    function DrawElements() {
        this.flag = true;
    }
    DrawElements.prototype.drawBoard = function (canvas, pict, w, h) {
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.src = pict;
        if (this.flag == true) {
            window.addEventListener('load', function () {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "rgba(0,0,0,0.7)";
                ctx.fillRect(0, (canvas.height - 200), canvas.width, 200);
            });
        }
        else {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, (canvas.height - 200), canvas.width, 200);
        }
    };
    DrawElements.prototype.drawCustomer = function (canvas, pict, w, h) {
        var ctx = canvas.getContext('2d');
        var image = new Image();
        image.src = pict;
        if (this.flag == true) {
            window.addEventListener('load', function () {
                ctx.drawImage(image, (canvas.width - w), (canvas.height - h - 200), w, h);
            });
        }
        else {
            ctx.drawImage(image, (canvas.width - w), (canvas.height - h - 200), w, h);
        }
    };
    DrawElements.prototype.drawButton = function (canvas, x, y, width, height) {
        var ctx = canvas.getContext('2d');
        if (this.flag == true) {
            window.addEventListener('load', function () {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillRect(x, y, width, height);
            });
        }
        else {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillRect(x, y, width, height);
        }
    };
    DrawElements.prototype.textIn = function (context, text, marginLeft, marginTop, maxWidth, lineHeight, position) {
        var left = marginLeft + 5; //Отступ от левой границы элемента
        //Если рисуем текст впервые
        if (this.flag == true) {
            window.addEventListener('load', function () {
                context.font = "16pt Calibri";
                var words = text.split(" ");
                var countWords = words.length;
                var line = "";
                for (var n = 0; n < countWords; n++) {
                    var testLine = line + words[n] + " ";
                    var testWidth = context.measureText(testLine).width;
                    if (testWidth > maxWidth) {
                        if (position == "center") {
                            var centr = maxWidth / 2 - context.measureText(line).width / 2;
                            marginLeft = left + centr;
                        }
                        context.fillStyle = "Black";
                        context.fillText(line, marginLeft, marginTop);
                        line = words[n] + " ";
                        marginTop += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                if (position == "center") {
                    var centr = maxWidth / 2 - context.measureText(line).width / 2;
                    marginLeft = left + centr;
                }
                context.fillStyle = "Black";
                context.fillText(line, marginLeft, marginTop);
            });
        }
        else {
            context.font = "16pt Calibri";
            var words = text.split(" ");
            var countWords = words.length;
            var line = "";
            for (var n = 0; n < countWords; n++) {
                var testLine = line + words[n] + " ";
                var testWidth = context.measureText(testLine).width;
                if (testWidth > maxWidth) {
                    if (position == "center") {
                        var centr = maxWidth / 2 - context.measureText(line).width / 2;
                        marginLeft = left + centr;
                    }
                    context.fillStyle = "Black";
                    context.fillText(line, marginLeft, marginTop);
                    line = words[n] + " ";
                    marginTop += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            if (position == "center") {
                var centr = maxWidth / 2 - context.measureText(line).width / 2;
                marginLeft = left + centr;
            }
            context.fillStyle = "Black";
            context.fillText(line, marginLeft, marginTop);
        }
    };
    return DrawElements;
}());
exports.DrawElements = DrawElements;
