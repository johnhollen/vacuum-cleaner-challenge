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

function readLine(lineReaderFactory: LineReaderFactory) {
  return new Promise<string>((resolve) => {
    const lineReader = lineReaderFactory();
    lineReader.on('line', (userInput) => {
      lineReader.close();
      resolve(userInput);
    });
  });
}

export async function acceptAndParseUserInput(
  lineReaderFactory: LineReaderFactory
): Promise<ParsedUserInput> {
  const numberOfCommands = toInt(await readLine(lineReaderFactory));
  const startCoordinate = await readLine(lineReaderFactory);
  const commands: string[] = [];

  for (let i = 0; i < numberOfCommands; i++) {
    commands.push(await readLine(lineReaderFactory));
  }

  return {
    startCoordinate: parseCoordinate(startCoordinate),
    commands: commands.map(parseCommand).filter((command) => command.steps > 0),
  };
}
