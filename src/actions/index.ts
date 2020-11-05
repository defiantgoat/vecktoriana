import {
  ACTION_ADD_USER,
  ACTION_LOG_OUT
} from '../constants/index';
import { ReduxAction } from '../interfaces';

export const addUser = (payload: Record<string, unknown>): ReduxAction => {
  return { type: ACTION_ADD_USER, payload };
};

export const logOut = (): ReduxAction => {
  return { type: ACTION_LOG_OUT, payload: null };
};

