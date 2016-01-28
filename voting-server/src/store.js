import {createStore} from 'redux';
import reducer from './reducer';

/*
* The redux store ties everything together to a central point for
* the application
*
* The redux store is an object that stores the state of the application
* over time and be receiving actions over time can evolve the state
* from one version to the next
*
*/
export default function makeStore() {
  return createStore(reducer);
}