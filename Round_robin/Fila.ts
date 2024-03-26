export class Fila<T> {
  private elementos: T[] = [];

  enqueue(elemento: T): void {
    this.elementos.push(elemento);
  }

  dequeue(): T | undefined {
    return this.elementos.shift();
  }

  peek(): T | undefined {
    return this.elementos[0];
  }

  isEmpty(): boolean {
    return this.elementos.length === 0;
  }

  size(): number {
    return this.elementos.length;
  }

  get elementosFila(): T[] {
    return this.elementos;
  }

}