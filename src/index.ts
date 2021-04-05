import { createInterface } from 'readline';
import { acceptAndParseUserInput } from './inputHandler';
import { runVacuum } from './vacuum';

function createDefaultLineReader() {
  return createInterface({
    input: process.stdin,
  });
}

async function main() {
  console.log('Vacuum is ready to accept input...');

  const userInput = await acceptAndParseUserInput(createDefaultLineReader);

  const cleanedTiles = runVacuum(userInput);

  console.log('');
  console.log('=> Cleaned:', cleanedTiles);
  console.log('');
}

main();
