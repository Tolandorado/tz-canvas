import type { Grid } from '../core/Grid';
import type { TSize } from '../types/types';
import { Renderer } from './Renderer';

export class CanvasRenderer extends Renderer {
  private readonly context: CanvasRenderingContext2D;

  constructor(
    context: CanvasRenderingContext2D,
    gridSize: { width: number; height: number },
    canvasSize: TSize,
  ) {
    super(gridSize, canvasSize);
    this.context = context;
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  }

  render(grid: Grid): void {
    this.canvasSize = {
      width: this.context.canvas.width,
      height: this.context.canvas.height,
    };
    this.setCanvasSize(this.canvasSize);

    super.render(grid);
  }

  protected fillRect(x: number, y: number, width: number, height: number, color: string): void {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  protected strokeLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    lineWidth: number,
  ): void {
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.beginPath();
    this.context.moveTo(x1 + 0.5, y1 + 0.5);
    this.context.lineTo(x2 + 0.5, y2 + 0.5);
    this.context.stroke();
  }
}

