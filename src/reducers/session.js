
import type { Action } from '../actions/types';
import { LOG_OUT, LOG_IN } from '../actions/session';

export type State = {
    token: string,
    userName: string,
    isLogin: boolean
}

const initialState = {
  token: null,
  userName: 'zhanghao',
  isLogin: false
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === LOG_OUT) {
    return {
      initialState
    };
  }else if(action.type === LOG_IN){
    return {
      token: action.token,
      userName: action.userName,
      isLogin: true
    }
  }
  return state;
}
