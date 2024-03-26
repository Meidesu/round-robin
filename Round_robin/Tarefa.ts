export class Tarefa {
  private _tempoExecucao: number;
  private _tempoChegada: number;
  private _tempoFinalizacao: number;
  private _tempoRestante: number;
  private _nome: string;

  constructor(tempoExecucao: number, tempoChegada: number, nome: string) {
    this._tempoExecucao = tempoExecucao;
    this._tempoRestante = tempoExecucao;
    this._tempoChegada = tempoChegada;
    this._tempoFinalizacao = 0;
    this._nome = nome;
  }

  get tempoExecucao(): number {
    return this._tempoExecucao;
  }

  get tempoChegada(): number {
    return this._tempoChegada;
  }

  get tempoFinalizacao(): number {
    return this._tempoFinalizacao;
  }

  get tempoRestante(): number {
    return this._tempoRestante;
  }

  public executar(quantum: number = 1): void {
    if (quantum > this._tempoRestante) {
      throw new Error('Quantum maior que o tempo restante');
    }

    this._tempoRestante -= quantum;
  }

  public finalizar(tempo: number): void {
    this._tempoFinalizacao = tempo;
  }

  public toString(): string {
    return `
    Tempo chegada: ${this.tempoChegada},
    Tempo Execução: ${this.tempoExecucao}
    `
  }

  get nome(): string {
    return this._nome;
  }

}