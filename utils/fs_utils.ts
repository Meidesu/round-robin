import { readFileSync, writeFileSync } from "fs";

function lerArquivo(path:string): string[] {
  let linhas: string[] = readFileSync(path, 'utf8').split('\n');
  return linhas;
}

function escreverArquivo(path: string, conteudo: string): void {
  writeFileSync(path, conteudo);
}

export { lerArquivo, escreverArquivo };