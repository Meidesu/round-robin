"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = void 0;
var Tarefa = /** @class */ (function () {
    function Tarefa(tempoExecucao, tempoChegada, nome) {
        this._tempoExecucao = tempoExecucao;
        this._tempoRestante = tempoExecucao;
        this._tempoChegada = tempoChegada;
        this._tempoFinalizacao = 0;
        this._nome = nome;
    }
    Object.defineProperty(Tarefa.prototype, "tempoExecucao", {
        get: function () {
            return this._tempoExecucao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tarefa.prototype, "tempoChegada", {
        get: function () {
            return this._tempoChegada;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tarefa.prototype, "tempoFinalizacao", {
        get: function () {
            return this._tempoFinalizacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tarefa.prototype, "tempoRestante", {
        get: function () {
            return this._tempoRestante;
        },
        enumerable: false,
        configurable: true
    });
    Tarefa.prototype.executar = function (quantum) {
        if (quantum === void 0) { quantum = 1; }
        if (quantum > this._tempoRestante) {
            throw new Error('Quantum maior que o tempo restante');
        }
        this._tempoRestante -= quantum;
    };
    Tarefa.prototype.finalizar = function (tempo) {
        this._tempoFinalizacao = tempo;
    };
    Tarefa.prototype.toString = function () {
        return "\n    Tempo chegada: ".concat(this.tempoChegada, ",\n    Tempo Execu\u00E7\u00E3o: ").concat(this.tempoExecucao, "\n    ");
    };
    Object.defineProperty(Tarefa.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    return Tarefa;
}());
exports.Tarefa = Tarefa;
