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
          horizontalLine.from.x,
          horizontalLine.to.x,
          verticalLine.from.x,
          false
        ) &&
        isWithinRange(
          verticalLine.from.y,
          verticalLine.to.y,
          horizontalLine.from.y,
          false
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
  // Start on 1.
  // Since the vacuum always gets dropped on a tile, the minimum number of cleaned will be 1
  let sum = 1;

  horizontalLines.forEach((line) => {
    const from = line.from.x;
    const to = line.to.x;
    sum += to - from;
  });

  verticalLines.forEach((line) => {
    const from = line.from.y;
    const to = line.to.y;
    sum += to - from;
  });

  return sum - countIntersections(horizontalLines, verticalLines);
}

export function runVacuum(input: ParsedUserInput): number {
  const path = buildTravelledPath(input);

  const cleanedHorizontalLines = findOverlappingLines(
    path.filter((line) => line.orientation === Orientation.Horizontal)
  );
  const cleanedVerticalLines = findOverlappingLines(
    path.filter((line) => line.orientation === Orientation.Vertical)
  );

  return summarizeCleanedTiles(cleanedHorizontalLines, cleanedVerticalLines);
}
