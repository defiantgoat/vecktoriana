import { ACTION_ADD_USER, ACTION_LOG_OUT } from '../constants/index';
import { ReduxAction, StateConfig } from '../interfaces';

export const initialState: StateConfig = {
  user: {
    oidc: null,
    decoded_token: null,
    logged_in: false
  }
};

const rootReducer = (state = initialState, action: ReduxAction): StateConfig => {

  const {payload} = action as any;
  
  switch(action.type) {
      
    case ACTION_ADD_USER:
      return {
        ...state,
        user: payload
      };

    case ACTION_LOG_OUT:
      return initialState;

    default: 
        return state;
    }
};

export default rootReducer;
