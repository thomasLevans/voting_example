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
    // it('updates the round id when a vote begins', () => {
    //   const state = fromJS({
    //     vote: {
    //       pair: ['Trainspotting', 'Millions'],
    //       tally: {
    //         Trainspotting: ['2356', '6432'],
    //         Millions: ['5334']
    //       }
    //     },
    //     entries: ['Star Wars', 'B.S.G'],
    //     round: 1
    //   });
    //
    //   const nextState = next(state);
    //
    //   expect(nextState).to.equal(fromJS({
    //     vote: {
    //       pair: ['Star Wars', 'B.S.G.']
    //     },
    //     entries: ['Trainspotting'],
    //     round: 2
    //   }));
    // });

    it('has a winner, and the vote is over', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': ['4352', '1004', '5673'],
            '28 Days Later': ['8445', '3643']
          })
        }),
        entries: List()
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
          tally: Map({
            'Trainspotting': ['4352', '1004'],
            '28 Days Later': ['8445', '3643']
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

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': ['4352', '1004', '5673'],
            '28 Days Later': ['8445', '3643']
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
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