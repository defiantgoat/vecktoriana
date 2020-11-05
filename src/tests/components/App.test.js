import React from "react";
import { Provider } from "react-redux"
import { render, cleanup } from "@testing-library/react";
import { mockStore } from "../test-helpers";
import { addUser } from "../../actions";
import App from "../../components/App";

describe("App tests", () => {

  afterEach(cleanup);

  it("renders App with default store", async ()=> {
    const { container } = render(<Provider store={mockStore}><App /></Provider>);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();
  });
});
