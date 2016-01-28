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

describe('application logic', () => {

  // describe('vote', () => {
  //
  //   it('will handle a vote as a plain javascript object', () => {
  //     const state = Map({
  //       pair: ['Trainspotting', 'Sunshine']
  //     });
  //
  //     const aVote = {
  //       uuid: '1337',
  //       entry: 'Sunshine'
  //     };
  //
  //     const nextState = vote(state, aVote);
  //
  //     expect(nextState).to.equal(fromJS({
  //       pair: ['Trainspotting', 'Sunshine'],
  //       tally: {
  //         Sunshine: [aVote.uuid]
  //       }
  //     }));
  //   })
  //
  //
  //   it('will not allow votes for entries not in the pair', () => {
  //     const state = fromJS({
  //       pair: ['Trainspotting', 'Sunshine']
  //     });
  //
  //     const entry = 'Star Wars';
  //
  //     const nextState = vote(state, entry);
  //
  //     expect(nextState).to.equal(fromJS({
  //       pair: ['Trainspotting', 'Sunshine']
  //     }));
  //   });
  //
  //   it('creates a tally for the voted entry', () => {
  //
  //     const state = Map({
  //       pair: List.of('Trainspotting', '28 Days Later')
  //     });
  //
  //     const aVote = {
  //       uuid: '1337',
  //       entry: 'Trainspotting'
  //     };
  //
  //     const nextState = vote(state, aVote);
  //
  //     expect(nextState).to.equal(Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': [vote.uuid]
  //       })
  //     })); // end expect
  //
  //   }); // end it
  //
  //   it('adds to an existing tally for the voted entry', () => {
  //
  //     const state = Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': ['4352', '1004', '5673'],
  //         '28 Days Later': ['8445', '3643']
  //       })
  //     });
  //
  //     const aVote = {
  //       uuid: '1337',
  //       entry: 'Trainspotting'
  //     };
  //
  //     const nextState = vote(state, aVote);
  //
  //     expect(nextState).to.equal(Map({
  //       pair: List.of('Trainspotting', '28 Days Later'),
  //       tally: Map({
  //         'Trainspotting': ['4352', '1004', '5673', '1337'],
  //         '28 Days Later': ['8445', '3643']
  //       })
  //     })); // end expect
  //
  //   }); // end it
  //
  //   it('should track and update a users entry during a vote', () => {
  //     const state = fromJS({
  //       pair: ['Trainspotting', 'Sunshine']
  //     });
  //
  //     const aVote = Map({
  //       uuid: '1337',
  //       entry: 'Sunshine'
  //     });
  //     const nextState = vote(state, aVote);
  //     expect(nextState).to.equal(fromJS({
  //       pair: ['Trainspotting', 'Sunshine'],
  //       tally: {
  //         Sunshine: [aVote.get('uuid')]
  //       }
  //     }));
  //
  //     // aVote.set('entry', 'Trainspotting');
  //     //
  //     // nextState.merge(vote(nextState, aVote));
  //     //
  //     // expect(nextState).to.equal(fromJS({
  //     //   pair: ['Trainspotting', 'Sunshine'],
  //     //   tally: {
  //     //     Trainspotting: [aVote.get('uuid')],
  //     //     Sunshine: []
  //     //   }
  //     // }));
  //
  //   });
  //
  // }); // end describe vote

  describe('next', () => {

    it('updates the round id when a vote begins', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', 'Millions'],
          tally: {
            Trainspotting: ['2356', '6432'],
            Millions: ['5334']
          }
        },
        entries: ['Star Wars', 'B.S.G'],
        round: 1
      });

      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Star Wars', 'B.S.G.']
        },
        entries: ['Trainspotting'],
        round: 2
      }));
    });

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

}); // end describe application logic