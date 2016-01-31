import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import {
  setEntries, next, vote
}
from '../src/core';

describe('in core', () => {

  describe('vote', () => {

    it('will handle a vote as a plain javascript object', () => {
      const state = fromJS({
        pair: ['Trainspotting', 'Sunshine']
      });

      const aVote = {
        uuid: '1337',
        entry: 'Sunshine'
      };

      const nextState = vote(state, aVote);

      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', 'Sunshine'],
        votes: {
          '1337': 'Sunshine'
        }
      }));
    }); // end it

    it('will not allow votes for entries not in the pair', () => {
      const state = fromJS({
        pair: ['Trainspotting', 'Sunshine']
      });

      const entry = Map({
        entry: 'Star Wars',
        uuid: '1337'
      });

      const nextState = vote(state, entry);

      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', 'Sunshine']
      }));
    });

    it('creates a tally for the voted entry', () => {

      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });

      const aVote = {
        uuid: '1337',
        entry: 'Trainspotting'
      };

      const nextState = vote(state, aVote);

      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        votes: {
          '1337': 'Trainspotting'
        }
      })); // end expect

    }); // end it

    it('should track and update a users entry during a vote', () => {
      const state = fromJS({
        pair: ['Trainspotting', 'Sunshine']
      });

      const aVote = Map({
        uuid: '1337',
        entry: 'Sunshine'
      });

      const nextState = vote(state, aVote);
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', 'Sunshine'],
        votes: {
          '1337': 'Sunshine'
        }
      }));

      const reVote = Map({
        uuid: '1337',
        entry: 'Trainspotting'
      });

      const finalState = vote(nextState, reVote);

      expect(finalState).to.equal(fromJS({
        pair: ['Trainspotting', 'Sunshine'],
        votes: {
          '1337': 'Trainspotting'
        }
      }));

    }); // end it

  }); // end describe vote
});