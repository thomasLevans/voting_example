import {
  expect
}
from 'chai';
import {
  Map, List, fromJS
}
from 'immutable';

import reducer from '../src/reducer.js';

describe('reducer', () => {

  /*
   * Uses the reducer as a callback for the reduce func
   * being called on the collection of actions
   */
  it('can be used with reduce as', () => {
    const actions = [
      {
        type: 'SET_ENTRIES',
        data: ['Trainspotting', 'Star Wars 7', 'Rick and Morty']
      },
      {
        type: 'NEXT'
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Star Wars 7',
          uuid: '1337'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Star Wars 7',
          uuid: '9738'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Star Wars 7',
          uuid: '9834'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Trainspotting',
          uuid: '4328'
        }
      },
      {
        type: 'NEXT'
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Star Wars 7',
          uuid: '1337'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Star Wars 7',
          uuid: '3759'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Rick and Morty',
          uuid: '4976'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Rick and Morty',
          uuid: '7893'
        }
      },
      {
        type: 'VOTE',
        data: {
          entry: 'Rick and Morty',
          uuid: '2988'
        }
      },
      {
        type: 'NEXT'
      }
    ];

    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Rick and Morty',
      round: 2
    })); // end expect

  }); // end it

  it('has an initial state', () => {
    const action = {
      type: 'SET_ENTRIES',
      data: List.of('Return of the Jedi', 'Empire Strikes Back', 'A New Hope')
    };

    const initialState = undefined;

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      entries: List.of('Return of the Jedi', 'Empire Strikes Back', 'A New Hope')
    })); // end expect

  }); // end it

  it('can handle SET_ENTRIES action', () => {
    const action = {
      type: 'SET_ENTRIES',
      data: ['Trainspotting', 'Sunshine']
    };

    const initialState = Map();

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      entries: List.of('Trainspotting', 'Sunshine')
    })); // end expect

  }); // end it

  it('can handle NEXT action', () => {
    const action = {
      type: 'NEXT'
    };

    const initialState = Map({
      entries: List.of('Trainspotting', 'Sunshine')
    });

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Trainspotting', 'Sunshine')
      }),
      entries: List(),
      round: 1
    })); // end expect

  }); // end it

  it('can handle VOTE action', () => {
    const action = {
      type: 'VOTE',
      data: {
        entry: 'Sunshine',
        uuid: '1337'
      }
    };

    const initialState = Map({
      vote: Map({
        pair: List.of('Trainspotting', 'Sunshine')
      }),
      entries: List.of('127 Hours')
    });

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Trainspotting', 'Sunshine'),
        tally: Map({
          'Sunshine': List.of('1337')
        })
      }),
      entries: List.of('127 Hours')
    })); // end expect

  }); // end it

}); // end outer describe reducer