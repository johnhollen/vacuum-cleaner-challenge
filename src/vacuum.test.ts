import { Compass, ParsedUserInput } from './types';
import { runVacuum } from './vacuum';

describe('vacuum', () => {
  it('should clean a single horizontal line', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: 0, y: 0 },
      commands: [
        {
          direction: Compass.E,
          steps: 4,
        },
        {
          direction: Compass.E,
          steps: 5,
        },
      ],
    };

    expect(runVacuum(userInput)).toBe(10);
  });

  it('should clean a single vertical line', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: 0, y: 0 },
      commands: [
        {
          direction: Compass.S,
          steps: 4,
        },
        {
          direction: Compass.S,
          steps: 5,
        },
      ],
    };

    expect(runVacuum(userInput)).toBe(10);
  });

  it('should hande the example input from the instructions', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: 10, y: 22 },
      commands: [
        {
          direction: Compass.E,
          steps: 2,
        },
        {
          direction: Compass.N,
          steps: 1,
        },
      ],
    };

    expect(runVacuum(userInput)).toBe(4);
  });

  it('should remove the number of intersecting lines from the final result', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: 0, y: 0 },
      commands: [
        {
          direction: Compass.E,
          steps: 2,
        },
        {
          direction: Compass.N,
          steps: 1,
        },
        {
          direction: Compass.W,
          steps: 1,
        },
        {
          direction: Compass.S,
          steps: 2,
        },
      ],
    };

    expect(runVacuum(userInput)).toBe(7 - 1);
  });

  it('should handle several intersections', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: 0, y: 0 },
      commands: [
        {
          direction: Compass.E,
          steps: 3,
        },
        {
          direction: Compass.N,
          steps: 1,
        },
        {
          direction: Compass.W,
          steps: 1,
        },
        {
          direction: Compass.S,
          steps: 2,
        },
        {
          direction: Compass.W,
          steps: 1,
        },
        {
          direction: Compass.N,
          steps: 2,
        },
      ],
    };

    expect(runVacuum(userInput)).toBe(11 - 2);
  });

  it('should handle the maximum number of inputs', () => {
    const userInput: ParsedUserInput = {
      startCoordinate: { x: -100000, y: -100000 },
      commands: [],
    };

    const numberOfHorizontalLines = 5000;

    /*
      This loop creates a pattern that looks like this:
           |
      ------
      |
      ------
           |
      ------
    */

    for (let i = 1; i <= numberOfHorizontalLines; i++) {
      const isOddMove = i % 2 !== 0;

      userInput.commands.push({
        direction: isOddMove ? Compass.E : Compass.W,
        steps: 199999,
      });

      userInput.commands.push({
        direction: Compass.N,
        steps: 1,
      });
    }

    expect(userInput.commands.length).toBe(numberOfHorizontalLines * 2);

    // Each line is 200000 steps long, we have 5000 horizontal lines, and a total of 10000 commands.
    // Then we get an extra vertical line that's one step long
    expect(runVacuum(userInput)).toBe(200000 * 5000 + 1);
  });
});
