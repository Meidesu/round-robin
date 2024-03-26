import { Fila } from "./Fila";
import { Tarefa } from "./Tarefa";


export class Cpu {
  private _filaTarefas: Fila<Tarefa>;
  private _listaPronto: Tarefa[] = [];
  private _listaFinalizado: Tarefa[] = [];
  private _tempo: number;
  private _quantum: number;
  private _trocaContexto: number;

  private tarefaAtual!: Tarefa;
  
  constructor(quantum: number, tarefas: Tarefa[], trocaContexto: number) {
    this._filaTarefas = new Fila<Tarefa>();
    this._tempo = 0;
    this._quantum = quantum;
    this._trocaContexto = trocaContexto;
    
    this.adicionarTarefas(tarefas);
  }
  
  public iniciar(): void {
    
    do{
      
      // Atualizar a fila de tarefas
      this._atualizarFilaTarefas();

      // Selecionar a próxima tarefa  
      this.tarefaAtual = this.selecionarProxima();
      
      let tempoRestante: number = this.tarefaAtual.tempoRestante;
      let _quantum: number;

      // Verificar se o tempo restante da tarefa é menor que o quantum
      if (tempoRestante <= this._quantum){
        _quantum = tempoRestante;
        this._executarTarefaAtual(_quantum);
        this.tarefaAtual.finalizar(this._tempo+_quantum);

        this.avancarTempo(_quantum);
        this.printTarefaAtual(_quantum);
        
        this._adcionarTarefaFinalizada(this.tarefaAtual);
      } else {
        
        _quantum = this._quantum;
        this._executarTarefaAtual(_quantum);
        this.avancarTempo(_quantum);
        this.printTarefaAtual(_quantum);

        this._atualizarFilaTarefas();
        this.adicionarTarefaFila(this.tarefaAtual)
      }
      
    } while (!this._semTarefas()); 
  }
  private _adcionarTarefaFinalizada(tarefaAtual: Tarefa) {
    if ( tarefaAtual ){
      
      this._listaFinalizado.push(tarefaAtual);
    }
  }

  private _executarTarefaAtual(qntm: number) {

    // Lançar exceção caso a tarefa atual não esteja definida
    if ( !this.tarefaAtual ){
      throw new Error('Tarefa atual não definida');
    }

    // Executar a tarefa atual
    this.tarefaAtual.executar(qntm);
  }

  private _atualizarFilaTarefas() {
    let listaAux: Tarefa[] = this._listaPronto.slice();


    // Adicionar as tarefas que chegaram no tempo atual na fila de tarefas
    if ( listaAux.length != 0 ){
      for ( let tarefa of listaAux){        
        if ( tarefa.tempoChegada <= this._tempo ){
          
          // Adicionar tarefa na fila de tarefas
          this.adicionarTarefaFila(tarefa);
          console.log('\n', tarefa.nome, 'Adicionada com sucesso');
          
          // Remover tarefa da lista de tarefas prontas
          this._listaPronto.splice(this._listaPronto.indexOf(tarefa), 1); 
          
        }
      }
    }
  }
  
  public adicionarTarefas(tarefas: Tarefa[]): void { 
    
    if ( tarefas.length == 0 ){
      throw new Error('Lista de tarefas vazia');
    }

    // Adicionar as tarefas na lista de tarefas prontas
    this._listaPronto.push(...tarefas);
    this._listaPronto.sort( (a, b) => a.tempoChegada - b.tempoChegada );

  } 

  public selecionarProxima(): Tarefa{

    // Lançar exceção caso a fila esteja vazia
    if ( this._filaTarefas.isEmpty() ){

      throw new Error('Fila de tarefas vazia');
    }

    let retorno: Tarefa | undefined = this._filaTarefas.dequeue();

    if (!retorno){
      throw new Error('Fila mal definida');
    } 

    // Remover a proxima tarefa da fila
    return retorno;
  }

  private _semTarefas(): boolean {

    // Verificar se a fila de tarefas está vazia
    return this._filaTarefas.isEmpty();
  }

  public avancarTempo(amount: number): void {
    if ( this._listaPronto.length == 0 && this._semTarefas()){
      this._tempo += amount;
      return;
    }

    this._tempo += amount + this._trocaContexto;

  }
  public resultado(): void {    

    console.log('\n### Resultado ### \n');

    let somatorioTempoEspera: number = 0;
    let qntTarefas: number = this._listaFinalizado.length;

    let somatorioTempoVida: number = 0;
    
    for ( let tarefa of this._listaFinalizado ){
      if ( tarefa != undefined){
        let tempoEspera: number = tarefa.tempoFinalizacao - tarefa.tempoChegada - tarefa.tempoExecucao;
        let tempoVida: number = tarefa.tempoFinalizacao - tarefa.tempoChegada;

        somatorioTempoEspera += tempoEspera;
        somatorioTempoVida += tempoVida;

        console.log(`${tarefa.nome}: Ts = ${tempoEspera} tv = ${tempoVida}`);

        console.log('+-----------------------------------+')
      }
    }

    console.log(`\nTempo médio de espera: ${(somatorioTempoEspera/qntTarefas)}`);
    console.log(`Tempo médio de vida: ${(somatorioTempoVida/qntTarefas)}`);
  }

  public adicionarTarefaFila(tarefa: Tarefa): void {

    // Adicionar tarefa na fila de tarefas
    this._filaTarefas.enqueue(tarefa);
  }

  public printTarefaAtual(_quantum: number): void{
    console.log('\nTarefa atual: ', this.tarefaAtual.nome);
    console.log('Tempo restante: ', this.tarefaAtual.tempoRestante);
    console.log('Qnt tempo: ', _quantum);
    console.log('Tempo atual: ', this._tempo);
    console.log('+---------------------------------------------------------------------+');
  }

}