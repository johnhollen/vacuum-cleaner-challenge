import { createInterface } from 'readline';
import { Readable } from 'stream';
import { acceptAndParseUserInput } from './inputHandler';
import { Compass } from './types';

function createTestStream(userInput: string) {
  return createInterface({
    input: Readable.from(userInput),
  });
}

describe('inputHandler', () => {
  describe('acceptAndParseUserInput', () => {
    it('should accept user input return them formatted', async () => {
      const createTestReader = jest.fn();

      const commands = ['3\n', '10 20\n', 'N 30\n', 'W 20\n', 'S 3'];

      commands.forEach((command) => {
        createTestReader.mockImplementationOnce(() =>
          createTestStream(command)
        );
      });

      const actual = await acceptAndParseUserInput(createTestReader);
      expect(actual).toEqual({
        startCoordinate: {
          x: 10,
          y: 20,
        },
        commands: [
          { direction: Compass.N, steps: 30 },
          { direction: Compass.W, steps: 20 },
          { direction: Compass.S, steps: 3 },
        ],
      });
    });
  });
});
