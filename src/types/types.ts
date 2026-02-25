export enum ECellType {
  Air = 'air',
  Sand = 'sand',
  Water = 'water',
}

export enum ETool {
  Sand = 'sand',
  Erase = 'erase',
}

export type TPoint = {
  x: number;
  y: number;
};

export type TSize = {
  width: number;
  height: number;
};

export type TCell = {
  type: ECellType;
};

export type TCanvasPoint = {
  x: number;
  y: number;
};

export type TCanvasRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TColors = {
  air: string;
  sand: string;
  water: string;
  grid: string;
};