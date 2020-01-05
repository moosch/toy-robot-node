import '../components/typedefs';
import { DIRECTIONS } from '../components/constants';
import stateValidator from '../components/validators';

/**
 * Places the robot on the table.
 * @param {Object} args
 * @param {STATE} state
 * @returns {STATE}
 */
function place(args, state) {
  return {
    ...state,
    ...args,
  };
}

/**
 * Moves the robot if it's a valid move.
 * @param {STATE} state
 * @returns {STATE}
 */
function move(state) {
  const { f: facing, x, y } = state;
  let newX = x;
  let newY = y;

  switch (facing) {
    case 'NORTH':
      newY = newY+1;
      break;
    case 'SOUTH':
      newY = newY-1;
      break;
    case 'EAST':
      newX = newX+1;
      break;
    case 'WEST':
      newX = newX-1;
      break;
  }

  if (!stateValidator.validate.y(newY) || !stateValidator.validate.x(newX)) {
    return state;
  }

  return {
    ...state,
    x: newX,
    y: newY,
  };
}

/**
 * Turns the robot.
 * @param {String} cmd - direction command
 * @param {STATE} state
 * @returns {STATE}
 */
function turn(cmd, state) {
  let { f: facing } = state;
  const facingIdx = DIRECTIONS.indexOf(facing);
  const lastIdx = DIRECTIONS.length-1;

  if(facingIdx < 0) {
    return state;
  } 

  switch (true) {
    case (facing === DIRECTIONS[0] && cmd === 'LEFT'):
      facing = DIRECTIONS[lastIdx];
      break;

    case (facing === DIRECTIONS[lastIdx] && cmd === 'RIGHT'):
      facing = DIRECTIONS[0];
      break;

    case (cmd === 'RIGHT'):
      facing = DIRECTIONS[facingIdx+1];
      break;

    case (cmd === 'LEFT'):
      facing = DIRECTIONS[facingIdx-1];
      break;
  }

  return {
    ...state,
    f: facing,
  };
}

/**
 * Logs robot position and facing state to console.
 * @param {STATE} state
 * @returns {STATE}
 */
function report(state) {
  const { x, y, f } = state;

  // Output
  const output = `${x},${y},${f}`;
  console.log(output);

  return state;
}

export {
  move,
  place,
  report,
  turn,
};
