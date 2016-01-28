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
        tally: {
          Sunshine: [aVote.uuid]
        }
      }));
    }); // end it

    // it('will not allow votes for entries not in the pair', () => {
    //   const state = fromJS({
    //     pair: ['Trainspotting', 'Sunshine']
    //   });
    //
    //   const entry = 'Star Wars';
    //
    //   const nextState = vote(state, entry);
    //
    //   expect(nextState).to.equal(fromJS({
    //     pair: ['Trainspotting', 'Sunshine']
    //   }));
    // });

    // it('creates a tally for the voted entry', () => {
    //
    //   const state = Map({
    //     pair: List.of('Trainspotting', '28 Days Later')
    //   });
    //
    //   const aVote = {
    //     uuid: '1337',
    //     entry: 'Trainspotting'
    //   };
    //
    //   const nextState = vote(state, aVote);
    //
    //   expect(nextState).to.equal(Map({
    //     pair: List.of('Trainspotting', '28 Days Later'),
    //     tally: Map({
    //       'Trainspotting': [vote.uuid]
    //     })
    //   })); // end expect
    //
    // }); // end it

    // it('adds to an existing tally for the voted entry', () => {
    //
    //   const state = Map({
    //     pair: List.of('Trainspotting', '28 Days Later'),
    //     tally: Map({
    //       'Trainspotting': ['4352', '1004', '5673'],
    //       '28 Days Later': ['8445', '3643']
    //     })
    //   });
    //
    //   const aVote = {
    //     uuid: '1337',
    //     entry: 'Trainspotting'
    //   };
    //
    //   const nextState = vote(state, aVote);
    //
    //   expect(nextState).to.equal(Map({
    //     pair: List.of('Trainspotting', '28 Days Later'),
    //     tally: Map({
    //       'Trainspotting': ['4352', '1004', '5673', '1337'],
    //       '28 Days Later': ['8445', '3643']
    //     })
    //   })); // end expect
    //
    // }); // end it

    // it('should track and update a users entry during a vote', () => {
    //   const state = fromJS({
    //     pair: ['Trainspotting', 'Sunshine']
    //   });
    //
    //   const aVote = Map({
    //     uuid: '1337',
    //     entry: 'Sunshine'
    //   });
    //   const nextState = vote(state, aVote);
    //   expect(nextState).to.equal(fromJS({
    //     pair: ['Trainspotting', 'Sunshine'],
    //     tally: {
    //       Sunshine: [aVote.get('uuid')]
    //     }
    //   }));

    // aVote.set('entry', 'Trainspotting');
    //
    // nextState.merge(vote(nextState, aVote));
    //
    // expect(nextState).to.equal(fromJS({
    //   pair: ['Trainspotting', 'Sunshine'],
    //   tally: {
    //     Trainspotting: [aVote.get('uuid')],
    //     Sunshine: []
    //   }
    // }));

    // }); // end it

  }); // end describe vote
});