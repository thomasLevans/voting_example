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
        tally: {
          Trainspotting: ['1337'],
          Sunshine: ['8486']
        }
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting', 'Sunshine'));
    }); // end it

    it('returns the winner if there is one', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': ['4352', '1004', '5673'],
          '28 Days Later': ['8445', '3643']
        }
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting'));
    }); // end it

    it('initializes a tally if it does not exist', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', 'Sunshine']
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting', 'Sunshine'));
    }); // end it

  }); // end describe getWinners

}); // end describe in core