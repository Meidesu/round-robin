"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_utils_1 = require("../utils/io_utils");
var Cpu_1 = require("./Cpu");
var Tarefa_1 = require("./Tarefa");
function main() {
    var qnt = (0, io_utils_1.inputPositiveInt)('Quantidade de tarefas: ');
    var quantum = (0, io_utils_1.inputPositiveInt)('Quantum: ');
    var trocaContexto = (0, io_utils_1.inputPositiveInt)('Troca de contexto: ');
    var tarefas = [];
    for (var i = 0; i < qnt; i++) {
        var tempoExecucao = (0, io_utils_1.inputPositiveInt)("\nTempo de execu\u00E7\u00E3o T".concat(i + 1, ": "));
        var tempoChegada = (0, io_utils_1.inputPositiveInt)('Tempo de chegada: ');
        tarefas.push(new Tarefa_1.Tarefa(tempoExecucao, tempoChegada, "T".concat(i + 1)));
    }
    var cpu = new Cpu_1.Cpu(quantum, tarefas, trocaContexto);
    try {
        cpu.iniciar();
    }
    catch (error) {
        console.log(error.message);
    }
    console.log(cpu.resultado());
    console.log('\nFim da execução');
}
main();
