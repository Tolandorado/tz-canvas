import { Grid } from './Grid';
import { ECellType, ETool, type TGridSize, type TPoint } from '../types/types';

export class Aquarium {
  private readonly grid: Grid;
  private waterLevelPercent: number;

  constructor(size: TGridSize) {
    this.grid = new Grid(size);
    this.waterLevelPercent = 0;
  }

  getGrid(): Grid {
    return this.grid;
  }

  getWaterLevel(): number {
    return this.waterLevelPercent;
  }

  setWaterLevel(percent: number): void {
    const clamped = Math.max(0, Math.min(100, percent));
    if (clamped === this.waterLevelPercent) {
      return;
    }

    this.waterLevelPercent = clamped;
    this.recalculateWater();
  }

  paint(position: TPoint, tool: ETool): void {
    switch (tool) {
      case ETool.Sand:
        this.setSandAt(position);
        break;
      case ETool.Erase:
        this.eraseAt(position);
        break;
      default:
        break;
    }

    this.recalculateWater();
  }

  setSandAt(position: TPoint): void {
    this.grid.setCell(position, ECellType.Sand);
  }

  eraseAt(position: TPoint): void {
    this.grid.setCell(position, ECellType.Air);
  }

  recalculateWater(): void {
    const { height } = this.grid.getSize();

    // Сначала очищаем всю воду
    this.grid.forEach((cell, position) => {
      if (cell.type === ECellType.Water) {
        this.grid.setCell(position, ECellType.Air);
      }
    });

    if (this.waterLevelPercent <= 0) {
      return;
    }

    const maxWaterRows = Math.floor((height * this.waterLevelPercent) / 100);
    if (maxWaterRows <= 0) {
      return;
    }

    // Простейная модель: вода заполняет доступные "воздушные" ячейки снизу вверх,
    // уважая препятствия из песка (не проходит сквозь них).
    const { width } = this.grid.getSize();

    for (let x = 0; x < width; x += 1) {
      let remainingInColumn = maxWaterRows;

      for (let y = height - 1; y >= 0 && remainingInColumn > 0; y -= 1) {
        const position = { x, y };
        const cell = this.grid.getCell(position);

        if (!cell) continue;

        if (cell.type === ECellType.Sand) {
          // Песок блокирует столбец выше, воду сюда и выше не льем.
          break;
        }

        if (cell.type === ECellType.Air) {
          this.grid.setCell(position, ECellType.Water);
          remainingInColumn -= 1;
        }
      }
    }
  }
}

