import { Middleware, MiddlewareAPI } from 'redux';

import {
  Action,
  ActionHandler,
  ActionType,
  Options,
} from './types';
import { error } from './actions';
import * as actionTypes from './actionTypes';
import ReduxBroadcaster from './ReduxBroadcaster';

/**
 * Default middleware creator options.
 * @private
 */
const defOpts = {
  prefix: actionTypes.DEFAULT_PREFIX
}
/**
 * Create a middleware.
 *
 * @param {Options} opts
 *
 * @returns {Middleware}
 */
const createMiddleware = ( opts?: Options): Middleware => {
  const options = { ...defOpts, ...opts };
  const { prefix } = options;
  const actionPrefixExp = RegExp(`^${prefix}::`);

  // Create a new redux serviceWorker instance.
  const reduxServiceWorker = new ReduxBroadcaster(options);

  // Define the list of handlers, now that we have an instance of reduxServiceWorker.
  const handlers: { [K in ActionType]: ActionHandler } = {
    [actionTypes.BROADCAST_CONNECT]: reduxServiceWorker.connect,
    [actionTypes.BROADCAST_MESSAGE]: () => {}
  };

  // Middleware function.
  return (store: MiddlewareAPI) => next => (action: Action) => {
    const { dispatch } = store;
    const { type: actionType } = action;

    // Check if action type matches prefix
    if (actionType && actionType.match(actionPrefixExp)) {
      const baseActionType = action.type.replace(actionPrefixExp, '');
      const handler = Reflect.get(handlers, baseActionType);

      if (handler) {
        try {
          handler(store, action);
        } catch (err) {
          dispatch(error(action, err, prefix));
        }
      }
    }

    return next(action);
  };
};

export * from './actionTypes';
export default createMiddleware;
