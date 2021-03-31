import { buildTravelledPath, findOverlappingLines } from './lineHelper';
import { Compass, Orientation } from './types';
import { createLine } from './__fixtures__/line.fixture';

describe('lineHelper', () => {
  describe('findOverlappingLines', () => {
    it('should find overlapping lines and extend them to a longer line', () => {
      const lines = [
        createLine(0, 0, 2, 0, Orientation.Horizontal),
        createLine(-4, 0, 1, 0, Orientation.Horizontal),
      ];

      const actual = findOverlappingLines(lines, Orientation.Horizontal);
      expect(actual).toEqual([createLine(-4, 0, 2, 0, Orientation.Horizontal)]);
    });

    it('it not extend lines that have the same fixed coordinate but doesnt overlap', () => {
      const lines = [
        createLine(0, 0, 0, 2, Orientation.Vertical),
        createLine(0, -4, 0, 1, Orientation.Vertical),
        createLine(0, 5, 0, 10, Orientation.Vertical),
      ];

      const actual = findOverlappingLines(lines, Orientation.Vertical);
      expect(actual).toEqual([
        createLine(0, -4, 0, 2, Orientation.Vertical),
        createLine(0, 5, 0, 10, Orientation.Vertical),
      ]);
    });
  });

  describe('buildTravelledPath', () => {
    it('should build the travelled path based on user input', () => {
      const actual = buildTravelledPath({
        startCoordinate: { x: 0, y: 0 },
        commands: [
          {
            direction: Compass.E,
            steps: 2,
          },
          {
            direction: Compass.N,
            steps: 2,
          },
          {
            direction: Compass.W,
            steps: 2,
          },
          {
            direction: Compass.S,
            steps: 2,
          },
        ],
      });

      expect(actual).toEqual([
        createLine(0, 0, 2, 0, Orientation.Horizontal),
        createLine(2, 0, 2, 2, Orientation.Vertical),
        createLine(0, 2, 2, 2, Orientation.Horizontal),
        createLine(0, 0, 0, 2, Orientation.Vertical),
      ]);
    });
  });
});
