import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/*
* Test Helper file:
*
* creates jsdom versions of document and window objects
* and puts them in the global object to be discovered by React
*
* takes all props of the json window obj and hoists them on to
* the Node.js global object - this is so props provided by window
* can be used without the window
*
*/

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
chai.config.truncateThreshold = 0;