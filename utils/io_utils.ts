import { isValid, ulid } from "ulidx";
import { keyIn, keyInPause, keyInSelect, keyInYNStrict, question, questionEMail } from "readline-sync";


function input(label: string): string{
  let out: string = question(label);

  while ( out == '' ){
    print("Texto está vazio!\n");
    out = question(label);
  }

  return out;
  // return question(label);
}

function inputInt(label: string): number{
  let numStr: string = question(label);

  while ( isNaN(Number(numStr)) || numStr == '' ||Number(numStr)%1 != 0){
    print("Valor inválido!\n");
    numStr = question(label);
  }

  return Number(numStr);
}

function inputPositiveInt(label: string): number{
  let num: number = inputInt(label);

  while ( num < 0 ){
    print("Valor inválido!\n");
    num = inputInt(label);
  }

  return num;
}

function inputEmail(label: string): string {
  let email: string = question(label);

  while ( !ehEmail(email) ){
    print('Email inválido!\n');

    email = question(label)
  }

  return email;
}

function inputId(label:string): string {
  let id: string = input(label);

  while ( !isValid(id) ) {
    print('ID inválido');

    id = input(label);
  } 

  return id;
}

function print(...parameters: any): void{

  let out: string = '';

  for ( let p of parameters ){
    out += `${p} `; 
  }

  console.log(out);
}

// Usa a biblioteca readline-sync para pausar a aplicação até que o usuario aperte Enter
function continuar() {
  keyIn("\n[Espaco para continuar...]")

  limparConsole()
}

function selecao(opcoes: string[]){
  return keyInSelect(opcoes, ">> ") + 1;
}

function simOuNao(label: string): boolean {
  return keyInYNStrict(label);
}

function limparConsole() {
  console.clear();
}

function ehEmail(texto: string): boolean {
  const partesEmail: string[] = texto.split('@');
  if (partesEmail.length !== 2) {
    return false;
  }

  const [parteLocal, parteDominio] = partesEmail;
  const partesDominio: string[] = parteDominio.split('.');

  return (
    parteLocal.length > 0 &&
    partesDominio.length == 2 &&
    partesDominio.every(parte => parte.length > 1)
  );

}

function gerarId() {
  return ulid();
}

function idValido(id:string): boolean {
  return isValid(id);
} 

function exibirTitulo() {
  let out: string = `
  ___               ___  __   __   __       
   |  |__| |  |\\/| |__  |__) /  \\ /  \\ |__/ 
   |  |  | |  |  | |___ |__) \\__/ \\__/ |  \\`

  print(out)
}

export{input, inputInt, print, limparConsole, continuar, selecao, inputEmail, gerarId, inputId, simOuNao, idValido, ehEmail , exibirTitulo, inputPositiveInt}