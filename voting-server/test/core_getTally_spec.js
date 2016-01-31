import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import {
  getTally
}
from '../src/core';

describe('in core', () => {

  describe('getTally', () => {

    it('can count the votes', () => {
      const votes = fromJS({
        '1337': 'Trainspotting',
        '8884': 'Trainspotting',
        '9234': 'Sunshine'
      });

      const tally = getTally(votes);

      expect(tally).to.equal(Map({
        'Trainspotting': 2,
        'Sunshine': 1
      }));
    }); // end it

  }); // end describe getWinners

}); // end describe in core