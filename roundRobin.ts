class Processo {
    nome: string;
    tempoExecucao: number;
    tempoRestante: number;
    tempoVida: number;
    tempoEspera: number;

    constructor(nome: string, tempoExecucao: number) {
        this.nome = nome;
        this.tempoExecucao = tempoExecucao;
        this.tempoRestante = tempoExecucao;
        this.tempoVida = 0;
        this.tempoEspera = 0;
    }
}

function executarRoundRobin(filaProcessos: Processo[], tempoQuantum: number, tempoTrocaContexto: number): void {
    let tempoAtual: number = 0;
    let tempoTotal: number = 0;
    let tempoVidaTotal: number = 0;
    let tempoEsperaTotal: number = 0;

    let processoAtual: Processo | undefined = filaProcessos.shift();
    while (processoAtual !== undefined) {
        console.log(`Executando ${processoAtual.nome} de ${tempoAtual} até ${tempoAtual + Math.min(tempoQuantum, processoAtual.tempoRestante)}`);

        const tempoExecutado: number = Math.min(tempoQuantum, processoAtual.tempoRestante);
        tempoAtual += tempoExecutado;
        processoAtual.tempoRestante -= tempoExecutado;
        tempoTotal += tempoExecutado;
        processoAtual.tempoVida += tempoExecutado;

        filaProcessos.forEach((processo) => {
            if (processo !== processoAtual) {
                processo.tempoEspera += tempoExecutado;
            }
        });

        if (processoAtual.tempoRestante > 0) {
            filaProcessos.push(processoAtual);
        } else {
            console.log(`${processoAtual.nome} concluído.`);
            tempoVidaTotal += processoAtual.tempoVida;
            tempoEsperaTotal += processoAtual.tempoEspera;
        }

        if (filaProcessos.length > 0) {
            if (tempoTrocaContexto > 0) {
                console.log(`Troca de contexto de ${tempoAtual} até ${tempoAtual + tempoTrocaContexto}`);
                tempoAtual += tempoTrocaContexto;
            }
            processoAtual = filaProcessos.shift();
        } else {
            processoAtual = undefined;
        }
    }

    console.log(`Tempo total de execução: ${tempoTotal}`);
    const numeroProcessos = filaProcessos.length + 1; // Considerando os processos concluídos
    const tempoMedioVida = tempoVidaTotal / numeroProcessos;
    const tempoMedioEspera = tempoEsperaTotal / numeroProcessos;
    console.log(`Tempo médio de vida dos processos: ${tempoMedioVida}`);
    console.log(`Tempo médio de espera dos processos: ${tempoMedioEspera}`);
}

function main(): void {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Informe o número de processos: ", (numProcessosInput: string) => {
        const numProcessos: number = parseInt(numProcessosInput);

        rl.question("Informe o tempo quantum: ", (tempoQuantumInput: string) => {
            const tempoQuantum: number = parseInt(tempoQuantumInput);

            rl.question("Informe o tempo de troca de contexto: ", (tempoTrocaContextoInput: string) => {
                const tempoTrocaContexto: number = parseInt(tempoTrocaContextoInput);

                const filaProcessos: Processo[] = [];

                let contadorProcessos = 1;
                const inputTempoExecucao = () => {
                    rl.question(`Informe o tempo de execução para o Processo ${contadorProcessos}: `, (tempoExecucaoInput: string) => {
                        const tempoExecucao: number = parseInt(tempoExecucaoInput);
                        const processo: Processo = new Processo(`P${contadorProcessos}`, tempoExecucao);
                        filaProcessos.push(processo);

                        if (contadorProcessos < numProcessos) {
                            contadorProcessos++;
                            inputTempoExecucao();
                        } else {
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
