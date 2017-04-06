import type { Action } from './types';

export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';

export function logOut():Action {
  return {
    type: LOG_OUT,
  };
}

export function logIn():Action {
  return {
    type: LOG_IN,
  };
}

