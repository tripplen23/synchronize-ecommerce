import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginType, UserDetailsType } from "../../../misc/authType";
import authService from "./authService";
import { STATUS } from "../../../constants/Status";

interface AuthState {
  user: UserDetailsType | null;
  userId: 0;
  token: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  status: string;
}

const initialState: AuthState = {
  user: null,
  userId: 0,
  token: "",
  isLoading: false,
  isSuccess: false,
  error: null,
  status: "",
};

// TODO: login
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginType, thunkAPI) => {
    try {
      return await authService.login({
        username: String(user.username),
        password: String(user.password),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Get user
export const getUser = createAsyncThunk(
  "auth/user",
  async (userId: number, thunkAPI) => {
    try {
      return await authService.getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: () => initialState,
  },
  extraReducers: (builder) => {
    // TODO: Reducer's cases for login
    builder.addCase(login.pending, (state: AuthState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction<string>) => {
        localStorage.setItem("user", JSON.stringify(2));
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          token: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(login.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for getUser
    builder.addCase(getUser.pending, (state: AuthState) => {
      return {
        ...state,
        isLoading: true,
        status: STATUS.LOADING,
      };
    });
    builder.addCase(
      getUser.fulfilled,
      (state: AuthState, action: PayloadAction<UserDetailsType>) => {
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          user: action.payload,
          status: STATUS.SUCCESS,
        };
      }
    );
    builder.addCase(getUser.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        user: null,
        status: STATUS.ERROR,
      };
    });

    // TODO: Reducer's cases for logout
    builder.addCase(logout.fulfilled, (state: AuthState) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null,
        status: STATUS.SUCCESS,
      };
    });
    builder.addCase(logout.rejected, (state: AuthState, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message ?? "error",
        status: STATUS.ERROR,
      };
    });
  },
});
