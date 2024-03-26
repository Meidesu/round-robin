"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escreverArquivo = exports.lerArquivo = void 0;
var fs_1 = require("fs");
function lerArquivo(path) {
    var linhas = (0, fs_1.readFileSync)(path, 'utf8').split('\n');
    return linhas;
}
exports.lerArquivo = lerArquivo;
function escreverArquivo(path, conteudo) {
    (0, fs_1.writeFileSync)(path, conteudo);
}
exports.escreverArquivo = escreverArquivo;
