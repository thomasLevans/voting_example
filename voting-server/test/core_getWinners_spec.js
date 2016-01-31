import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import {
  getWinners
}
from '../src/core';

describe('in core', () => {

  describe('getWinners', () => {

    it('returns an empty List if there is no vote', () => {
      const result = getWinners(undefined);
      expect(result).to.equal(List());
    }); // end it

    it('returns a tie if the tallys are equal', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', 'Sunshine'],
        votes: {
          '1337': 'Trainspotting',
          '8486': 'Sunshine'
        }
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting', 'Sunshine'));
    }); // end it

    it('returns the winner if there is one', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        votes: {
          '2342': 'Trainspotting',
          '8789': 'Trainspotting',
          '2328': '28 Days Later'
        }
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting'));
    }); // end it

  }); // end describe getWinners

}); // end describe in core