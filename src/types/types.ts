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

export type TGridSize = {
  width: number;
  height: number;
};

export type TCell = {
  type: ECellType;
};



