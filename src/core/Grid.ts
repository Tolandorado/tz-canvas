import type { TCell, ECellType, TPoint, TGridSize } from '../types/types';

export class Grid {
  private readonly width: number;
  private readonly height: number;
  private readonly cells: TCell[][];

  constructor(size: TGridSize) {
    this.width = size.width;
    this.height = size.height;
    this.cells = this.createEmptyCells();
  }

  private createEmptyCells(): TCell[][] {
    const cells: TCell[][] = [];

    for (let y = 0; y < this.height; y += 1) {
      const row: TCell[] = [];
      for (let x = 0; x < this.width; x += 1) {
        row.push({ type: 'air' as ECellType });
      }
      cells.push(row);
    }

    return cells;
  }

  private *positions(): Iterable<TPoint> {
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        yield { x, y };
      }
    }
  }

  private isWithinBounds(position: TPoint): boolean {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    );
  }

  getSize(): TGridSize {
    return { width: this.width, height: this.height };
  }

  getCell(position: TPoint): TCell | null {
    if (!this.isWithinBounds(position)) {
      return null;
    }

    return this.cells[position.y][position.x];
  }

  setCell(position: TPoint, type: ECellType): void {
    if (!this.isWithinBounds(position)) {
      return;
    }

    this.cells[position.y][position.x] = { type };
  }

  clear(): void {
    for (const { x, y } of this.positions()) {
      this.cells[y][x] = { type: 'air' as ECellType };
    }
  }

  forEach(callback: (cell: TCell, position: TPoint) => void): void {
    for (const position of this.positions()) {
      callback(this.cells[position.y][position.x], position);
    }
  }
}

