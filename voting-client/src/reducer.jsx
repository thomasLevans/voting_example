import {List, Map} from 'immutable';

function setState(state, newState) {
  // Initialize or update the state with the new state
  // by calling merge
  return state.merge(newState);
}

function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair']);

  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);

  // if there is a vote and the entry submitted is
  // one of the pair being voted on set hasVoted
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    case 'SET_CLIENT_ID':
      return state.set('clientId', action.clientId);
  }
  return state;
}
