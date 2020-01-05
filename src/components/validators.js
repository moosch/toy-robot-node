import { COMMANDS, DIRECTIONS } from './constants';

const stateValidator = {
  max: 5,
  min: 0,
  validate: {
    x: (x) => typeof x === 'number' && x <= stateValidator.max && x >= stateValidator.min,
    y: (y) => typeof y === 'number' && y <= stateValidator.max && y >= stateValidator.min,
    f: (f) => typeof f === 'string' && DIRECTIONS.includes(f),
    cmd: (cmd) => typeof cmd === 'string' && COMMANDS.includes(cmd),
  }
};

export default stateValidator;
