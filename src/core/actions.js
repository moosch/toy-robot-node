import '../components/typedefs';

import { parseInput } from '../components/utils';
import {
  move,
  place,
  report,
  turn,
} from './reducers';

/**
 * Processes action based on input command
 * @param {String} cmd
 * @param {String} args
 * @param {STATE} state
 * @returns {STATE}
 */
function processAction(cmd, args, state) {
  // Ignore if first command is not PLACE
  if (!state.hasBeenPlaced && cmd !== 'PLACE') {
    return state;
  }

  const newState = {
    ...state,
    hasBeenPlaced: true,
  };

  switch (cmd) {
    case 'PLACE':
      return place(args, newState);

    case 'MOVE':
      return move(newState);

    case 'LEFT':
    case 'RIGHT':
      return turn(cmd, newState);

    case 'REPORT':
      return report(newState);

    default:
      return newState;
  }
}

/**
 * Handle robot action input
 * @param {String} input
 * @param {STATE} state
 * @returns {STATE}
 */
function handleLineInput(input, state) {
  try {
    const { cmd, args } = parseInput(input);
    return processAction(cmd, args, state)
  } catch (error) {
    return state;
  }
}

export {
  handleLineInput,
  processAction,
};

export default handleLineInput;
