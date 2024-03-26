"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = require("readline-sync");
const viewUtils_1 = require("./utils/viewUtils");
function main() {
    function showInfo() {
        console.log("O sistema tem:");
        console.log(existentes);
        console.log("Alocados: ");
        processos.forEach((p, ind) => {
            process.stdout.write(`${ind + 1} - [ `);
            p.forEach((rec) => {
                process.stdout.write(`${rec} `);
            });
            process.stdout.write(`]`);
            if (caminhoSeguro.includes(ind)) {
                process.stdout.write(" - FINALIZADO");
            }
            process.stdout.write("\n");
        });
        console.log("Necessários: ");
        necessarios.forEach((p, ind) => {
            process.stdout.write(`${ind + 1} - [ `);
            p.forEach((rec) => {
                process.stdout.write(`${rec} `);
            });
            process.stdout.write(`]`);
            if (caminhoSeguro.includes(ind)) {
                process.stdout.write(" - FINALIZADO");
            }
            process.stdout.write("\n");
        });
        console.log("Banqueiro:");
        console.log(banqueiro);
    }
    function mostrarCaminhoFeliz() {
        // mostrar caminho 
        console.log("Caminho lindo: ");
        for (let i = 0; i < caminhoSeguro.length; i++) {
            process.stdout.write(`${(caminhoSeguro[i] != -1) ? String(caminhoSeguro[i] + 1) : "X"} `);
        }
    }
    console.clear();
    console.log("ALGORITMO DO BANQUEIRO");
    let temJogo = true;
    let numeroDoProcessoAtual = 0;
    let qntRecursos = Number((0, readline_sync_1.question)("Numero de Recursos: "));
    let qntProcessos = Number((0, readline_sync_1.question)("Numero de Processos: "));
    console.clear();
    let caminhoSeguro = [];
    // Existentes:
    let existentes = [];
    // for (let i = 0; i < qntRecursos; i++) {
    //     existentes[i] = qntProcessos + randomInt(0, 5);
    // }
    // let paraDistribuir: Array<number> = [];
    // for (let i = 0; i < qntRecursos; i++) {
    //     paraDistribuir[i] = existentes[i];
    // }
    // Processos:
    let processos = [];
    // for (let i = 0; i < qntProcessos; i++) {
    //     processos[i] = new Array<number>;
    //     for (let j = 0; j < qntRecursos; j++) {
    //         let deducao = Math.min(paraDistribuir[j], randomInt(0, 3));
    //         processos[i][j] = deducao;
    //         paraDistribuir[j] -= deducao;
    //     }
    // }
    // Necessários:
    let necessarios = [];
    // for (let i = 0; i < qntProcessos; i++) {
    //     necessarios[i] = new Array<number>;
    //     for (let j = 0; j < qntRecursos; j++) {
    //         necessarios[i][j] = randomInt(2, 8);
    //     }
    // }
    let banqueiro = new Array;
    // for (let i = 0; i < qntRecursos; i++) {
    //     // Descobrir quanto está alocado em cada recurso.
    //     banqueiro[i] = existentes[i];
    //     for (let n = 0; n < processos.length; n++) {
    //         banqueiro[i] -= processos[n][i];
    //     }
    // }
    processos = [
        [0, 0, 1, 0],
        [2, 0, 0, 1],
        [0, 1, 2, 0]
    ];
    necessarios = [
        [2, 0, 0, 1],
        [1, 0, 1, 0],
        [2, 1, 0, 1]
    ];
    existentes = [];
    existentes = [4, 2, 3, 1];
    banqueiro = [2, 1, 0, 0];
    let contadorDeChecagens = 0;
    while (temJogo) {
        showInfo();
        enterToContinue();
        // Percorrer todos os processos, 
        // e saber qual deles pode ser completado caso 
        // peça emprestado ao banqueiro.
        for (let i = 0; i < processos.length; i++) {
            if (caminhoSeguro.includes(i)) {
                console.log(`Tarefa ${i} já foi finalizada e liberou seus recursos.`);
                enterToContinue();
                continue;
            }
            let apto = true;
            let processinho = processos[i];
            // Conferir cada recurso, se tem como ser quitado
            for (let j = 0; j < processinho.length; j++) {
                let diferenca = necessarios[i][j] - processinho[j];
                if (diferenca <= banqueiro[j]) {
                    console.log(`Checamos o processo ${i + 1}, e o recurso ${j} e tá OK.`);
                }
                else {
                    console.log(`Checamos o processo ${i + 1}, e o recurso ${j} e NÃO TÁ OK.`);
                    apto = false;
                    break;
                }
            }
            if (apto) {
                console.log(`Processo ${i + 1} está APTO.`);
                caminhoSeguro.push(i);
                // Ajuda o devedor
                for (let j = 0; j < banqueiro.length; j++) {
                    banqueiro[j] += processinho[j];
                    processinho[j] = 0;
                }
                contadorDeChecagens = 0;
                break;
            }
            else {
                console.log(`Processo ${i} NÃO está APTO.`);
                contadorDeChecagens++;
            }
        }
        enterToContinue();
        if (contadorDeChecagens >= processos.length) {
            console.log();
            console.log("Concorda comigo que não tem mais o que ser feito?");
            enterToContinue();
            temJogo = false;
            caminhoSeguro.push(-1);
        }
        mostrarCaminhoFeliz();
        enterToContinue();
        (0, viewUtils_1.limparTela)();
    }
    console.log("Só alegria.");
}
function enterToContinue() {
    (0, readline_sync_1.question)("");
}
main();
