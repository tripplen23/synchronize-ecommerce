import store from "../../utils/store";
import {
  login,
  getUser,
  authReset,
  AuthState,
  initialState,
} from "./authSlice";
import authService from "./authService";
import { LoginType } from "../../../misc/authType";
import { authMSW } from "../../../shared/authMSW";
import { mockUsers } from "../../../data/mockUsers";
import { useAppSelector } from "../../utils/hooks";

// Start the mock server
beforeAll(() => authMSW.listen());
// Reset handlers, localStorage before each test
beforeEach(() => {
  authMSW.resetHandlers();
});
// Clean up after all tests are done
afterAll(() => authMSW.close());

describe("login action", () => {
  it("fulfills with user details on successful login", async () => {
    const userData = { username: "johnd", password: "m38rmF$" };
    await store.dispatch(login(userData));
    const state = store.getState().auth as AuthState;

    expect(state.isLoading).toEqual(false);
    expect(state.isSuccess).toEqual(true);
    expect(state.status).toEqual("success");
    expect(state.token).not.toBeNull(); // Check if token is returned
  });
});

describe("get user", () => {
  it("fulfills with user details on successful login", async () => {
    const userId: number = 1;

    await store.dispatch(getUser(userId));
    const state = store.getState().auth as AuthState;

    expect(state.isLoading).toEqual(false);
    expect(state.isSuccess).toEqual(true);
    expect(state.status).toEqual("success");
    expect(state.user?.name.firstname).toEqual(mockUsers[0].name.firstname);
  });
});
