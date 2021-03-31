import { Line, Orientation } from '../types';

export const createLine = (
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  orientation: Orientation
): Line => ({
  orientation,
  from: {
    x: fromX,
    y: fromY,
  },
  to: {
    x: toX,
    y: toY,
  },
});
