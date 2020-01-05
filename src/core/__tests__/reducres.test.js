import { assert } from 'chai';
import sinon from 'sinon';

import {
  move,
  place,
  report,
  turn,
} from '../reducers';
import stateValidator from '../../components/validators';

describe('reducers test', () => {

  beforeEach(() => {
    sinon.stub(stateValidator.validate);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('move function', () => {
    let sut;

    beforeEach(() => {
      sut = move;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 1);
    });

    it('must return the input state (change nothing) if input state.y fails validation', () => {
      const state = { a: 'a', b: 'b' };
      stateValidator.validate.x.returns(false);
      stateValidator.validate.y.returns(false);

      const actual = sut(state);

      assert.deepEqual(actual, state);
      sinon.assert.calledOnce(stateValidator.validate.y);
      sinon.assert.calledWithExactly(stateValidator.validate.y, state.y);
    });

    it('must return the input state (change nothing) if input state.x fails validation', () => {
      const state = { y: 1, a: 'a', b: 'b' };
      stateValidator.validate.x.returns(false);
      stateValidator.validate.y.returns(true);

      const actual = sut(state);

      assert.deepEqual(actual, state);
      sinon.assert.calledOnce(stateValidator.validate.y);
      sinon.assert.calledWithExactly(stateValidator.validate.y, state.y);
      sinon.assert.calledOnce(stateValidator.validate.x);
      sinon.assert.calledWithExactly(stateValidator.validate.x, state.x);
    });

    it('must return expected X and Y values for "facing" state values', () => {
      stateValidator.validate.x.returns(true);
      stateValidator.validate.y.returns(true);

      const scenarios = [
        { state: { y: 1, x: 0, f: 'NORTH' }, expected: { y: 2,  x: 0, f: 'NORTH' } },
        { state: { y: 1, x: 0, f: 'SOUTH' }, expected: { y: 0,  x: 0, f: 'SOUTH' } },
        { state: { y: 0, x: 0, f: 'EAST' }, expected: { y: 0,  x: 1, f: 'EAST' } },
        { state: { y: 0, x: 1, f: 'WEST' }, expected: { y: 0,  x: 0, f: 'WEST' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = sut(scenario.state);

        assert.deepEqual(actual, scenario.expected);
      });
    });

  });

  describe('place function', () => {
    let sut;

    beforeEach(() => {
      sut = place;
    });

    it('must be a function that accepts two params', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 2);
    });

    it('must return a new state that is a merge of the two input objects, with the first object keys overriding the second (state)', () => {
      const args = { b: 'new b', z: 'z' };
      const state = { a: 'a', b: 'b', c: 'c' };

      const expected = { a: 'a', b: 'new b', c: 'c', z: 'z' };

      const actual = sut(args, state);

      assert.deepEqual(actual, expected);
    });

  });

  describe('turn function', () => {
    let sut;

    beforeEach(() => {
      sut = turn;
    });

    it('must be a function that accepts two params', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 2);
    });

    it('must return a new state with the same f (facing) value for unexpected cmd directions', () => {
      const scenarios = [
        { state: { f: 'NORTH' }, cmd: 'UP', expected: { f: 'NORTH' } },
        { state: { f: 'SOUTH' }, cmd: 'DOWN', expected: { f: 'SOUTH' } },
        { state: { f: 'WEST' }, cmd: 'THROUGH', expected: { f: 'WEST' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = sut(scenario.cmd, scenario.state);

        assert.deepEqual(actual, scenario.expected);
      });
    });

    it('must return a new state with a new f (facing) value based on input direction', () => {
      const scenarios = [
        { state: { f: 'NORTH' }, cmd: 'LEFT', expected: { f: 'WEST' } },
        { state: { f: 'NORTH' }, cmd: 'RIGHT', expected: { f: 'EAST' } },
        { state: { f: 'EAST' }, cmd: 'LEFT', expected: { f: 'NORTH' } },
        { state: { f: 'EAST' }, cmd: 'RIGHT', expected: { f: 'SOUTH' } },
        { state: { f: 'SOUTH' }, cmd: 'LEFT', expected: { f: 'EAST' } },
        { state: { f: 'SOUTH' }, cmd: 'RIGHT', expected: { f: 'WEST' } },
        { state: { f: 'WEST' }, cmd: 'LEFT', expected: { f: 'SOUTH' } },
        { state: { f: 'WEST' }, cmd: 'RIGHT', expected: { f: 'NORTH' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = sut(scenario.cmd, scenario.state);

        assert.deepEqual(actual, scenario.expected);
      });
    });

  });

  describe('report function', () => {
    let sut;

    beforeEach(() => {
      sut = report;
      sinon.stub(console, 'log');
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 1);
    });

    it('must return the input state and console.log a string of the state', () => {
      const state = { x: 1, y: 2, f: 'NORTH' };
      const expectedLog = `${state.x},${state.y},${state.f}`;

      const actual = sut(state);

      assert.deepEqual(actual, state);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, expectedLog);
    });

  });
  
});
