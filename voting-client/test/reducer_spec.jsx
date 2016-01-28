import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: { Trainspotting: 1}
      }
    });

    const action = { type: 'VOTE', entry: '127 Hours' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: { Trainspotting: 1 }
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: { Trainspotting: 1 }
      }
    });

    const action = { type: 'VOTE', entry: 'Trainspotting' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: { Trainspotting: 1 }
      },
      hasVoted: 'Trainspotting'
    }));
  });

  it('resets hasVoted on SET_STATE if the pair changes', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: { Trainspotting: 1, Sunshine: 2 }
      },
      hasVoted: 'Trainspotting'
    });

    const newState = fromJS({
      vote: {
        pair: ['127 Hours', '28 Days Later']
      }
    });

    const action = { type: 'SET_STATE', state: newState };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['127 Hours', '28 Days Later']
      }
    }));
  });

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', 'Sunshine'),
          tally: Map({Trainspotting: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', 'Sunshine'],
          tally: {Trainspotting: 1}
        }
      }
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', 'Sunshine'],
          tally: {Trainspotting: 1}
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: {Trainspotting: 1}
      }
    }));
  });
});
