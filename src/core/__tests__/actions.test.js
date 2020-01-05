import { assert } from 'chai';
import sinon from 'sinon';

import handleLineInput, { processAction } from '../actions';
import * as reducers from '../reducers';
import * as utils from '../../components/utils';

describe('actions test', () => {

  beforeEach(() => {
    sinon.stub(reducers);
    sinon.stub(utils);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('handleLineInput function', () => {
    let sut;

    beforeEach(() => {
      sut = handleLineInput;
    });

    it('must be a function that accepts two params', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 2);
    });

    it('must return input state if parseInput throws', () => {
      const state = { hasBeenPlaced: true };

      utils.parseInput.throws(new Error('Oops'));

      const actual = sut('INPUT', state);

      assert.deepEqual(actual, state);
      sinon.assert.calledOnce(utils.parseInput);
    });

    it('must call parseInput with the supplied input', () => {
      const state = {};
      const inputs = { cmd: 'DO', args: 'THIS' };

      utils.parseInput.returns(inputs);

      sut('INPUT', state);

      sinon.assert.calledOnce(utils.parseInput);
    });

  });

  describe('processAction function', () => {
    let sut;

    beforeEach(() => {
      sut = processAction;
    });

    it('must be a function that accepts three params', () => {
      assert.isFunction(sut);
      assert.lengthOf(sut, 3);
    });

    it('must return the input state param when state.hasBeenPlaced is falsy and cmd param is not "PLACE"', () => {
      const state = { hasBeenPlaced: false };
      reducers.move.returns(state);

      const actual = sut('OTHERPLACE', 'ARGS', state);

      assert.deepEqual(actual, state);
      sinon.assert.notCalled(reducers.move);
      sinon.assert.notCalled(reducers.place);
      sinon.assert.notCalled(reducers.report);
      sinon.assert.notCalled(reducers.turn);
    });

    it('must return the input state object with hasBeenPlaced set to true', () => {
      const state = { hasBeenPlaced: false };
      const expected = { ...state, hasBeenPlaced: true };

      reducers.place.returns(expected);
      reducers.move.returns(state);

      const actual = sut('PLACE', 'ARGS', state);

      assert.deepEqual(actual, expected);
      sinon.assert.calledOnce(reducers.place);
      sinon.assert.notCalled(reducers.move);
      sinon.assert.notCalled(reducers.report);
      sinon.assert.notCalled(reducers.turn);
    });

    it('must return whatever each expected reducer call returns', () => {
      const state = { hasBeenPlaced: true };

      const validScenarios = [
        { params: ['PLACE', '', { ...state, cmd: 'PLACE' }], expected: { cmd: 'PLACE', hasBeenPlaced: true } },
        { params: ['MOVE', '', { ...state, cmd: 'MOVE' }], expected: { cmd: 'MOVE', hasBeenPlaced: true } },
        { params: ['LEFT', '', { ...state, cmd: 'LEFT' }], expected: { cmd: 'LEFT', hasBeenPlaced: true } },
        { params: ['RIGHT', '', { ...state, cmd: 'RIGHT' }], expected: { cmd: 'RIGHT', hasBeenPlaced: true } },
        { params: ['REPORT', '', { ...state, cmd: 'REPORT' }], expected: { cmd: 'REPORT', hasBeenPlaced: true } },
      ];

      reducers.place.callsFake((args, newState) => newState);
      reducers.move.callsFake((newState) => newState);
      reducers.turn.callsFake((cmd, newState) => newState);
      reducers.report.callsFake((newState) => newState);

      validScenarios.forEach((scenario) => {
        const actual = sut(...scenario.params);
        assert.deepEqual(actual, scenario.expected);
      });
    });

  });

});
