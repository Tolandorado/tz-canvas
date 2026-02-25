import type { Aquarium } from '../../core/Aquarium';
import type { TSize } from '../../types/types';
import { useAquariumCanvas } from './useAquariumCanvas';

export interface IAquariumCanvasProps {
  aquarium: Aquarium | null;
  gridSize: TSize | null;
  renderVersion: number;
}

export function AquariumCanvas({ aquarium, gridSize, renderVersion }: IAquariumCanvasProps) {
  const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, handleContextMenu } =
    useAquariumCanvas({
      aquarium,
      gridSize,
      renderVersion,
    });

  return (
    <div className="canvas_container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
      />
    </div>
  );
}

