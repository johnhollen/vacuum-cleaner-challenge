import { buildTravelledPath, findOverlappingLines } from './lineHelper';
import { Orientation, ParsedUserInput } from './types';

export function runVacuum(input: ParsedUserInput) {
  const path = buildTravelledPath(input);

  const horizontalLines = path.filter(
    (line) => line.orientation === Orientation.Horizontal
  );
  const verticalLines = path.filter(
    (line) => line.orientation === Orientation.Vertical
  );

  const cleanedHorizontalLines = findOverlappingLines(
    horizontalLines,
    Orientation.Horizontal
  );
  const cleanedVerticalLines = findOverlappingLines(
    verticalLines,
    Orientation.Vertical
  );

  console.log(cleanedHorizontalLines);
  console.log(cleanedVerticalLines);

  // Count the number of times a vertical line crosses a horizontal line
  // Sum steps in horizontalLines + steps in verticalLines and subtract number of intersections.
}
