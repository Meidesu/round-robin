export class Pilha<Type> {
  private elementos: Type[] = [];

  push(elemento: Type): void {
    this.elementos.push(elemento);
  }

  pop(): Type | undefined {
    return this.elementos.pop();
  }

  peek(): Type | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  isEmpty(): boolean {
    return this.elementos.length === 0;
  }

  size(): number {
    return this.elementos.length;
  }
}