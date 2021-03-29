import { createInterface } from 'readline';
import { acceptAndParseUserInput } from './inputHandler';

function createDefaultLineReader() {
  return createInterface({
    input: process.stdin,
  });
}

async function main() {
  console.log('Vacuum is ready to accept input...');
  const userInput = await acceptAndParseUserInput(createDefaultLineReader);
  console.log('parsed user input >>', userInput);
}

main();
