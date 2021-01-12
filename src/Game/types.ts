export interface IConfig {
  FIRST_PLAYER: string;
  FIRST_PLAYER_NAME: string;
  SECOND_PLAYER: string;
  SECOND_PLAYER_NAME: string;
  GRID_DIMENSION: number;
  CELL_DIMENSION: number;
}

export interface IWinnerConfig {
  selectedItems: Array<number>;
  GRID_DIMENSION: number;
}

export type TSelectedItems = Array<number>;
