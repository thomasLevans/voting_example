import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  /*
   * Subscribes a listener to the store that reads current state
   * turns it into a plain JSO and emits it as a state event on the
   * socket.io server result being a JSON-serialized snapshot of
   * the state being sent over all socket.io connections
   *
   * this publishes the whole state to everyone whenever changes
   * occur which may result in a lot of data transfer. This could
   * be optimized by just sending the relevant subset, send a
   * diff rather than a snapshot
   *
   * this does allow for clients to immediately receive the current
   * state when they connect to the application then sync their
   * client side state to the server state right away
   */
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  /*
   * listen for 'connection' events and emit the current
   * application state right away
   *
   * when an 'action' even is received from a client feed
   * directly into redux store
   *
   * there are obvious security implications allowing any
   * connected Socket.io client to dispatch any action
   * into the redux store. In RW there should be some kind
   * firewall here and/or the apps authentication mechanism
   * should plug in here.
   * see: http://vertx.io/docs/vertx-web/java/#_securing_the_bridge
   */
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}