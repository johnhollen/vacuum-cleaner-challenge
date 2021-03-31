import { Interface } from 'readline';

export type LineReaderFactory = () => Interface;

export enum Compass {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export interface Command {
  direction: Compass;
  steps: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Line {
  from: Coordinate;
  to: Coordinate;
  orientation: Orientation;
}

export interface ParsedUserInput {
  startCoordinate: Coordinate;
  commands: Command[];
}
