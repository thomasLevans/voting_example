import {
  List, Map, fromJS
}
from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));

  const round = state.get('round', 0) + 1;

  /*
   * NOTE: the old state should always be the starting point
   * for the new state
   * e.g. the true path of the below if block could have been:
   * return Map({ winner: entries.first() })
   * and still be the correct state returned
   * however this is not correct because there is no future-proofing
   * e.g. we had some data to our state in a future iteration that
   * should pass through the function unchanged
   *
   * BEST PRACTICE:
   * ALWAYS MORPH THE OLD STATE INTO THE NEW ONE
   * INSTEAD OF BUILDING FROM SCRATCH
   */
  if (entries.size == 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge(fromJS({
      vote: {
        pair: entries.take(2)
      },
      entries: entries.skip(2),
      round: round
    }));
  }

} // end next export func next

export function vote(voteState, aVote) {
  const theVote = fromJS(aVote);
  /*
   * reach into the nested data structure path
   * vote/tally/{entry} and apply this function there
   * if there are keys missing along the path, create new maps
   * in their place
   * if the value at the end is missing init it with 0
   *
   * updateIn(path, default value if null, function to execute)
   */

  if (voteState.get('pair').includes(theVote.get('entry'))) {
    return voteState.updateIn(
      ['tally', theVote.get('entry')], List(),
      tally => tally.push(theVote.get('uuid'))
    );
  }

  return voteState
}

export function getWinners(vote) {
  if (!vote) return List();
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], List());
  const bVotes = vote.getIn(['tally', b], List());

  if (aVotes.size > bVotes.size) return List.of(a);
  else if (aVotes.size < bVotes.size) return List.of(b);
  else return List.of(a, b);
}