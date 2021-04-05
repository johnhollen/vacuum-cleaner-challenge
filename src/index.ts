import { createInterface } from 'readline';
import { acceptAndParseUserInput } from './inputHandler';
import { runVacuum } from './vacuum';

function createDefaultLineReader() {
  return createInterface({
    input: process.stdin,
  });
}

(async function main() {
  const cleanedTiles = runVacuum(
    await acceptAndParseUserInput(createDefaultLineReader)
  );

  console.log('=> Cleaned:', cleanedTiles);
})();
