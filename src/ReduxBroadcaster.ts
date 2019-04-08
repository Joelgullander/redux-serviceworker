import { MiddlewareAPI } from 'redux';

import { Action, Options } from './types';
import createListener from './createListener';

/**
 * ReduxServiceWorker
 * @class
 *
 * Manages a Broadcast connection.
 */
export default class ReduxServiceWorker {
  options: Options;

  // BroadcastChannel connection.
  broadcaster: BroadcastChannel | null = null;

  /**
   * Constructor
   * @constructor
   *
   * @param {Options} options
   */
  constructor(options: Options) {
    this.options = options;
  }

  /**
   * Broadcast connect event handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: Action) => {
    this.broadcaster = createListener(dispatch, payload.name, this.options);
  }
}
