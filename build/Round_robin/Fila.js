"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fila = void 0;
var Fila = /** @class */ (function () {
    function Fila() {
        this.elementos = [];
    }
    Fila.prototype.enqueue = function (elemento) {
        this.elementos.push(elemento);
    };
    Fila.prototype.dequeue = function () {
        return this.elementos.shift();
    };
    Fila.prototype.peek = function () {
        return this.elementos[0];
    };
    Fila.prototype.isEmpty = function () {
        return this.elementos.length === 0;
    };
    Fila.prototype.size = function () {
        return this.elementos.length;
    };
    Object.defineProperty(Fila.prototype, "elementosFila", {
        get: function () {
            return this.elementos;
        },
        enumerable: false,
        configurable: true
    });
    return Fila;
}());
exports.Fila = Fila;
