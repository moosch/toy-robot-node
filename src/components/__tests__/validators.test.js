import { assert } from 'chai';

import stateValidator from '../validators';
import { COMMANDS, DIRECTIONS } from '../constants';

describe('validators test', () => {

  describe('validate', () => {

    describe('x validator function', () => {
      let sut;

      beforeEach(() => {
        sut = stateValidator.validate.x;
      });

      it('must be a function that accepts one param', () => {
        assert.isFunction(sut);
        assert.lengthOf(sut, 1);
      });

      it('must return false if the input us of the wrong type', () => {
        const expected = false;

        const badXValues = [
          undefined,
          null,
          NaN,
          () => {},
          'string',
          {},
          [],
        ];

        badXValues.forEach((x) => {
          const actual = sut(x);

          assert.equal(actual, expected);
        });
      });

      it('must return false if the input value is outside the min/max range', () => {
        const expected = false;

        const badXValues = [
          stateValidator.min-1,
          stateValidator.max+1,
        ];

        badXValues.forEach((x) => {
          const actual = sut(x);

          assert.equal(actual, expected);
        });
      });

      it('must return true if the input value is within allowed range', () => {
        const expected = true;

        const goodXValues = [
          stateValidator.min+1,
          stateValidator.max-1,
        ];

        goodXValues.forEach((x) => {
          const actual = sut(x);

          assert.equal(actual, expected);
        });
      });
    });

    describe('y validator function', () => {
      let sut;

      beforeEach(() => {
        sut = stateValidator.validate.y;
      });

      it('must be a function that accepts one param', () => {
        assert.isFunction(sut);
        assert.lengthOf(sut, 1);
      });

      it('must return false if the input us of the wrong type', () => {
        const expected = false;

        const badYValues = [
          undefined,
          null,
          NaN,
          () => {},
          'string',
          {},
          [],
        ];

        badYValues.forEach((y) => {
          const actual = sut(y);

          assert.equal(actual, expected);
        });
      });

      it('must return false if the input value is outside the min/max range', () => {
        const expected = false;

        const badYValues = [
          stateValidator.min-1,
          stateValidator.max+1,
        ];

        badYValues.forEach((y) => {
          const actual = sut(y);

          assert.equal(actual, expected);
        });
      });

      it('must return true if the input value is within allowed range', () => {
        const expected = true;

        const goodYValues = [
          stateValidator.min+1,
          stateValidator.max-1,
        ];

        goodYValues.forEach((y) => {
          const actual = sut(y);

          assert.equal(actual, expected);
        });
      });
    });

    describe('f validator function', () => {
      let sut;

      beforeEach(() => {
        sut = stateValidator.validate.f;
      });

      it('must be a function that accepts one param', () => {
        assert.isFunction(sut);
        assert.lengthOf(sut, 1);
      });

      it('must return false if the input us of the wrong type', () => {
        const expected = false;

        const badFValues = [
          undefined,
          null,
          NaN,
          () => {},
          123456,
          0.12345,
          {},
          [],
        ];

        badFValues.forEach((f) => {
          const actual = sut(f);

          assert.equal(actual, expected);
        });
      });

      it('must return false if the value is not found within the DIRECTIONS list', () => {
        const expected = false;

        const actual = sut('BAD_STRING');

        assert.equal(actual, expected);
      });

      it('must return true if the value is a string and found within the DIRECTIONS list', () => {
        const expected = true;

        DIRECTIONS.forEach((f) => {
          const actual = sut(f);
  
          assert.equal(actual, expected);
        });

      });
    });

    describe('cmd validator function', () => {
      let sut;

      beforeEach(() => {
        sut = stateValidator.validate.cmd;
      });

      it('must be a function that accepts one param', () => {
        assert.isFunction(sut);
        assert.lengthOf(sut, 1);
      });

      it('must return false if the input us of the wrong type', () => {
        const expected = false;

        const badCmdValues = [
          undefined,
          null,
          NaN,
          () => {},
          123456,
          0.12345,
          {},
          [],
        ];

        badCmdValues.forEach((cmd) => {
          const actual = sut(cmd);

          assert.equal(actual, expected);
        });
      });

      it('must return false if the value is not found within the COMMANDS list', () => {
        const expected = false;

        const actual = sut('BAD_STRING');

        assert.equal(actual, expected);
      });

      it('must return true if the value is a string and found within the COMMANDS list', () => {
        const expected = true;

        COMMANDS.forEach((cmd) => {
          const actual = sut(cmd);

          assert.equal(actual, expected);
        });

      });
  
    });

  });
  
});
