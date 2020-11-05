import { initialState } from "../reducers";

class MockOidcEvents {
  constructor() {
    this.eventHandlers = {};
    for (const event of [
      "UserLoaded",
      "UserUnloaded",
      "SilentRenewError",
      "AccessTokenExpired",
      "AccessTokenExpiring",
      "UserSignedOut",
    ]) {
      MockOidcEvents.prototype[`add${event}`] = jest.fn((fn) => (this.eventHandlers[event] = fn));
      MockOidcEvents.prototype[`remove${event}`] = jest.fn(() => delete this.eventHandlers[event]);
    }
  }

  trigger(event, ...args) {
    this.eventHandlers[event](...args);
  }
}

export const mockUserManager = {
  events: new MockOidcEvents(),
  signinRedirectCallback: jest.fn(),
  signinRedirect: jest.fn(),
  signoutRedirect: jest.fn(),
  signinSilent: jest.fn(),
  getUser: jest.fn(),
  settings: {
    userStore: {
      set: async () => Promise.resolve(),
      get: async () => Promise.resolve("mock-value")
    }
  }
};

export const mockStoreState = {
  ...initialState
};

export const mockStore = {
  getState: jest.fn(() => (mockStoreState)),
  dispatch: jest.fn(),
  subscribe: jest.fn()
};
