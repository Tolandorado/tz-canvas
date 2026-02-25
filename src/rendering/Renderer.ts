import type { Grid } from '../core/Grid';
import { ECellType, type TSize, type TColors} from '../types/types';
import { CoordinateMapper } from './CoordinateMapper';

export abstract class Renderer {
  protected readonly coordinateMapper: CoordinateMapper;
  protected gridSize: TSize;
  protected canvasSize: TSize;
  protected colors: TColors;

  protected constructor(gridSize: TSize, canvasSize: TSize, colors?: Partial<TColors>) {
    this.gridSize = gridSize;
    this.canvasSize = canvasSize;
    this.coordinateMapper = new CoordinateMapper(gridSize, canvasSize);

    this.colors = {
      air: '#f5f5f5',
      sand: '#d2b48c',
      water: '#1e90ff',
      grid: 'rgba(0, 0, 0, 0.1)',
      ...colors,
    };
  }

  protected abstract clear(): void;

  protected abstract fillRect(x: number, y: number, width: number, height: number, color: string): void;

  protected abstract strokeLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth: number): void;

  private fillCells(grid: Grid): void {
    grid.forEach((cell, position) => {
      const rect = this.coordinateMapper.gridToCanvasRect(position);

      let color: string;
      switch (cell.type) {
        case ECellType.Sand:
          color = this.colors.sand;
          break;
        case ECellType.Water:
          color = this.colors.water;
          break;
        case ECellType.Air:
        default:
          color = this.colors.air;
      }

      this.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    });
  }

  private drawGridLines(): void {
    const { width: gridWidth, height: gridHeight } = this.gridSize;
    const { width: canvasWidth, height: canvasHeight } = this.canvasSize;

    const cellWidth = canvasWidth / gridWidth;
    const cellHeight = canvasHeight / gridHeight;

    for (let x = 0; x <= gridWidth; x += 1) {
      const xPos = x * cellWidth;
      this.strokeLine(xPos, 0, xPos, canvasHeight, this.colors.grid, 1);
    }

    for (let y = 0; y <= gridHeight; y += 1) {
      const yPos = y * cellHeight;
      this.strokeLine(0, yPos, canvasWidth, yPos, this.colors.grid, 1);
    }
  }

  setGridSize(size: TSize): void {
    this.gridSize = size;
    this.coordinateMapper.setGridSize(size);
  }

  setCanvasSize(size: TSize): void {
    this.canvasSize = size;
    this.coordinateMapper.setCanvasSize(size);
  }

  render(grid: Grid): void {
    this.clear();
    this.fillCells(grid);
    this.drawGridLines();
  }
}

