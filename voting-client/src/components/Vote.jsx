import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
* Note the onClick even is mapped to a callback invocation in props
* this is typically how user input / actions is handled with pure
* components, the components don't try to do much themselves
*/
export default React.createClass({
  mixins: [PureRenderMixin],

  getPair: function( ) {
    return this.props.pair || [];
  },

  isDisabled: function( ) {
    return !!this.props.hasVoted;
  },

  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },

  render: function( ) {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
                     disabled={this.isDisabled()}
                     onClick={( ) => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasVotedFor(entry) ?
            <div className="label">Voted</div> :
            null}
        </button>
      )}
    </div>;
  }
});