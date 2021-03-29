import { Interface } from 'readline';

export type LineReaderFactory = () => Interface;

export enum Compass {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

export interface Command {
  direction: Compass;
  steps: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ParsedUserInput {
  startCoordinate: Coordinate;
  commands: Command[];
}
