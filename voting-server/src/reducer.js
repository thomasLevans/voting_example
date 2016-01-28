import {setEntries, next, vote, INITIAL_STATE} from './core';

/*
* This is called a reducer because given a collection of past
* actions it can reduce the collection into the current state
*
* It fulfills the contract of a reduce callback function
*
* To make the application less brittle the reducer should pick
* apart the state so only the relevant part is passed
*
* For larger applications the main reducer function only hands
* parts of the state to lower-level reducer functions thus separating
* the job of finding the right location in the state tree from applying
* the update to that location
*
* see http://rackt.org/redux/docs/basics/Reducers.html for more info on
* the reducer patterns
*
* NOTE: the assignment in the params sets a default val
* if the passed param is null
*/
export default function reducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.data);
    case 'VOTE':
      return state.update('vote',
        voteState => vote(voteState, action.data));
    case 'NEXT':
      return next(state);
  }

  return state;
}