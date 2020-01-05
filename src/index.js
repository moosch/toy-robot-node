import Readline from 'readline';

import handleLineInput from './core/actions';

// Initial state
let state = {
  x: undefined,
  y: undefined,
  f: undefined,
  hasBeenPlaced: false,
};

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Send instructions to the robit');

readline.on('line', (line) => {
  state = handleLineInput(line.trim(), state);
  readline.prompt();
})
  .on('close', () => {
    console.log('Bye 👋');
    process.exit(0);
  });

// Start prompt
readline.prompt();
