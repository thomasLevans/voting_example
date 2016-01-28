import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import ReactDOM, {findDOMNode} from 'react-dom';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import {Results} from '../src/components/Results';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const component = renderIntoDocument(
      <Results pair={["Trainspotting", "127 Hours"]}
               tally={Map({"Trainspotting":2})} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    expect(entries.length).to.equal(2);

    const voteCounts = scryRenderedDOMComponentsWithClass(component, 'voteCount');
    expect(voteCounts.length).to.equal(2);
    expect(voteCounts[0].textContent).to.equal('2');
    expect(voteCounts[1].textContent).to.equal('0');
  });

  it('invokes the next callback when the next button is clicked', () => {
    let invoked = false;
    const next = () => invoked = true;

    const pairs = ['Trainspotting', 'Sunshine'];
    const component = renderIntoDocument(
      <Results pairs={pairs} next={next} />
    );

    Simulate.click(findDOMNode(component.refs.next));

    expect(invoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting"
               pair={["Trainspotting", "Sunshine"]}
               tally={Map()} />
    );

    const winner = scryRenderedDOMComponentsWithClass(component, 'winner')[0];

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
