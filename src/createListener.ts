/* eslint-env browser */

import { Dispatch } from 'redux';

import {
  message,
} from './actions';
import { Options } from './types';

/**
 * Instantiate a Broadcast, with it's event listener functions wrapped in
 * a call to `dispatch`.
 */
export default (dispatch: Dispatch, name: string, options: Options) => {
  const { prefix } = options;
  // Setup the broadcast.
  const broadCast = new BroadcastChannel(name);
  broadCast.onmessage = (event: MessageEvent) => {
    dispatch(message(event, prefix))
  };

  return broadCast;
};
