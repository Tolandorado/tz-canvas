import { useCallback, useEffect, useRef } from 'react';
import type { Aquarium } from '../../core/Aquarium';
import type { TSize } from '../../types/types';
import { CanvasRenderer } from '../../rendering/CanvasRenderer';
import { CoordinateMapper } from '../../rendering/CoordinateMapper';
import { ETool } from '../../types/types';

interface IUseAquariumCanvasParams {
  aquarium: Aquarium | null;
  gridSize: TSize | null;
  renderVersion: number;
}

export const useAquariumCanvas = ({ aquarium, gridSize, renderVersion }: IUseAquariumCanvasParams) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const mapperRef = useRef<CoordinateMapper | null>(null);
  const isDrawingRef = useRef(false);
  const currentButtonRef = useRef<number | null>(null);

  const ensureRenderer = useCallback(() => {
    if (!aquarium || !gridSize) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const parent = canvas.parentElement;
    const availableWidth = (parent?.clientWidth ?? window.innerWidth) || 0;
    const aspectRatio = gridSize.height / gridSize.width || 1;
    const maxHeight = window.innerHeight * 0.7;
    const height = Math.min(availableWidth * aspectRatio, maxHeight);
    const width = availableWidth;

    canvas.width = width;
    canvas.height = height;

    if (!rendererRef.current) {
      rendererRef.current = new CanvasRenderer(context, gridSize, { width, height });
      mapperRef.current = new CoordinateMapper(gridSize, { width, height });
    } else {
      rendererRef.current.setGridSize(gridSize);
      rendererRef.current.setCanvasSize({ width, height });
      mapperRef.current?.setGridSize(gridSize);
      mapperRef.current?.setCanvasSize({ width, height });
    }

    rendererRef.current.render(aquarium.getGrid());
  }, [aquarium, gridSize]);

  useEffect(() => {
    ensureRenderer();
  }, [ensureRenderer, renderVersion]);

  useEffect(() => {
    const handleResize = () => {
      ensureRenderer();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ensureRenderer]);

  const applyStroke = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!aquarium || !gridSize) {
        return;
      }

      const canvas = canvasRef.current;
      const mapper = mapperRef.current;
      const renderer = rendererRef.current;
      if (!canvas || !mapper || !renderer) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const gridPoint = mapper.canvasToGridPoint({ x, y });
      if (!gridPoint) {
        return;
      }

      const button = currentButtonRef.current ?? event.button;
      const tool = button === 2 ? ETool.Erase : ETool.Sand;

      aquarium.paint(gridPoint, tool);
      renderer.render(aquarium.getGrid());
    },
    [aquarium, gridSize],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      isDrawingRef.current = true;
      currentButtonRef.current = event.button;
      applyStroke(event);
    },
    [applyStroke],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) {
        return;
      }

      applyStroke(event);
    },
    [applyStroke],
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    currentButtonRef.current = null;
  }, []);

  const handleMouseUp = useCallback(() => {
    stopDrawing();
  }, [stopDrawing]);

  const handleMouseLeave = useCallback(() => {
    stopDrawing();
  }, [stopDrawing]);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
  }, []);

  return {
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleContextMenu,
  };
};

