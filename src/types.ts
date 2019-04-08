import { MiddlewareAPI } from 'redux';

import {
  BROADCAST_MESSAGE,
  BROADCAST_CONNECT
} from './actionTypes';

type ActionType =
  | typeof BROADCAST_MESSAGE
  | typeof BROADCAST_CONNECT


type Action =
  | { type: typeof BROADCAST_MESSAGE, payload: any }
  | { type: typeof BROADCAST_CONNECT, payload: any }

type ActionHandler = (_store: MiddlewareAPI, action: Action) => void;

type Name = string;

type Options = {
  prefix: string;
}

type Prefix = string;

// Huh? https://github.com/babel/babel/issues/6065#issuecomment-453901877
/* eslint-disable no-undef */
export {
  Action,
  ActionType,
  ActionHandler,
  Name,
  Prefix,
  Options
};
/* eslint-enable no-undef */
