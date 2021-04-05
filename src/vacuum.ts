import {
  buildTravelledPath,
  findOverlappingLines,
  isWithinRange,
} from './lineHelper';
import { Line, Orientation, ParsedUserInput } from './types';

function countIntersections(
  horizontalLines: Line[],
  verticalLines: Line[]
): number {
  let nrIntersections = 0;

  verticalLines.forEach((verticalLine) => {
    const intersectingHorizontalLines = horizontalLines.filter(
      (horizontalLine) =>
        isWithinRange(
          verticalLine.from.y,
          verticalLine.to.y,
          horizontalLine.from.y
        ) &&
        isWithinRange(
          horizontalLine.from.x,
          horizontalLine.to.x,
          verticalLine.from.x
        )
    );

    nrIntersections += intersectingHorizontalLines.length;
  });

  return nrIntersections;
}

function summarizeCleanedTiles(
  horizontalLines: Line[],
  verticalLines: Line[]
): number {
  let sum = 0;

  horizontalLines.forEach((line) => {
    const from = line.from.x;
    const to = line.to.x;
    // If the line was 2 tiles long, we actually covered three tiles from start to end
    // from = 0, to = 2,  2 - 0 == 2, and add the third tile
    sum += to - from + 1;
  });

  verticalLines.forEach((line) => {
    const from = line.from.y;
    const to = line.to.y;
    sum += to - from + 1;
  });

  return sum - countIntersections(horizontalLines, verticalLines);
}

export function runVacuum(input: ParsedUserInput): number {
  // If the number of commands is 0, we will have cleaned one tile.
  // The one the vacuum landed on when dropped in to the world
  if (!input.commands.length) {
    return 1;
  }

  const path = buildTravelledPath(input);

  const cleanedHorizontalLines = findOverlappingLines(
    path.filter((line) => line.orientation === Orientation.Horizontal)
  );
  const cleanedVerticalLines = findOverlappingLines(
    path.filter((line) => line.orientation === Orientation.Vertical)
  );

  return summarizeCleanedTiles(cleanedHorizontalLines, cleanedVerticalLines);
}
