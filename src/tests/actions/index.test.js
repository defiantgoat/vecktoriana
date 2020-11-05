import * as actions from "../../actions";
import * as types from "../../constants"; 

describe("actions", ()=> {

  it("should add user", ()=> {
    const payload = {
      oidc: "mock-user",
      decoded_token: "mock-token"
    };
    const expectedAction = {
      type: types.ACTION_ADD_USER,
      payload
    }
    expect(actions.addUser(payload)).toEqual(expectedAction)
  });

  it("should logout", ()=> {
    const payload = null;
    const expectedAction = {
      type: types.ACTION_LOG_OUT,
      payload
    }
    expect(actions.logOut(payload)).toEqual(expectedAction)
  });
  

});
