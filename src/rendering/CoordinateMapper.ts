import type { TCanvasPoint, TCanvasRect, TCanvasSize, TGridSize, TPoint } from '../types/types';

export class CoordinateMapper {
  private gridSize: TGridSize;
  private canvasSize: TCanvasSize;

  constructor(gridSize: TGridSize, canvasSize: TCanvasSize) {
    this.gridSize = gridSize;
    this.canvasSize = canvasSize;
  }

  setGridSize(size: TGridSize): void {
    this.gridSize = size;
  }

  setCanvasSize(size: TCanvasSize): void {
    this.canvasSize = size;
  }

  gridToCanvasRect(position: TPoint): TCanvasRect {
    const { width: gridWidth, height: gridHeight } = this.gridSize;
    const { width: canvasWidth, height: canvasHeight } = this.canvasSize;

    const cellWidth = canvasWidth / gridWidth;
    const cellHeight = canvasHeight / gridHeight;

    return {
      x: position.x * cellWidth,
      y: position.y * cellHeight,
      width: cellWidth,
      height: cellHeight,
    };
  }

  canvasToGridPoint(point: TCanvasPoint): TPoint | null {
    const { width: gridWidth, height: gridHeight } = this.gridSize;
    const { width: canvasWidth, height: canvasHeight } = this.canvasSize;

    if (canvasWidth === 0 || canvasHeight === 0) {
      return null;
    }

    const cellWidth = canvasWidth / gridWidth;
    const cellHeight = canvasHeight / gridHeight;

    const x = Math.floor(point.x / cellWidth);
    const y = Math.floor(point.y / cellHeight);

    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
      return null;
    }

    return { x, y };
  }
}

