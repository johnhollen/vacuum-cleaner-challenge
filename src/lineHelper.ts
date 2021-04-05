import {
  Command,
  Compass,
  Coordinate,
  Line,
  Orientation,
  ParsedUserInput,
} from './types';

function calculateEndpoint(
  start: Coordinate,
  { direction, steps }: Command
): { coordinate: Coordinate; orientation: Orientation } {
  switch (direction) {
    case Compass.N:
      return {
        coordinate: {
          ...start,
          y: start.y + steps,
        },
        orientation: Orientation.Vertical,
      };
    case Compass.E:
      return {
        coordinate: {
          ...start,
          x: start.x + steps,
        },
        orientation: Orientation.Horizontal,
      };
    case Compass.S:
      return {
        coordinate: {
          ...start,
          y: start.y - steps,
        },
        orientation: Orientation.Vertical,
      };
    case Compass.W:
      return {
        coordinate: {
          ...start,
          x: start.x - steps,
        },
        orientation: Orientation.Horizontal,
      };
  }
}

function buildNormalizedLine(
  from: Coordinate,
  to: Coordinate,
  orientation: Orientation
): Line {
  if (orientation === Orientation.Horizontal) {
    return {
      from: {
        x: Math.min(from.x, to.x),
        y: to.y,
      },
      to: {
        x: Math.max(from.x, to.x),
        y: to.y,
      },
      orientation,
    };
  }

  return {
    from: {
      x: to.x,
      y: Math.min(from.y, to.y),
    },
    to: {
      x: to.x,
      y: Math.max(from.y, to.y),
    },
    orientation,
  };
}

export function buildTravelledPath({
  startCoordinate,
  commands,
}: ParsedUserInput): Line[] {
  let lastEndpoint = { ...startCoordinate };

  return commands.map((command) => {
    const { coordinate: endCoordinate, orientation } = calculateEndpoint(
      lastEndpoint,
      command
    );

    const line = buildNormalizedLine(lastEndpoint, endCoordinate, orientation);

    lastEndpoint = { ...endCoordinate };

    return line;
  });
}

function groupLinesByFixedCoordinate(lines: Line[]) {
  const lookup: { [key: number]: Line[] } = {};

  const groupingCoordinate =
    lines[0].orientation === Orientation.Horizontal ? 'y' : 'x';

  lines.forEach((line) => {
    const groupKey = line.from[groupingCoordinate];

    if (!lookup[groupKey]) {
      lookup[groupKey] = [];
    }
    lookup[groupKey].push(line);
  });

  return lookup;
}

export function isWithinRange(
  from: number,
  to: number,
  valueToCheck: number,
  includeLineEnds = true
): boolean {
  if (includeLineEnds) {
    return valueToCheck >= from && valueToCheck <= to;
  }
  return valueToCheck > from && valueToCheck < to;
}

function extendLine(line1: Line, line2: Line): Line {
  if (line1.orientation === Orientation.Horizontal) {
    return {
      from: {
        x: Math.min(line1.from.x, line2.from.x),
        y: line1.from.y,
      },
      to: {
        x: Math.max(line1.to.x, line2.to.x),
        y: line1.from.y,
      },
      orientation: line1.orientation,
    };
  }

  return {
    from: {
      x: line1.from.x,
      y: Math.min(line1.from.y, line2.from.y),
    },
    to: {
      x: line1.from.x,
      y: Math.max(line1.to.y, line2.to.y),
    },
    orientation: line1.orientation,
  };
}

function mergeOverlappingLines(lines: Line[]): Line[] {
  const coordinateToCheck =
    lines[0].orientation === Orientation.Horizontal ? 'x' : 'y';

  const sortedLines = [...lines].sort((a, b) => {
    return a.from[coordinateToCheck] - b.from[coordinateToCheck];
  });

  let resultingLines: Line[] = [];
  let extendingLine = sortedLines[0];

  sortedLines.forEach((line) => {
    if (
      isWithinRange(
        extendingLine.from[coordinateToCheck],
        extendingLine.to[coordinateToCheck],
        line.from[coordinateToCheck]
      )
    ) {
      extendingLine = extendLine(extendingLine, line);
    } else {
      resultingLines.push(extendingLine);
      extendingLine = line;
    }
  });
  resultingLines.push(extendingLine);
  return resultingLines;
}

export function findOverlappingLines(lines: Line[]): Line[] {
  if (!lines.length) {
    return [];
  }

  const linesGroupedByFixedCoordinate = groupLinesByFixedCoordinate(lines);

  Object.keys(linesGroupedByFixedCoordinate).forEach((key) => {
    const keyAsInt = parseInt(key, 10);
    const lines = linesGroupedByFixedCoordinate[keyAsInt];
    linesGroupedByFixedCoordinate[keyAsInt] = mergeOverlappingLines(lines);
  });

  return Object.values(linesGroupedByFixedCoordinate).reduce((acc, lines) => {
    acc = [...acc, ...lines];
    return acc;
  }, []);
}
