import {
  Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();

    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      data: ['Trainspotting', 'Star Wars 7']
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Trainspotting', 'Star Wars 7']
    })); // end expect

  }); // end it

  it('can handle loading the initial state of the store from json', () => {
    const store = makeStore();

    const movies = require('../dat/entries.json');
    expect(movies.length).to.equal(7);

    store.dispatch({
      type: 'SET_ENTRIES',
      data: movies
    });

    store.dispatch({
      type: 'NEXT'
    });

    expect(store.getState()).to.equal(fromJS({
      vote: {
        pair: ['Star Wars 1', 'Star Wars 2']
      },
      entries: [
        'Star Wars 3',
        'Star Wars 4',
        'Star Wars 5',
        'Star Wars 6',
        'Star Wars 7'
      ],
      round: 1
    }));
  });

}); // end describe store