import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import {
  setEntries
}
from '../src/core';

describe('in core', () => {
  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      })); // end expect

    }); // end it

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      })); // end expect

    }); // end it

  }); // end describe setEntries
});