import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import {
  next
}
from '../src/core';

describe('in core', () => {

  describe('next', () => {

    // TODO : figure out why this test is failing!
    it('updates the round id when a vote begins', () => {
      const state = fromJS({
        entries: ['Star Wars', 'B.S.G', 'Trainspotting']
      });

      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting'],
        vote: {
          pair: ['Star Wars', 'B.S.G.']
        },
        round: 1
      }));
    }); // end it

    it('has a winner, and the vote is over', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          votes: {
            '4352': 'Trainspotting',
            '1004': 'Trainspotting',
            '5673': 'Trainspotting',
            '8445': '28 Days Later',
            '3643': '28 Days Later'
          }
        },
        entries: []
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      })); // end expect

    }); // end it

    it('puts both from tie back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          votes: Map({
            '4352': 'Trainspotting',
            '1004': 'Trainspotting',
            '8445': '28 Days Later',
            '3643': '28 Days Later'
          })
        }),
        entries: List.of('Millions', '127 Hours')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Millions', '127 Hours')
        }),
        entries: List.of('Trainspotting', '28 Days Later'),
        round: 1
      })); // end expect
    }); // end it

    it('puts winner of current vote back into entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          votes: {
            '4352': 'Trainspotting',
            '1004': 'Trainspotting',
            '5673': 'Trainspotting',
            '8445': '28 Days Later',
            '3643': '28 Days Later'
          }
        },
        entries: ['Sunshine', 'Millions', '127 Hours']
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting'),
        round: 1
      })); // end expect

    }); // end it

    it('takes the next two entries under vote', () => {

      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine'),
        round: 1
      })); // end expect

    }); // end it

  }); // end describe next
});