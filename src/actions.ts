import {
  BROADCAST_MESSAGE,
  BROADCAST_ERROR
} from './actionTypes';
import { Action, Prefix } from './types';

type BuiltAction<T> = {
  type: string,
  meta: {
    timestamp: Date,
  },
  payload?: T,
}

function buildAction<T>(actionType: string, payload?: T): BuiltAction<T> {
  const base = {
    type: actionType,
    meta: {
      timestamp: new Date(),
    },
  };

  return payload
    ? { ...base, payload }
    : base;
}

export const message = (event: MessageEvent, prefix: Prefix) => buildAction(`${prefix}::${BROADCAST_MESSAGE}`, event);

export const error = (originalAction: Action, err: Error, prefix: Prefix) => (
  buildAction(`${prefix}::${BROADCAST_ERROR}`, {
    message: err.message,
    name: err.name,
    originalAction,
  })
);
