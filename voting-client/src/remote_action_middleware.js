/*
 * This is an example of currying, nesting single-arguement functions
 * see : https://en.wikipedia.org/wiki/Currying
 *
 * It is being used in this case so the middleware is easliy
 * configurable, if all the arguments were in one function
 * they would also have to be supplied everytime the middleware
 * was used. With currying the outer function can be called
 * once and get a return value that remembers which store to used
 * same for the next argument
 *
 * next is a callback that the middleware should call when it has
 * done its work and the action should be sent to the store or
 * the next middleware.
 *
 * The remote action middleware should not send each and every
 * action to the server, for instance SET_STATE when sent from
 * the server triggers the remote SET_STATE, which will be sent
 * BACK to the server causing an infinite loop
 */
export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    const clientId = store.getState()
      .get('clientId');
    action.data.uuid = clientId;
    socket.emit('action', action);
  }
  return next(action);
}