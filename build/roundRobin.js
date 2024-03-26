"use strict";
var Processo = /** @class */ (function () {
    function Processo(nome, tempoExecucao) {
        this.nome = nome;
        this.tempoExecucao = tempoExecucao;
        this.tempoRestante = tempoExecucao;
        this.tempoVida = 0;
        this.tempoEspera = 0;
    }
    return Processo;
}());
function executarRoundRobin(filaProcessos, tempoQuantum, tempoTrocaContexto) {
    var tempoAtual = 0;
    var tempoTotal = 0;
    var tempoVidaTotal = 0;
    var tempoEsperaTotal = 0;
    var processoAtual = filaProcessos.shift();
    var _loop_1 = function () {
        console.log("Executando ".concat(processoAtual.nome, " de ").concat(tempoAtual, " at\u00E9 ").concat(tempoAtual + Math.min(tempoQuantum, processoAtual.tempoRestante)));
        var tempoExecutado = Math.min(tempoQuantum, processoAtual.tempoRestante);
        tempoAtual += tempoExecutado;
        processoAtual.tempoRestante -= tempoExecutado;
        tempoTotal += tempoExecutado;
        processoAtual.tempoVida += tempoExecutado;
        filaProcessos.forEach(function (processo) {
            if (processo !== processoAtual) {
                processo.tempoEspera += tempoExecutado;
            }
        });
        if (processoAtual.tempoRestante > 0) {
            filaProcessos.push(processoAtual);
        }
        else {
            console.log("".concat(processoAtual.nome, " conclu\u00EDdo."));
            tempoVidaTotal += processoAtual.tempoVida;
            tempoEsperaTotal += processoAtual.tempoEspera;
        }
        if (filaProcessos.length > 0) {
            if (tempoTrocaContexto > 0) {
                console.log("Troca de contexto de ".concat(tempoAtual, " at\u00E9 ").concat(tempoAtual + tempoTrocaContexto));
                tempoAtual += tempoTrocaContexto;
            }
            processoAtual = filaProcessos.shift();
        }
        else {
            processoAtual = undefined;
        }
    };
    while (processoAtual !== undefined) {
        _loop_1();
    }
    console.log("Tempo total de execu\u00E7\u00E3o: ".concat(tempoTotal));
    var numeroProcessos = filaProcessos.length + 1; // Considerando os processos concluídos
    var tempoMedioVida = tempoVidaTotal / numeroProcessos;
    var tempoMedioEspera = tempoEsperaTotal / numeroProcessos;
    console.log("Tempo m\u00E9dio de vida dos processos: ".concat(tempoMedioVida));
    console.log("Tempo m\u00E9dio de espera dos processos: ".concat(tempoMedioEspera));
}
function main() {
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Informe o número de processos: ", function (numProcessosInput) {
        var numProcessos = parseInt(numProcessosInput);
        rl.question("Informe o tempo quantum: ", function (tempoQuantumInput) {
            var tempoQuantum = parseInt(tempoQuantumInput);
            rl.question("Informe o tempo de troca de contexto: ", function (tempoTrocaContextoInput) {
                var tempoTrocaContexto = parseInt(tempoTrocaContextoInput);
                var filaProcessos = [];
                var contadorProcessos = 1;
                var inputTempoExecucao = function () {
                    rl.question("Informe o tempo de execu\u00E7\u00E3o para o Processo ".concat(contadorProcessos, ": "), function (tempoExecucaoInput) {
                        var tempoExecucao = parseInt(tempoExecucaoInput);
                        var processo = new Processo("P".concat(contadorProcessos), tempoExecucao);
                        filaProcessos.push(processo);
                        if (contadorProcessos < numProcessos) {
                            contadorProcessos++;
                            inputTempoExecucao();
                        }
                        else {
                            executarRoundRobin(filaProcessos, tempoQuantum, tempoTrocaContexto);
                            rl.close();
                        }
                    });
                };
                inputTempoExecucao();
            });
        });
    });
}
main();
