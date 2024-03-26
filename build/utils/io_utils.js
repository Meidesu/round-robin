"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputPositiveInt = exports.exibirTitulo = exports.ehEmail = exports.idValido = exports.simOuNao = exports.inputId = exports.gerarId = exports.inputEmail = exports.selecao = exports.continuar = exports.limparConsole = exports.print = exports.inputInt = exports.input = void 0;
var ulidx_1 = require("ulidx");
var readline_sync_1 = require("readline-sync");
function input(label) {
    var out = (0, readline_sync_1.question)(label);
    while (out == '') {
        print("Texto está vazio!\n");
        out = (0, readline_sync_1.question)(label);
    }
    return out;
    // return question(label);
}
exports.input = input;
function inputInt(label) {
    var numStr = (0, readline_sync_1.question)(label);
    while (isNaN(Number(numStr)) || numStr == '' || Number(numStr) % 1 != 0) {
        print("Valor inválido!\n");
        numStr = (0, readline_sync_1.question)(label);
    }
    return Number(numStr);
}
exports.inputInt = inputInt;
function inputPositiveInt(label) {
    var num = inputInt(label);
    while (num < 0) {
        print("Valor inválido!\n");
        num = inputInt(label);
    }
    return num;
}
exports.inputPositiveInt = inputPositiveInt;
function inputEmail(label) {
    var email = (0, readline_sync_1.question)(label);
    while (!ehEmail(email)) {
        print('Email inválido!\n');
        email = (0, readline_sync_1.question)(label);
    }
    return email;
}
exports.inputEmail = inputEmail;
function inputId(label) {
    var id = input(label);
    while (!(0, ulidx_1.isValid)(id)) {
        print('ID inválido');
        id = input(label);
    }
    return id;
}
exports.inputId = inputId;
function print() {
    var parameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parameters[_i] = arguments[_i];
    }
    var out = '';
    for (var _a = 0, parameters_1 = parameters; _a < parameters_1.length; _a++) {
        var p = parameters_1[_a];
        out += "".concat(p, " ");
    }
    console.log(out);
}
exports.print = print;
// Usa a biblioteca readline-sync para pausar a aplicação até que o usuario aperte Enter
function continuar() {
    (0, readline_sync_1.keyIn)("\n[Espaco para continuar...]");
    limparConsole();
}
exports.continuar = continuar;
function selecao(opcoes) {
    return (0, readline_sync_1.keyInSelect)(opcoes, ">> ") + 1;
}
exports.selecao = selecao;
function simOuNao(label) {
    return (0, readline_sync_1.keyInYNStrict)(label);
}
exports.simOuNao = simOuNao;
function limparConsole() {
    console.clear();
}
exports.limparConsole = limparConsole;
function ehEmail(texto) {
    var partesEmail = texto.split('@');
    if (partesEmail.length !== 2) {
        return false;
    }
    var parteLocal = partesEmail[0], parteDominio = partesEmail[1];
    var partesDominio = parteDominio.split('.');
    return (parteLocal.length > 0 &&
        partesDominio.length == 2 &&
        partesDominio.every(function (parte) { return parte.length > 1; }));
}
exports.ehEmail = ehEmail;
function gerarId() {
    return (0, ulidx_1.ulid)();
}
exports.gerarId = gerarId;
function idValido(id) {
    return (0, ulidx_1.isValid)(id);
}
exports.idValido = idValido;
function exibirTitulo() {
    var out = "\n  ___               ___  __   __   __       \n   |  |__| |  |\\/| |__  |__) /  \\ /  \\ |__/ \n   |  |  | |  |  | |___ |__) \\__/ \\__/ |  \\";
    print(out);
}
exports.exibirTitulo = exibirTitulo;
