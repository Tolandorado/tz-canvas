import { Grid } from './Grid';
import { ECellType, ETool, type TSize, type TPoint } from '../types/types';

export class Aquarium {
  private readonly grid: Grid;
  private waterLevelPercent: number;

  constructor(size: TSize) {
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
    const { width, height } = this.grid.getSize();

    this.grid.forEach((cell, position) => {
      if (cell.type === ECellType.Water) {
        this.grid.setCell(position, ECellType.Air);
      }
    });

    if (this.waterLevelPercent <= 0) {
      return;
    }

    const maxWaterHeight = Math.floor((height * this.waterLevelPercent) / 100);
    if (maxWaterHeight <= 0) {
      return;
    }
    const waterMinY = height - maxWaterHeight;

    for (let y = height - 1; y >= waterMinY; y--) {
      const sandIndices: number[] = [];
      for (let x = 0; x < width; x++) {
        if (this.grid.getCell({ x, y })?.type === ECellType.Sand) {
          sandIndices.push(x);
        }
      }

      if (sandIndices.length < 2) {
        continue;
      }

      for (let i = 0; i < sandIndices.length - 1; i++) {
        const leftWallX = sandIndices[i];
        const rightWallX = sandIndices[i + 1];

        for (let x = leftWallX + 1; x < rightWallX; x++) {
          const position = { x, y };
          const cell = this.grid.getCell(position);

          if (cell?.type !== ECellType.Air) {
            continue;
          }

          const cellBelow = this.grid.getCell({ x, y: y + 1 });
          const isSupported = y === height - 1 || (cellBelow && cellBelow.type !== ECellType.Air);

          if (isSupported) {
            this.grid.setCell(position, ECellType.Water);
          }
        }
      }
    }
  }
}

