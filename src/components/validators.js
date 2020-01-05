import { DIRECTIONS } from './constants';

const stateValidator = {
  max: 5,
  min: 0,
  validate: {
    x: (x) => x <= stateValidator.max && x >= stateValidator.min,
    y: (y) => y <= stateValidator.max && y >= stateValidator.min,
    f: (f) => typeof f === 'string' && DIRECTIONS.includes(f),
    cmd: (cmd) => typeof cmd === 'string' && ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'].includes(cmd),
  }
};

export default stateValidator;
