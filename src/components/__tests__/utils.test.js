import { assert } from 'chai';

import { parseInput, parseInputParams } from '../utils';

describe('utils test', () => {

  describe('parseInput function', () => {
    let sut;

    beforeEach(() => {
      sut = parseInput;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 1);
    });

    it('must throw TypeError if an empty object if a non-string argument provided', () => {
      const invalidInputs = [
        undefined, 
        null,
        10,
        {},
        [],
        () => {},
      ];

      invalidInputs.forEach((input) => {
        try {
          sut(input);
          assert.fail('Must not reach here');
        } catch(error) {
          assert.instanceOf(error, TypeError);
        }
      });
    });

    it('must throw RangeError if PLACE string containing invalid arguments is provided', () => {
      const invalidInputs = [
        "PLACE 1,2,3,NORTH,5",
        "PLACE EAST,SOUTH",
        "PLACE 1,WEST,3,4",
        "PLACE 1,EAST,3",
        "PLACE NORTH",
        "PLACE EAST,1,3",
        "PLACE 1,2,3,4,5",
        "PLACE 1,2,3,4",
        "PLACE 1,2,3",
        "PLACE 1,2",
        "PLACE 1",
      ];

      invalidInputs.forEach((input) => {
        try {
          sut(input);
          assert.fail('Must not reach here');
        } catch (error) {
          assert.instanceOf(error, RangeError);
        }
      });
    });

    it('must return an object containing a cmd of input value if valid non PLACE word input is provided with invalid arguments', () => {
      const validSingleInputScenarios = [
        { input: 'LEFT 12345', expected: { cmd: 'LEFT' } },
        { input: 'RIGHT abcdef', expected: { cmd: 'RIGHT' } },
        { input: 'MOVE 1,2,3,4,5,5', expected: { cmd: 'MOVE' } },
        { input: 'REPORT a,3,WEST', expected: { cmd: 'REPORT' } },
      ];

      validSingleInputScenarios.forEach((scenario) => {
        const actual = sut(scenario.input);
        assert.deepInclude(actual, scenario.expected);
      });
    });

    it('must return an object containing a cmd of input value if valid one word input is provided', () => {
      const validSingleInputScenarios = [
        { input: 'LEFT', expected: { cmd: 'LEFT' } },
        { input: '  RIGHT', expected: { cmd: 'RIGHT' } },
        { input: 'MOVE  ', expected: { cmd: 'MOVE' } },
        { input: ' REPORT  ', expected: { cmd: 'REPORT' } },
      ];

      validSingleInputScenarios.forEach((scenario) => {
        const actual = sut(scenario.input);
        assert.deepInclude(actual, scenario.expected);
      });
    });

    it('must return an object containing a cmd and args when valid input string is provided', () => {
      const validInputScenarios = [
        { input: "PLACE 1,2,EAST", expected: { cmd: "PLACE", args: { x: 1, y: 2, f: "EAST" } } },
        { input: "PLACE 4,3,SOUTH", expected: { cmd: "PLACE", args: { x: 4, y: 3, f: "SOUTH" } } },
      ];

      validInputScenarios.forEach((scenario) => {
        const actual = sut(scenario.input);
        assert.deepEqual(actual, scenario.expected);
      })
    });

  });

  describe('parseInputParams function', () => {
    let sut;

    beforeEach(() => {
      sut = parseInputParams;
    });

    it('must be a function that accepts two param', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 2);
    });

    it('must return undefined if the cmd input does not equal "PLACE"', () => {
      const expected = undefined;

      const actual = sut('OTHER', '');

      assert.equal(actual, expected);
    });

    it('must throw RangeError if params input is falsy and cmd is "PLACE"', () => {
      const invalidParams = [
        null,
        undefined,
        false,
      ];

      invalidParams.forEach((params) => {
        try {
          sut('PLACE', params);
          assert.fail('Should not reach here');
        } catch (error) {
          assert.instanceOf(error, RangeError);
        }
      });
    });

    it('must throw RangeError if params is not valid and cmd is "PLACE"', () => {
      const invalidParams = [
        "1,2,3,NORTH,5",
        "EAST,SOUTH",
        "1,WEST,3,4",
        "1,EAST,3",
        "NORTH",
        "EAST,1,3",
        "1,2,3,4,5",
        "1,2,3,4",
        "1,2,3",
        "1,2",
        "1",
      ];

      invalidParams.forEach((params) => {
        try {
          sut('PLACE', params);
          assert.fail('Should not reach here');
        } catch (error) {
          assert.instanceOf(error, RangeError);
        }
      });
    });

    it('must return an object with required keys if params are valid for cmd of "PLACE"', () => {
      const validScenarios = [
        { params: "1,2,EAST", expected: { x: 1, y: 2, f: "EAST" } },
        { params: "3,1,WEST", expected: { x: 3, y: 1, f: "WEST" } },
      ];

      validScenarios.forEach((scenario) => {
        const actual = sut('PLACE', scenario.params);

        assert.deepEqual(actual, scenario.expected);
      });
    });

  });

});
