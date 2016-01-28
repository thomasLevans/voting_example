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

    it('will return an empty List if there is no vote', () => {
      const result = getWinners(undefined);
      expect(result).to.equal(List());
    }); // end it

    it('will return a tie if the tallys are equal', () => {
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

    it('will return the winner if there is a higher tally', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', 'Sunshine'],
        tally: {
          Trainspotting: ['1337'],
          Sunshine: ['4432', '6547']
        }
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Sunshine'));
    }); // end it

    it('will initialize a tally if it does not exist', () => {
      const aVote = fromJS({
        pair: ['Trainspotting', 'Sunshine']
      });

      const result = getWinners(aVote);

      expect(result).to.equal(List.of('Trainspotting', 'Sunshine'));
    }); // end it

  }); // end describe getWinners

}); // end describe in core