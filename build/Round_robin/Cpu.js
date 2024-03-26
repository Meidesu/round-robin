"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
var Fila_1 = require("./Fila");
var Cpu = /** @class */ (function () {
    function Cpu(quantum, tarefas, trocaContexto) {
        this._listaPronto = [];
        this._listaFinalizado = [];
        this._filaTarefas = new Fila_1.Fila();
        this._tempo = 0;
        this._quantum = quantum;
        this._trocaContexto = trocaContexto;
        this.adicionarTarefas(tarefas);
    }
    Cpu.prototype.iniciar = function () {
        do {
            // Atualizar a fila de tarefas
            this._atualizarFilaTarefas();
            // Selecionar a próxima tarefa  
            this.tarefaAtual = this.selecionarProxima();
            var tempoRestante = this.tarefaAtual.tempoRestante;
            var _quantum = void 0;
            // Verificar se o tempo restante da tarefa é menor que o quantum
            if (tempoRestante <= this._quantum) {
                _quantum = tempoRestante;
                this._executarTarefaAtual(_quantum);
                this.tarefaAtual.finalizar(this._tempo + _quantum);
                this.avancarTempo(_quantum);
                this.printTarefaAtual(_quantum);
                this._adcionarTarefaFinalizada(this.tarefaAtual);
            }
            else {
                _quantum = this._quantum;
                this._executarTarefaAtual(_quantum);
                this.avancarTempo(_quantum);
                this.printTarefaAtual(_quantum);
                this._atualizarFilaTarefas();
                this.adicionarTarefaFila(this.tarefaAtual);
            }
        } while (!this._semTarefas());
    };
    Cpu.prototype._adcionarTarefaFinalizada = function (tarefaAtual) {
        if (tarefaAtual) {
            this._listaFinalizado.push(tarefaAtual);
        }
    };
    Cpu.prototype._executarTarefaAtual = function (qntm) {
        // Lançar exceção caso a tarefa atual não esteja definida
        if (!this.tarefaAtual) {
            throw new Error('Tarefa atual não definida');
        }
        // Executar a tarefa atual
        this.tarefaAtual.executar(qntm);
    };
    Cpu.prototype._atualizarFilaTarefas = function () {
        var listaAux = this._listaPronto.slice();
        // Adicionar as tarefas que chegaram no tempo atual na fila de tarefas
        if (listaAux.length != 0) {
            for (var _i = 0, listaAux_1 = listaAux; _i < listaAux_1.length; _i++) {
                var tarefa = listaAux_1[_i];
                if (tarefa.tempoChegada <= this._tempo) {
                    // Adicionar tarefa na fila de tarefas
                    this.adicionarTarefaFila(tarefa);
                    console.log('\n', tarefa.nome, 'Adicionada com sucesso');
                    // Remover tarefa da lista de tarefas prontas
                    this._listaPronto.splice(this._listaPronto.indexOf(tarefa), 1);
                }
            }
        }
    };
    Cpu.prototype.adicionarTarefas = function (tarefas) {
        var _a;
        if (tarefas.length == 0) {
            throw new Error('Lista de tarefas vazia');
        }
        // Adicionar as tarefas na lista de tarefas prontas
        (_a = this._listaPronto).push.apply(_a, tarefas);
        this._listaPronto.sort(function (a, b) { return a.tempoChegada - b.tempoChegada; });
    };
    Cpu.prototype.selecionarProxima = function () {
        // Lançar exceção caso a fila esteja vazia
        if (this._filaTarefas.isEmpty()) {
            throw new Error('Fila de tarefas vazia');
        }
        var retorno = this._filaTarefas.dequeue();
        if (!retorno) {
            throw new Error('Fila mal definida');
        }
        // Remover a proxima tarefa da fila
        return retorno;
    };
    Cpu.prototype._semTarefas = function () {
        // Verificar se a fila de tarefas está vazia
        return this._filaTarefas.isEmpty();
    };
    Cpu.prototype.avancarTempo = function (amount) {
        if (this._listaPronto.length == 0 && this._semTarefas()) {
            this._tempo += amount;
            return;
        }
        this._tempo += amount + this._trocaContexto;
    };
    Cpu.prototype.resultado = function () {
        console.log('\n### Resultado ### \n');
        var somatorioTempoEspera = 0;
        var qntTarefas = this._listaFinalizado.length;
        var somatorioTempoVida = 0;
        for (var _i = 0, _a = this._listaFinalizado; _i < _a.length; _i++) {
            var tarefa = _a[_i];
            if (tarefa != undefined) {
                var tempoEspera = tarefa.tempoFinalizacao - tarefa.tempoChegada - tarefa.tempoExecucao;
                var tempoVida = tarefa.tempoFinalizacao - tarefa.tempoChegada;
                somatorioTempoEspera += tempoEspera;
                somatorioTempoVida += tempoVida;
                console.log("".concat(tarefa.nome, ": Ts = ").concat(tempoEspera, " tv = ").concat(tempoVida));
                console.log('+-----------------------------------+');
            }
        }
        console.log("\nTempo m\u00E9dio de espera: ".concat((somatorioTempoEspera / qntTarefas)));
        console.log("Tempo m\u00E9dio de vida: ".concat((somatorioTempoVida / qntTarefas)));
    };
    Cpu.prototype.adicionarTarefaFila = function (tarefa) {
        // Adicionar tarefa na fila de tarefas
        this._filaTarefas.enqueue(tarefa);
    };
    Cpu.prototype.printTarefaAtual = function (_quantum) {
        console.log('\nTarefa atual: ', this.tarefaAtual.nome);
        console.log('Tempo restante: ', this.tarefaAtual.tempoRestante);
        console.log('Qnt tempo: ', _quantum);
        console.log('Tempo atual: ', this._tempo);
        console.log('+---------------------------------------------------------------------+');
    };
    return Cpu;
}());
exports.Cpu = Cpu;
