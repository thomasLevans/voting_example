import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// exports the pure component
export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function( ) {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
      </div>;
  }
});

// mapping function used by react-redux connect to wire
// the pure component to the redux store
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}
/*
* exports the connected Voting component
* the connections are made using the props mapping
* function defined above and the action factories
* from action_creators.js
*
* by passing the action factories to the connect
* function callbacks will be mapped to the corresponding
* method of the same signature
* e.g. this.props.vote(entry) maps to vote(entry)
* the factory for the vote action!
* not only will the callback now create the action
* the action is also immediatley dispatched to the
* Redux store!
*/
export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
