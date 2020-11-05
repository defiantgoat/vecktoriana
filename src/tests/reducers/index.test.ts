import rootReducer from '../../reducers';
import * as types from '../../constants'; 
import { mockStoreState } from '../test-helpers';

let testState = {
  ...mockStoreState
};

beforeEach(()=> {
  testState = {
    ...mockStoreState
  };
});

describe('reducers', ()=> {

  it('should return the initial state', () => {
    expect(rootReducer(undefined, {type: 'mock', payload: {}})).toEqual({
      user: {
        oidc: null,
        decoded_token: null,
        logged_in: false
      }
    });
  });

  it('should handle ACTION_ADD_USER', ()=> {
    expect(
      rootReducer(testState, {
        type: types.ACTION_ADD_USER,
        payload: {
          oidc: 'mock-user',
          decoded_token: 'mock-token',
          logged_in: true
        }
      })
    ).toEqual({
      user: {
        oidc: 'mock-user',
        decoded_token: 'mock-token',
        logged_in: true
      }
    });
  });

  it('should handle ACTION_LOG_OUT', ()=> {
    expect(
      rootReducer(testState, {
        type: types.ACTION_LOG_OUT,
        payload: null
      })
    ).toEqual({
      user: {
        oidc: null,
        decoded_token: null,
        logged_in: false
      }
    });
  });

});
