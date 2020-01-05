import stateValidator from './validators';

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

function parseInputParams(command, params) {
  // non PLACE command doesn't require params
  if (command !== 'PLACE') {
    return;
  }

  if (!params) {
    throw new RangeError();
  }

  const args = params.trim().split(',');

  if (
    args.length !== 3
    || (
      !stateValidator.validate.x(Number(args[0]))
      || !stateValidator.validate.y(Number(args[1]))
      || !stateValidator.validate.f(args[2])
    )) {
      throw new RangeError();
  }

  return {
    x: Number(args[0]),
    y: Number(args[1]),
    f: args[2],
  };
}

function parseInputCommand(command) {
  if (!stateValidator.validate.cmd(command)) {
    throw new RangeError();
  }

  return command;
}

function parseInput(input) {
  if (typeof input !== 'string') {
    throw new TypeError();
  }

  const { cmd, args } = pipe(

    (s) => s.trim().split(' '), // [String]

    (s) => s.filter((item) => item !== ' '), // ['PLACE', '0,0,NORTH']

    ([ command, params, ...rest ]) => ({
      cmd: parseInputCommand(command),
      args: parseInputParams(command, params),
    }),

    )(input);

  return {
    cmd,
    args,
  };
}

export {
  parseInput,
  parseInputParams,
  pipe,
};
