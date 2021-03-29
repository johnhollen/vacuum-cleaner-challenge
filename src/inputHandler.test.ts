import { createInterface } from 'readline';
import { Readable } from 'stream';
import { acceptAndParseUserInput } from './inputHandler';
import { Compass } from './types';

function createTestReader() {
  const commands = ['2', '10 20', 'N 30', 'W 20'].join('\n');
  const inputStream = Readable.from(commands);
  return createInterface({
    input: inputStream,
  });
}

describe('inputHandler', () => {
  describe('acceptAndParseUserInput', () => {
    it('should accept user input return them formatted', async () => {
      const actual = await acceptAndParseUserInput(createTestReader);
      expect(actual).toEqual({
        startCoordinate: {
          x: 10,
          y: 20,
        },
        commands: [
          { direction: Compass.N, steps: 30 },
          { direction: Compass.W, steps: 20 },
        ],
      });
    });
  });
});
