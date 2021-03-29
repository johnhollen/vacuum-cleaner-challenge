import { Interface } from 'readline';
import {
  Command,
  Compass,
  Coordinate,
  LineReaderFactory,
  ParsedUserInput,
} from './types';

function toInt(numberStr: string) {
  return parseInt(numberStr, 10);
}

function parseCoordinate(coordinateStr: string): Coordinate {
  const [x, y] = coordinateStr.split(' ');

  return {
    x: toInt(x),
    y: toInt(y),
  };
}

function parseCommand(commandStr: string): Command {
  const [direction, steps] = commandStr.split(' ');

  return {
    direction: direction as Compass,
    steps: toInt(steps),
  };
}

function readLines(lineReader: Interface) {
  return new Promise<{ startCoordinate: string; commands: string[] }>(
    (resolve) => {
      let lineIndex = -1;
      let numberOfCommands = 0;
      let startCoordinate = '';
      const commands: string[] = [];

      lineReader.on('line', (line) => {
        lineIndex += 1;
        if (lineIndex === 0) {
          numberOfCommands = toInt(line);
          return;
        }

        if (lineIndex === 1) {
          startCoordinate = line;
          return;
        }

        commands.push(line);

        if (lineIndex === numberOfCommands + 1) {
          lineReader.close();
          resolve({
            commands,
            startCoordinate,
          });
        }
      });
    }
  );
}

export async function acceptAndParseUserInput(
  lineReaderFactory: LineReaderFactory
): Promise<ParsedUserInput> {
  const lineReader = lineReaderFactory();

  const { startCoordinate, commands } = await readLines(lineReader);

  return {
    startCoordinate: parseCoordinate(startCoordinate),
    commands: commands.map(parseCommand),
  };
}
