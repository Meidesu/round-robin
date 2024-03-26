import { inputPositiveInt } from "../utils/io_utils";
import { Cpu } from "./Cpu";
import { Tarefa } from "./Tarefa";

function main() {

  let qnt: number = inputPositiveInt('Quantidade de tarefas: ');
  let quantum: number = inputPositiveInt('Quantum: ');
  let trocaContexto: number = inputPositiveInt('Troca de contexto: ');

  let tarefas: Tarefa[] = [];

  for ( let i = 0; i < qnt; i++ ){

    let tempoExecucao: number = inputPositiveInt(`\nTempo de execução T${i+1}: `);
    let tempoChegada: number = inputPositiveInt('Tempo de chegada: ');


    tarefas.push(new Tarefa(tempoExecucao, tempoChegada, `T${i+1}`));
  }

  let cpu: Cpu = new Cpu(quantum, tarefas, trocaContexto);

  try {
    cpu.iniciar();

  } catch (error: any) {
    
    console.log(error.message);
  } 
  
  console.log(cpu.resultado()); 
  console.log('\nFim da execução');
}

main();