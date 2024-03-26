"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pilha = void 0;
var Pilha = /** @class */ (function () {
    function Pilha() {
        this.elementos = [];
    }
    Pilha.prototype.push = function (elemento) {
        this.elementos.push(elemento);
    };
    Pilha.prototype.pop = function () {
        return this.elementos.pop();
    };
    Pilha.prototype.peek = function () {
        return this.elementos[this.elementos.length - 1];
    };
    Pilha.prototype.isEmpty = function () {
        return this.elementos.length === 0;
    };
    Pilha.prototype.size = function () {
        return this.elementos.length;
    };
    return Pilha;
}());
exports.Pilha = Pilha;
